# Firebase services

## Native configuration

- Android uses `android/app/google-services.json` and package `com.mrplcms`.
- iOS uses `ios/GoogleService-Info.plist` and bundle identifier `com.mrplcms`.
- CocoaPods links Firebase App, Crashlytics, Performance, and Remote Config.

Use separate Firebase projects and configuration files before introducing
development, staging, and production application variants.

## Crashlytics

Native Crashlytics captures native crashes. `AppErrorBoundary` additionally
records React rendering failures and displays recovery UI. Verify symbol upload
and a controlled non-production test crash before a store release.

## Performance Monitoring

Firebase Performance supplies native performance and supported network metrics.
`AppStartupTrace` adds the custom `js_app_interactive` trace. See
`docs/PERFORMANCE.md` for the local profiling workflow.

## Force update with Remote Config

The following Remote Config keys are consumed:

| Key                       | Type    | Purpose                                 |
| ------------------------- | ------- | --------------------------------------- |
| `force_update_required`   | Boolean | Enables mandatory-version enforcement   |
| `minimum_android_version` | String  | Minimum Android semantic version        |
| `minimum_ios_version`     | String  | Minimum iOS semantic version            |
| `update_message`          | String  | Message displayed in the blocking modal |
| `android_update_url`      | String  | Play Store or market URL                |
| `ios_update_url`          | String  | App Store HTTPS URL                     |

Version values must use `major.minor.patch`. Invalid values fail open. Fetch
errors also fail open so a Firebase outage does not lock users out. The check is
performed on mount and whenever the application becomes active. Concurrent
checks are deduplicated.

Before release, replace the empty default iOS URL with the final App Store URL,
publish parameter values, test conditional targeting, and verify both an
outdated and current application version.
