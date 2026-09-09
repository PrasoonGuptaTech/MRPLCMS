# Test strategy

- Unit tests cover pure functions and isolated hooks/components.
- Integration tests cover collaboration between feature services, hooks, and UI.
- API-boundary tests mock Firebase or HTTP at the service boundary and validate
  data conversion and failure behavior.
- Maestro smoke tests verify that a built app launches and primary navigation
  works on Android and iOS.
- Feature-specific E2E flows should be added beside `.maestro/smoke.yml` as the
  product gains authenticated workflows.

Run the local quality gate with `npm run validate`.

## Current automated coverage

The Jest suite includes:

- Semantic version comparison unit tests.
- Remote Config conversion and error-propagation API-boundary tests.
- Force-update hook lifecycle and foreground integration tests.
- Force-update modal interaction and store-link failure tests.
- Firebase startup trace and render-count tests.
- Application composition and Crashlytics error-boundary tests.

Jest enforces a global 50% minimum for statements, branches, functions, and
lines, plus stricter thresholds for the version comparison utility. Raise the
global floor as product screens gain behavior.

## Device tests

`.maestro/smoke.yml` verifies clean launch and primary navigation.
`.maestro/navigation.yml` verifies navigation in both directions. A device or
emulator with the debug app installed is required:

```sh
maestro test .maestro
```

Add authenticated and API-backed E2E flows when those capabilities are added.
Do not use mocked API responses in a production-environment E2E run.
