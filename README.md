# MRPLCMS

This app is used for managing content across multiple applications.

## Architecture

- `source/app`: application composition and typed root navigation
- `source/features`: feature-owned screens, navigation, services, hooks, and utilities
- `source/shared`: reusable components, services, types, and design tokens
- `source/assets`: bundled images and SVG assets

Keep business logic inside its owning feature. Move code into `shared` only when it
is used by multiple features. The root `App` should only compose providers,
navigation, and application-wide gates.

## Quality checks

Run `npm run lint`, `npm run typecheck`, and `npm test -- --no-watchman` before
opening a pull request. Jenkins runs the same checks before the Android build.
