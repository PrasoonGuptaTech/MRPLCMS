# CI/CD and pull requests

## Local hooks

Lefthook is installed by `npm install` outside Jenkins.

- Pre-commit formats staged supported files, checks conflict markers, runs
  ESLint on staged JavaScript/TypeScript, and runs TypeScript when staged files
  include TypeScript.
- Commit-message hooks validate the repository's message rules and Conventional
  Commits.
- Pre-push runs `npm run validate`, which is the same core quality gate used by
  continuous integration.

## GitHub Actions

`.github/workflows/react-native-ci.yml` runs for every branch push and pull
request. It performs:

1. Node 22 setup and deterministic `npm ci` installation.
2. Pull-request title validation with Commitlint.
3. Prettier, ESLint, TypeScript, Jest, and coverage checks.
4. SonarQube analysis and quality-gate evaluation.
5. Android debug compilation.

Required repository secrets are `SONAR_TOKEN` and `SONAR_HOST_URL`.

## Jenkins

`JenkinsFile` provides an equivalent install, formatting, static-analysis, test,
and Android debug build pipeline for Jenkins agents with Node 22 and Android SDK
36 configured.

## Pull-request governance

`CODEOWNERS` requests ownership review and the PR template supplies a consistent
verification checklist. In GitHub branch-protection settings for `main`, require:

- One approving review and dismissal of stale approvals.
- Code-owner review.
- The `Quality and tests` status check.
- Conversation resolution.
- A current branch before merging.

Branch protection is GitHub-hosted state and cannot be enforced by repository
files alone.

## SonarLint and SonarQube

SonarQube uses `sonar-project.properties` and Jest's LCOV report. VS Code settings
bind SonarLint to connection ID `mrplCMS` and project key `mrplCMSProject`.
Developers must configure the matching SonarQube connection locally without
committing credentials.
