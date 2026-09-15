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

## Architecture roadmap

MRPLCMS is in its initial implementation stage. The current repository provides
the mobile application foundation, engineering safeguards, and delivery
pipelines. Product capabilities will be introduced incrementally as business
requirements and backend contracts are finalized. The items below are planned
architecture work, not blockers that must all be implemented before feature
development begins.

### Phase 1: Product and domain foundations

- Define the CMS domain model, including applications or tenants, content types,
  entries, assets, revisions, and content lifecycle states.
- Agree on draft, review, approval, publishing, scheduling, preview, rollback,
  localization, search, and filtering requirements.
- Define roles and permissions before implementing authorization-sensitive UI.
- Establish backend API contracts, versioning, pagination, filtering, and
  standard error responses.
- Implement one complete vertical product slice, such as content list, content
  detail, draft editing, and saving, before generalizing shared abstractions.

### Phase 2: Application and data architecture

- Add authentication, secure session storage, token refresh, logout, session
  expiry, and authenticated navigation.
- Introduce a typed API client with environment-specific configuration,
  timeouts, cancellation, retry rules, error normalization, and DTO-to-domain
  mapping.
- Select server-state caching and invalidation patterns when API-backed screens
  are introduced. Add global client state only for demonstrated cross-feature
  needs.
- Define online-only, cached-read, or offline-editing behavior. If offline edits
  are required, document synchronization, conflict resolution, and idempotency.
- Introduce development, staging, and production application variants with
  separate identifiers, backend configuration, and Firebase projects.

### Phase 3: Product platform capabilities

- Grow the design tokens into reusable, accessible components for forms,
  loading, empty, error, list, dialog, and responsive layout states.
- Add media management, preview, approval, publication, revision history,
  rollback, localization, and search as product requirements are confirmed.
- Add structured and privacy-safe logging, API telemetry, screen performance,
  business events, release-health dashboards, and alerting.
- Establish secure-storage, log-redaction, session-revocation, audit-trail,
  data-retention, dependency-scanning, and threat-modeling policies.
- Replace the placeholder application icon and complete the approved product
  branding before public distribution.

### Phase 4: Scale and governance

- Enforce feature dependency boundaries with lint rules, feature public entry
  points, and circular-dependency checks as the codebase grows.
- Record significant decisions in architecture decision records and assign
  ownership to shared platform modules.
- Expand API contract, authentication, accessibility, failure, offline, and CMS
  workflow coverage. Run device-level Maestro workflows for both platforms in
  CI when suitable test environments are available.
- Raise coverage thresholds progressively as product behavior replaces the
  current placeholder screens.
- Configure branch protection, signing, deployment environments, SonarQube,
  production Remote Config, Firebase symbol uploads, and device performance
  baselines as part of release readiness.

## Delivery principles

- Deliver the roadmap incrementally; do not create unused abstraction layers in
  anticipation of future requirements.
- Keep business logic within its owning feature and promote code to `shared`
  only after more than one feature has a proven need for it.
- Build and validate thin end-to-end product slices so API, domain, UI, security,
  observability, and testing decisions evolve together.
- Treat authorization as a backend responsibility as well as a UI concern.
- Update this document when a planned capability is implemented, deferred, or
  superseded by an architecture decision.
