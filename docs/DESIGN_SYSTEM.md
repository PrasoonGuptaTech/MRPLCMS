# CMS design system

## Source

- [CMS 2026 screens](https://www.figma.com/design/LIK3D30I3NxjancTZeDmS4/CMS-2026?node-id=0-1)
- [Design system](https://www.figma.com/design/LIK3D30I3NxjancTZeDmS4/CMS-2026?node-id=1-2)
- [Admin Login — Default](https://www.figma.com/design/LIK3D30I3NxjancTZeDmS4/CMS-2026?node-id=1-312)

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

Authentication and password recovery services are not implemented. Valid input
shows an availability message and does not grant access to the app. The existing
home/profile navigator is retained as `MainTabs` for future authenticated routing.
Connect a real session service before enabling that route; do not use a local
credential check or unconditional navigation as authentication.

## Assets

Mail and lock SVGs are exact exports from login nodes `1:338` and `1:347`.
Figtree Regular, Medium, and SemiBold are bundled from the
[official Figtree repository](https://github.com/erikdkennedy/figtree), with the
SIL Open Font License in `source/assets/fonts/OFL.txt`. iOS references the source
fonts through the Xcode resources phase and `UIAppFonts`; Android bundles copies
under `android/app/src/main/assets/fonts`. Keep those copies identical when updating.
A native rebuild is required after changing fonts.

## Validation

Run `npm run validate`. Component tests cover form validation, recovery messaging,
secure password entry, and disabled/loading controls. The Maestro flows cover the
new launch screen and validation/recovery paths; run them against an installed app.
