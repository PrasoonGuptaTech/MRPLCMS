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

CI/CD is split into independent workflows so each status and deployment can be
run and protected separately:

| Workflow            | Trigger                    | Output                                                    |
| ------------------- | -------------------------- | --------------------------------------------------------- |
| `quality.yml`       | Push, pull request, manual | Formatting, ESLint, TypeScript, tests, optional SonarQube |
| `android-build.yml` | Push, pull request, manual | Debug APK artifact                                        |
| `ios-build.yml`     | Push, pull request, manual | Unsigned simulator `.app` artifact                        |
| `play-store.yml`    | Manual                     | Signed AAB uploaded to a selected Google Play track       |
| `testflight.yml`    | Manual                     | Signed IPA uploaded to TestFlight                         |

Create protected GitHub Environments named `google-play` and `testflight` and
add required reviewers before enabling deployments. Manual store workflows keep
credentials away from pull requests and prevent overlapping uploads.

SonarQube is optional. Add repository secrets `SONAR_TOKEN` and
`SONAR_HOST_URL` to enable its scan and quality gate.

### Google Play configuration

Add these secrets to the `google-play` environment:

- `ANDROID_KEYSTORE_BASE64`: base64-encoded upload keystore.
- `ANDROID_KEYSTORE_PASSWORD`.
- `ANDROID_KEY_ALIAS`.
- `ANDROID_KEY_PASSWORD`.
- `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`: full service-account JSON with Google
  Play Console access to `com.mrplcms`.

The application must exist in Play Console and have its first release uploaded
manually before API uploads will work. The workflow defaults to the `internal`
track; production should require environment approval.

### TestFlight configuration

Add these secrets to the `testflight` environment:

- `APPLE_DISTRIBUTION_CERTIFICATE_BASE64`: base64-encoded distribution `.p12`.
- `APPLE_DISTRIBUTION_CERTIFICATE_PASSWORD`.
- `APPLE_PROVISIONING_PROFILE_BASE64`: base64-encoded App Store provisioning
  profile for `com.mrplcms`.
- `APPSTORE_API_PRIVATE_KEY`: contents of the App Store Connect `.p8` key.

Add these environment variables:

- `APPLE_TEAM_ID`.
- `APPSTORE_API_KEY_ID`.
- `APPSTORE_ISSUER_ID`.

The App Store Connect API key needs the App Manager role. Store workflows use
the monotonically increasing GitHub run number for Android `versionCode` and iOS
`CURRENT_PROJECT_VERSION`. If the stores already contain larger build numbers,
increase the repository's Actions run number or replace those workflow values
with a larger release-specific number before the first upload.

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
