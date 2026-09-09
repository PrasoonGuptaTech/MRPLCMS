# Release configuration

## Android signing

Never commit the release keystore or its passwords. Configure these Gradle
properties in the CI secret store or the developer's untracked
`~/.gradle/gradle.properties`:

```properties
MRPL_RELEASE_STORE_FILE=/absolute/path/to/release.keystore
MRPL_RELEASE_STORE_PASSWORD=...
MRPL_RELEASE_KEY_ALIAS=...
MRPL_RELEASE_KEY_PASSWORD=...
```

The release build intentionally fails when these values are absent.

## Required release checks

1. Run `npm run validate`.
2. Run the Maestro smoke flow on both platforms.
3. Build signed Android and archived iOS release variants.
4. Review Firebase Crashlytics and Performance dashboards after rollout.

## Application identity and icons

Both platforms use application identifier `com.mrplcms`. The current purple CMS
icon is a generated project placeholder stored at
`source/assets/app-icon-master.png`; platform-specific PNGs are derived from it.
Replace the master and every generated size with approved MRPL brand artwork
before public distribution.

The iOS App Store icon must remain a 1024x1024 RGB PNG without transparency.
Android density variants must remain available from `mdpi` through `xxxhdpi`.

## Versioning and rollout

Update Android `versionCode` and `versionName` plus iOS
`CURRENT_PROJECT_VERSION` and `MARKETING_VERSION`. Ensure Remote Config minimum
versions do not exceed the store-approved builds. Use a staged rollout and
monitor Crashlytics stability and Firebase Performance before increasing the
audience.
