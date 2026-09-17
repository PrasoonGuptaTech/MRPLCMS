# CMS design system

## Source

- [CMS 2026 screens](https://www.figma.com/design/LIK3D30I3NxjancTZeDmS4/CMS-2026?node-id=0-1)
- [Design system](https://www.figma.com/design/LIK3D30I3NxjancTZeDmS4/CMS-2026?node-id=1-2)
- [Admin Login — Default](https://www.figma.com/design/LIK3D30I3NxjancTZeDmS4/CMS-2026?node-id=1-312)
- Onboarding flow — Admin Login (Default, Invalid Password), Reset Password (Email
  Entry, Sending Reset Link), Session Expired (Re-authenticate)

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
error state and its `Sign in` happy path; matching it still only reaches the same
"Sign-in unavailable" message; it never grants access to the app. The existing
home/profile navigator is retained as `MainTabs` for future authenticated routing.
Connect a real session service before enabling that route; do not treat the demo
password or unconditional navigation as real authentication.

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

## Assets

Mail and lock SVGs are exact exports from login nodes `1:338` and `1:347`.
`ChevronLeft.svg` is a hand-authored stroke icon (the Figma vector export was
unavailable for this pass) sized to match; re-export it from the source node if
exact fidelity is needed.
Figtree Regular, Medium, and SemiBold are bundled from the
[official Figtree repository](https://github.com/erikdkennedy/figtree), with the
SIL Open Font License in `source/assets/fonts/OFL.txt`. iOS references the source
fonts through the Xcode resources phase and `UIAppFonts`; Android bundles copies
under `android/app/src/main/assets/fonts`. Keep those copies identical when updating.
A native rebuild is required after changing fonts.

## Validation

Run `npm run validate`. Component tests cover form validation, the demo-password
error state, reset-password sending state, recovery messaging, secure password
entry, disabled/loading controls, and the session-expired re-authenticate
reset. The Maestro flows cover the launch screen and the full validation/recovery
path through the reset password screen; run them against an installed app. The
session-expired screen has no live trigger yet, so it is not part of the Maestro
flow.
