# MRPLCMS

This app is used for managing content across multiple applications.

## Requirements

- Node.js 22 LTS. Node 23 is not supported by React Native 0.86.
- Android Studio and Android SDK 36 for Android development.
- Xcode with CocoaPods for iOS development.
- Maestro for device-level smoke and E2E tests.

Install dependencies with `npm ci`. After changing native dependencies, run
`bundle exec pod install` from `ios/`.

## Architecture

- `source/app`: application composition and typed root navigation
- `source/features`: feature-owned screens, navigation, services, hooks, and utilities
- `source/shared`: reusable components, services, types, and design tokens
- `source/assets`: bundled images and SVG assets

Keep business logic inside its owning feature. Move code into `shared` only when it
is used by multiple features. The root `App` should only compose providers,
navigation, and application-wide gates.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for dependency rules, runtime
composition, and conventions.

## Quality checks

Run `npm run lint`, `npm run typecheck`, and `npm test -- --no-watchman` before
opening a pull request. Jenkins runs the same checks before the Android build.

Use `npm run validate` for the complete local and pre-push quality gate. Test,
release, and performance workflows are documented in `docs/`.

## Pull requests

Pull requests run formatting, lint, TypeScript, coverage, SonarQube, and an
Android debug build. Configure `SONAR_TOKEN` and `SONAR_HOST_URL` as repository
secrets and require the `Quality and tests` check plus one approving review in
the `main` branch protection rules. GitHub settings are external to this repo.

The checked-in VS Code settings bind SonarLint to project `mrplCMSProject`.
Each developer must create the `mrplCMS` SonarQube connection locally; server
credentials must not be committed.

## Mobile verification

Maestro flows in `.maestro/` cover application launch and primary navigation.
Run them against a built debug application with `maestro test .maestro`.

## Engineering documentation

- [Architecture](docs/ARCHITECTURE.md)
- [CI/CD and pull requests](docs/CI_CD.md)
- [Firebase and force update](docs/FIREBASE.md)
- [Testing strategy](docs/TESTING.md)
- [Performance monitoring](docs/PERFORMANCE.md)
- [Release process](docs/RELEASING.md)
- [Implementation status](docs/ENGINEERING_CHECKLIST.md)
