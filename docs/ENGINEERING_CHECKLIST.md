# Engineering implementation status

| Capability           | Repository implementation                                          | Operational follow-up                                 |
| -------------------- | ------------------------------------------------------------------ | ----------------------------------------------------- |
| Architecture         | Feature-first dependency rules and app-wide boundaries documented  | Enforce boundaries as features grow                   |
| Code optimization    | Lightweight composition, release profiling workflow, startup trace | Establish device baselines per release                |
| Code quality         | TypeScript, ESLint, Prettier, Jest, Commitlint, error boundary     | Review remaining upstream dependency advisories       |
| CI/CD                | GitHub Actions and Jenkins quality/build pipelines                 | Configure secrets, agents, and required checks        |
| Pre-commit           | Formatting, staged diff, lint, type, and related-test checks       | Developers must allow Lefthook installation           |
| Pre-push             | Full `npm run validate` gate                                       | Keep runtime aligned with Node 22                     |
| PR hook              | PR CI and Conventional Commit title validation                     | Enable GitHub branch protection                       |
| Unit tests           | Pure utilities and observability helpers                           | Add tests with every behavior change                  |
| API tests            | Firebase Remote Config service-boundary tests                      | Add HTTP contract tests with future APIs              |
| Smoke tests          | Maestro clean-launch and navigation flow                           | Run on both platform devices in release validation    |
| E2E tests            | Maestro primary navigation flow                                    | Expand for authentication and CMS workflows           |
| Integration tests    | Hook/service lifecycle and app composition coverage                | Add feature integrations as screens mature            |
| PR review            | CODEOWNERS and PR checklist                                        | Require approvals and conversation resolution         |
| Render count         | Development-only `useRenderCount` helper                           | Profile targeted components, then remove calls        |
| RAM monitoring       | Android memory snapshot script and profiler workflow               | Capture release baselines on representative devices   |
| CPU monitoring       | Android CPU snapshot script and profiler workflow                  | Capture sustained-interaction baselines               |
| Firebase Performance | Native SDK plus `js_app_interactive` trace                         | Verify dashboard data from non-debug builds           |
| App icon             | Android/iOS icon sets and master artwork                           | Replace generated placeholder with approved brand art |
| SonarLint            | VS Code connected-mode project binding                             | Developers configure connection locally               |
| SonarQube            | CI scan, LCOV ingestion, and quality-gate action                   | Configure server URL, token, and quality profile      |
| Force update         | Remote Config service, lifecycle hook, blocking UI, tests          | Publish production keys and App Store URL             |

## Known constraints

- Node 23 is unsupported by React Native 0.86; use Node 22 LTS.
- The remaining npm advisories are inherited through React Navigation, Metro,
  and React Native CLI. Safe fixes were applied; forced upgrades require a
  dedicated compatibility change.
- GitHub branch rules, Firebase console values, SonarQube server configuration,
  signing secrets, physical-device results, and store releases are external
  operational state and are intentionally not stored in Git.
