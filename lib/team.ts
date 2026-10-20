export type TeamMember = {
  name: string;
  role: string;
  country?: string;
  primaryInstitute?: string;
  secondaryInstitute?: string;
  bio: string;
  email?: string;
  website?: string;
  photo?: string;
  position?: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Susan Njuki",
    role: "Project Lead · Biomedical Scientist",
    country: "Israel",
    primaryInstitute: "Hebrew University of Jerusalem, Jerusalem, Israel",
    secondaryInstitute: "Central Veterinary Laboratories, Nairobi, Kenya",
    bio: "Susan has a background in Biomedical Sciences, with research experience focused on identifying potential therapeutic drug targets for Glioblastoma Multiforme. She supports African students and alumni in Israeli universities across BSc, MSc, and PhD programmes, organizing lecture series, workshops, research discussions, and communities of practice for knowledge exchange and professional development.",
    email: "suzannenjuki@gmail.com",
    photo: "/sue.jpeg",
    position: "center 34%",
  },
  {
    name: "Ahmed Abbi Abdille",
    role: "Molecular Biologist & Biotechnology Researcher",
    country: "Somalia",
    primaryInstitute: "Global Science University, Somalia",
    secondaryInstitute: "Center for Public Health Research, Somalia",
    bio: "Ahmed holds a PhD in Molecular Biology and Biotechnology. His research focuses on developing and evaluating antimicrobial peptides as potential therapeutic targets for cancer treatment. He supports researchers, health professionals, and students through open-science education, research conferences, communities of practice, institutional development, and capacity building.",
    email: "ahmedabbi7@gmail.com",
    photo: "/ehmed.jpeg",
    position: "center 28%",
  },
  {
    name: "George Lugonzo",
    role: "One Health Scientist",
    country: "Kenya",
    primaryInstitute: "Kenya Agricultural and Livestock Research Organization (KALRO)",
    bio: "George is a One Health scientist with a background in Microbiology and Biotechnology. His experience spans molecular diagnostics, infectious-disease research, epidemiology, bioinformatics, and data interpretation. He advances public health through vaccines and bioproducts that minimize chemical exposure, including livestock probiotics, while generating evidence for health challenges affecting people and animals.",
    email: "lugonzogeorge6@gmail.com",
    photo: "/George Lugonzo.jpeg",
    position: "center 25%",
  },
  {
    name: "Brevin Ochieng Olunga",
    role: "Project Research Associate",
    country: "Kenya",
    primaryInstitute: "Kenya Medical Research Institute",
    secondaryInstitute: "Kenyatta University",
    bio: "Brevin is a medical virologist and biotechnologist with eight years of professional experience in medical research. His tenure at the Kenya Medical Research Institute (KEMRI) established core technical expertise across advanced molecular biology assays and pathogen genomic surveillance protocols. He serves as an open-science fellow through the Open Seeds (OLS) mentorship programme, contributing directly to computational curation and database development for biomarkers. Professionally affiliated with the Biochemistry and Biotechnology Professional Society of Kenya (BBPSK), his academic and professional trajectory centres on multi-institutional collaboration, research, and innovation.",
    photo: "/brevin.jpeg",
    position: "center 24%",
  },
  {
    name: "John Paul Aguta",
    role: "Project Collaborator",
    bio: "John Paul supports the ACBDT collaboration and the development of an open, evidence-traceable research resource. His project profile and institutional affiliations will be expanded as the initiative progresses.",
    photo: "/john paul aguta.jpeg",
    position: "center 22%",
  },
  {
    name: "Comfortine Siwende",
    role: "AI Engineer & Software Developer",
    bio: "Comfortine leads the technical implementation of the ACBDT web platform, translating the project’s scientific evidence model into accessible digital workflows. The work spans product engineering, responsible AI integration, data interfaces, and deployment architecture for an open, maintainable research platform.",
    website: "https://speqlink.com",
    photo: "/comfortine.jpeg",
    position: "center 24%",
  },
];
