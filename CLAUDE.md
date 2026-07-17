# CLAUDE.md — FlyRank Capstone Conventions

Guidance for AI assistants (Claude Code, Cursor, and similar tools) working in this repository.

## Project

- **Program:** FlyRank AI Internship (July 2026 cohort)
- **Repo role:** Capstone workspace — Phase 1 is toolchain and repo setup; later phases add track-specific product code
- **Owner:** Abhishek Chavan

## Stack (default)

Prefer this stack unless a later track brief requires otherwise:

| Layer | Choice |
| --- | --- |
| Runtime | Node.js LTS (v20+) |
| Language | TypeScript |
| Package manager | npm |
| App framework | Next.js (App Router) when a web UI or API routes are needed |
| Styling | Tailwind CSS |
| AI / LLM | Anthropic Claude API (or course-provided alternative) |
| Data | SQLite locally; Supabase or Neon if hosted Postgres is needed |
| Deploy | Vercel (or equivalent documented alternative) |

Document any intentional deviation in the README under **Stack**.

## Tooling

- **Editor:** Cursor
- **Version control:** Git + GitHub
- **Commit style:** [Conventional Commits 1.0.0](https://www.conventionalcommits.org/)
  - Examples: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`
  - Keep the subject line imperative and under ~72 characters
- **Secrets:** Never commit `.env`, API keys, or credentials. Use `.env.example` with placeholder names only.

## Coding conventions

- Prefer small, reviewable diffs over large mixed commits
- Match existing file style when editing; do not drive-by refactor unrelated code
- Add comments only where intent is non-obvious
- Prefer clear names over clever abstractions
- For UI work: one job per section; avoid generic purple/cream AI-default aesthetics unless the product brand requires it
- Keep README accurate when behavior or setup steps change

## AI assistant expectations

When helping in this repo:

1. Read this file and the README before scaffolding new modules
2. Explain trade-offs briefly when choosing libraries or architecture
3. Prefer safe defaults (input validation, failure notes, no secret leakage)
4. Update docs when you change setup, scripts, or public behavior
5. Do not invent credentials or claim a deployment exists without evidence

## Capstone quality bar (FlyRank)

Reviewers look for clear ownership, safe AI use, useful evidence, and a specific explanation of what was built or learned. Prefer inspectable artifacts (running app, notebooks, eval tables, diagrams) over vague summaries.
