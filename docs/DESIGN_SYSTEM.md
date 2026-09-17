# CMS design system

## Source

- [CMS 2026 screens](https://www.figma.com/design/LIK3D30I3NxjancTZeDmS4/CMS-2026?node-id=0-1)
- [Design system](https://www.figma.com/design/LIK3D30I3NxjancTZeDmS4/CMS-2026?node-id=1-2)
- [Admin Login — Default](https://www.figma.com/design/LIK3D30I3NxjancTZeDmS4/CMS-2026?node-id=1-312)
- Onboarding flow — Admin Login (Default, Invalid Password), Reset Password (Email
  Entry, Sending Reset Link), Session Expired (Re-authenticate)
- [Home screen flow](https://www.figma.com/design/C6Qd5yQZtr32pvcJeOgWhz/Figma-Practice?node-id=147-491) —
  Home (Loading State `147:184`, Unsaved Changes `147:227`, Published/Up-to-Date
  `147:491`), a separate practice file reusing the same CMS 2026 tokens

## First integration

`source/shared/theme/index.ts` provides the dark surface ladder, text and status
colours, Figtree typography, spacing, radii, and control heights. `Button` provides
primary, secondary, ghost, destructive, disabled, and loading states. `TextField`
provides labels, leading icons, secure input, focus, disabled, and validation states.
Use these components and tokens for subsequent screens. The remaining design-system
patterns (cards, navigation, sheets, media, and status components) should be added
with the screens that use them.

The app launches into the login screen. Email and password are empty; the example
email is a placeholder, not a stored credential. Validation appears on submission.
Keyboard avoidance, scrolling, safe areas, and font scaling keep the form usable
on smaller devices. The outer device frame and simulated status icons belong to
the Figma presentation; the app uses the native status bar instead.

Authentication and password recovery services are not implemented. The password
field checks input against the literal demo value "portfolio" — the exact string
called out in the Figma "Invalid Password" state — purely to reproduce that
error state and its `Sign in` happy path. Matching it resets the stack straight
into `Main` (`MainTabs`, the Home/Profile tab navigator) so the rest of the app
is reachable without a real backend; do not treat the demo password or this
unconditional navigation as real authentication — connect a real session
service before this path is production-ready.

"Forgot password?" opens `ResetPasswordScreen`. Submitting a valid email shows a
`Sending…` loading state on the button and then the same "Password recovery
unavailable" message as before, returning to the login screen — no email is
actually sent.

`SessionExpiredScreen` reproduces the "Session expired" state from the
Information Architecture (Figma `147:13264`): reached after inactivity, it
tells the user their unpublished drafts are still saved on the device and
offers a single "Re-authenticate" action that resets the stack back to
`LoginScreen`. There is no session or inactivity timer in this app yet — the
screen is not wired to a live trigger and is reachable only by direct
navigation until a real authenticated session exists to expire.

`HomeScreen` (the `HomeTab`) reproduces the CMS dashboard's three Figma
states as one interactive flow instead of three static screens: it opens on
the Loading skeleton (`147:184`) for 900ms, then resolves into the Unsaved
Changes state (`147:227`) with a "3 changes not published" banner and a
`Publish` action. Pressing `Publish` shows a brief "Publishing…" state and
then the Published/Up-to-Date state (`147:491`) — updating the status
banner, the "Recent activity" caption, and prepending a new "Published"
entry to the activity list. The portfolio-pages grid, quick actions, and
recent-activity content are static demo data; "Switch project", "Search",
"Account", and "Edit" surface the same "not available yet" messaging pattern
as the auth screens, since there is no backend behind them. The project
switcher header's `Button - Switch project` size and `Publish` pill needed a
new `Button` `size="compact"` variant (32px pill, 12px label) alongside the
existing `default`/`login` sizes. New tokens (`successBackground`,
`successBorder`, `avatar`, `skeleton`) extend the palette for the status
banner, avatar chips, and skeleton blocks.

## Assets

Mail and lock SVGs are exact exports from login nodes `1:338` and `1:347`.
`ChevronLeft.svg` is a hand-authored stroke icon (the Figma vector export was
unavailable for this pass) sized to match; re-export it from the source node if
exact fidelity is needed.

The Home screen's icons (`Page*.svg`, `Action*.svg`, `Activity*.svg`,
`ChevronDown.svg`, `Search.svg`) and `ProjectThumbnail.png` are exact exports
from the Home Screen flow nodes above; `ProjectThumbnail.png` was downscaled
from its 1200×1200 source export to 128×128 since it only renders at 32px.
The Figma mock's Achievements grid cell reuses the Certificates icon (no
distinct icon was exported for it); the app reproduces that as-is rather than
substituting a different glyph.
Figtree Regular, Medium, and SemiBold are bundled from the
[official Figtree repository](https://github.com/erikdkennedy/figtree), with the
SIL Open Font License in `source/assets/fonts/OFL.txt`. iOS references the source
fonts through the Xcode resources phase and `UIAppFonts`; Android bundles copies
under `android/app/src/main/assets/fonts`. Keep those copies identical when updating.
A native rebuild is required after changing fonts.

## Validation

Run `npm run validate`. Component tests cover form validation, the demo-password
error state and its navigation into `Main`, reset-password sending state,
recovery messaging, secure password entry, disabled/loading controls, and the
session-expired re-authenticate reset. `HomeScreen.test.tsx` covers the loading
skeleton, the unsaved-changes
state, and the publish action resolving to the up-to-date state. The Maestro
flows cover the launch screen and the full validation/recovery path through
the reset password screen; run them against an installed app. The
session-expired and home screens have no live trigger/backend yet, so they
are not part of the Maestro flow.
