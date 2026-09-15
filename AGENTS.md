# Repository workflow

For every task that changes this repository, use the repository-local
`feature-pr-workflow` skill in `.agents/skills/feature-pr-workflow/SKILL.md`.

- Do not implement or commit changes directly on `main`.
- Start each change on a new branch and use the `codex/` branch prefix unless
  the user requests another name.
- After implementation and appropriate validation, commit the scoped changes,
  push the branch, and create a pull request targeting `main`.
- Do not merge the pull request unless the user explicitly asks for it.
- Read-only investigation, explanation, and planning do not require a branch or
  pull request when no repository files are changed.
