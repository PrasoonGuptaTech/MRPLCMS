# Architecture

## Overview

MRPLCMS uses a feature-first React Native architecture. Features own their UI,
navigation, hooks, services, and feature-specific utilities. Cross-cutting code
is promoted to `shared` only after it has a genuine application-wide use.

```text
index.js
  -> App.tsx
    -> source/app/App.tsx
      -> AppErrorBoundary
      -> SafeAreaProvider
      -> AppStartupTrace
      -> NavigationContainer
        -> RootNavigator
          -> feature stack navigators
      -> ForceUpdateGate
```

## Directory ownership

| Directory         | Responsibility                                                       |
| ----------------- | -------------------------------------------------------------------- |
| `source/app`      | Provider composition and root navigation                             |
| `source/features` | Independently owned product capabilities                             |
| `source/shared`   | Cross-feature UI, errors, observability, services, and design tokens |
| `source/assets`   | Source artwork and bundled application assets                        |
| `source/types`    | Global declarations for non-TypeScript modules                       |
| `__tests__`       | Unit, component, service-boundary, and integration tests             |
| `.maestro`        | Device-level smoke and E2E flows                                     |
| `docs`            | Engineering and operational documentation                            |

## Dependency rules

1. `app` may compose `features` and `shared` modules.
2. A feature may depend on `shared`, but must not import another feature's
   internal files. Shared product workflows should expose a deliberate public
   contract before cross-feature use.
3. `shared` must not depend on a product feature.
4. Screens contain presentation and interaction orchestration; remote access and
   data conversion belong in services.
5. Hooks own React lifecycle behavior but delegate remote access to services.
6. Native code and configuration stay under `android` and `ios`.

## Application-wide behavior

- `AppErrorBoundary` catches otherwise fatal React rendering errors and records
  them as non-fatal Crashlytics errors before showing recovery UI.
- `AppStartupTrace` records when the JavaScript UI reaches its second animation
  frame using Firebase Performance.
- `ForceUpdateGate` is mounted above navigation content and can prevent continued
  use when Remote Config requires a newer version.
- Navigation parameter lists are centralized and statically typed.

## Adding a feature

Create `source/features/<feature>/` and add only the folders needed by that
feature, such as `components`, `hooks`, `navigation`, `screens`, `services`,
`types`, and `utils`. Add tests at the same architectural boundary being tested.
Avoid creating empty layers or a global state store until a concrete workflow
requires them.
