#!/usr/bin/env python3
"""ACBDT exploratory Europe PMC West Africa cancer-biomarker literature pilot.

Run: pip install httpx && python europe_pmc_west_africa_pilot.py
Produces CSV/JSON and per-country counts. Search matches are CANDIDATES, not validated African cohorts.
"""
import csv
import json
import time
from pathlib import Path
import httpx

BASE = 'https://www.ebi.ac.uk/europepmc/webservices/rest/search'
COUNTRIES = {
    'Nigeria': ['Nigeria', 'Nigerian'],
    'Ghana': ['Ghana', 'Ghanaian'],
    'Togo': ['Togo', 'Togolese'],
    'Benin': ['Benin', 'Beninese'],
    'Côte d’Ivoire': ['"Cote d Ivoire"', '"Côte d’Ivoire"', '"Ivory Coast"', 'Ivorian'],
    'Mali': ['Mali', 'Malian'],
    'Niger': ['Niger', 'Nigerien'],
    'Burkina Faso': ['"Burkina Faso"', 'Burkinabe', 'Burkinabè'],
}
# Cancer-specific starter set: extend through configuration after pilot review.
CANCERS = {
    'breast': ['"breast cancer"', '"breast carcinoma"', '"breast neoplasm"'],
    'cervical': ['"cervical cancer"', '"cervical carcinoma"', '"cervical neoplasm"'],
    'prostate': ['"prostate cancer"', '"prostate carcinoma"', '"prostatic neoplasm"'],
    'colorectal': ['"colorectal cancer"', '"colon cancer"', '"rectal cancer"'],
    'liver': ['"liver cancer"', '"hepatocellular carcinoma"'],
}
MARKERS = ['biomarker', '"molecular marker"', 'mutation', 'genomic', 'immunohistochemistry', 'HER2', 'ERBB2', 'BRCA1', 'BRCA2', 'EGFR', 'KRAS', 'TP53', '"Ki-67"', 'HPV', 'p16', 'PSA']
PAGE_SIZE = 100
MAX_RECORDS_PER_QUERY = 500  # exploratory cap; change or remove for systematic retrieval
OUT = Path('acbdt_pilot_results')

def or_group(terms):
    return '(' + ' OR '.join(terms) + ')'

def query_for(country, cancer):
    # TITLE_ABS avoids author affiliation-only matches but can miss studies.
    geo = or_group([f'TITLE_ABS:{t}' for t in COUNTRIES[country]])
    ca = or_group([f'TITLE_ABS:{t}' for t in CANCERS[cancer]])
    bm = or_group([f'TITLE_ABS:{t}' for t in MARKERS])
    return f'{geo} AND {ca} AND {bm}'

def search(client, query):
    cursor, collected, hit_count = '*', [], None
    while len(collected) < MAX_RECORDS_PER_QUERY:
        params = {'query': query, 'format': 'json', 'resultType': 'core', 'pageSize': min(PAGE_SIZE, MAX_RECORDS_PER_QUERY - len(collected)), 'cursorMark': cursor}
        for attempt in range(5):
            try:
                r = client.get(BASE, params=params)
                if r.status_code in (429, 500, 502, 503, 504):
                    raise httpx.HTTPStatusError('retryable', request=r.request, response=r)
                r.raise_for_status()
                data = r.json()
                break
            except (httpx.HTTPError, ValueError):
                if attempt == 4: raise
                time.sleep(min(2 ** attempt, 16))
        hit_count = int(data.get('hitCount', 0))
        batch = data.get('resultList', {}).get('result', [])
        collected.extend(batch)
        nxt = data.get('nextCursorMark')
        if not batch or not nxt or nxt == cursor: break
        cursor = nxt
        time.sleep(0.35)
    return hit_count or 0, collected

def main():
    OUT.mkdir(exist_ok=True)
    rows, summary = [], []
    with httpx.Client(timeout=40, headers={'User-Agent': 'ACBDT-research-pilot/0.1 (contact: configure-your-email)'}) as client:
        for country in COUNTRIES:
            for cancer in CANCERS:
                q = query_for(country, cancer)
                try:
                    hits, records = search(client, q)
                    error = ''
                except Exception as exc:
                    hits, records, error = 0, [], repr(exc)
                summary.append({'country': country, 'cancer': cancer, 'query': q, 'total_search_hits': hits, 'retrieved': len(records), 'truncated': hits > len(records), 'error': error})
                for rec in records:
                    rows.append({
                        'country_query': country, 'cancer_query': cancer,
                        'source': rec.get('source', ''), 'source_id': rec.get('id', ''),
                        'pmid': rec.get('pmid', ''), 'pmcid': rec.get('pmcid', ''), 'doi': rec.get('doi', ''),
                        'title': rec.get('title', ''), 'author_string': rec.get('authorString', ''),
                        'journal': rec.get('journalTitle', ''), 'first_publication_date': rec.get('firstPublicationDate', ''),
                        'pub_type': rec.get('pubTypeList', {}).get('pubType', []),
                        'abstract': rec.get('abstractText', ''),
                        'is_open_access': rec.get('isOpenAccess', ''),
                        'candidate_status': 'UNSCREENED',
                        'query': q,
                    })
                print(f'{country:15} {cancer:12} hits={hits:5} fetched={len(records):4} {error}')
                time.sleep(0.35)
    # Retain query provenance while also exporting a deduplicated list of publications.
    unique = {}
    for row in rows:
        key = row['doi'].strip().lower() or row['pmid'] or f"{row['source']}:{row['source_id']}"
        if key not in unique:
            unique[key] = {**row, 'matched_country_queries': [row['country_query']], 'matched_cancer_queries': [row['cancer_query']]}
        else:
            for field, value in [('matched_country_queries', row['country_query']), ('matched_cancer_queries', row['cancer_query'])]:
                if value not in unique[key][field]: unique[key][field].append(value)
    for name, data in [('query_summary.csv', summary), ('candidate_matches.csv', rows), ('deduplicated_publications.csv', list(unique.values()))]:
        with (OUT / name).open('w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=list(data[0]) if data else ['empty'])
            writer.writeheader()
            for row in data:
                writer.writerow({k: json.dumps(v, ensure_ascii=False) if isinstance(v, list) else v for k, v in row.items()})
    (OUT / 'run_metadata.json').write_text(json.dumps({'countries': COUNTRIES, 'cancers': CANCERS, 'markers': MARKERS, 'max_records_per_query': MAX_RECORDS_PER_QUERY, 'warning': 'Search results are unvalidated candidates. Country in abstract does not prove cohort origin; screening and full-text review required.'}, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f'\nSaved {len(rows)} query matches and {len(unique)} deduplicated publications to {OUT.resolve()}')

if __name__ == '__main__':
    main()
