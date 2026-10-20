.PHONY: install dev lint typecheck build start

install:
	pnpm install --frozen-lockfile

dev:
	pnpm dev

lint:
	pnpm lint

typecheck:
	pnpm typecheck

build:
	pnpm build

start:
	pnpm start
