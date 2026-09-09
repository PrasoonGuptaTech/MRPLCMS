# Lefthook quality gates

Lefthook is installed automatically by `npm install` through the `postinstall`
script. To reinstall the Git hooks manually, run:

```sh
npx lefthook install
```

## Hooks

### Pre-commit

- Formats supported staged files and stages the formatting changes.
- Rejects staged whitespace errors and unresolved conflict markers.
- Runs ESLint with zero warnings against staged JavaScript and TypeScript.
- Type-checks the project when TypeScript files are staged.
- Runs Jest tests related to staged JavaScript and TypeScript files.

### Commit message

Commitlint enforces the Conventional Commits format. Scopes and breaking-change
syntax are supported, for example:

```text
feat(profile): add account settings
fix!: remove unsupported authentication flow
```

### Pre-push

The complete `npm run validate` gate checks repository formatting, ESLint,
TypeScript, and the full test suite with coverage thresholds.

Hook checks can be run manually while troubleshooting:

```sh
npx lefthook run pre-commit
npx lefthook run commit-msg --force -- /path/to/commit-message
npx lefthook run pre-push
```

Do not bypass hooks with `--no-verify` except for a documented emergency; CI
remains the authoritative shared quality gate.
