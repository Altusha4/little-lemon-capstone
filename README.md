# Little Lemon — learner review draft

AI-assisted React Native / Expo SDK 58 implementation prepared for review, not submitted to Coursera. This is a menu-browsing capstone, not a production ordering/payment system.

## Run

Use Node.js LTS compatible with Expo SDK 58. Run `npm ci`, then `npm run web` for the browser preview, or `npm run android` / `npm run ios` with a configured emulator/simulator and compatible development client. Check Expo's SDK 58 requirements before using Expo Go.

## Implemented

- Validated first-name/email onboarding and disabled Next until valid.
- Persistent local profile, edit/save/discard, notification preferences and initials avatar.
- Home/profile stack navigation and logout clearing the profile.
- Header, restaurant hero, search, multi-category filters, menu list, empty/error/retry states.
- Course menu endpoint; native SQLite cache. Browser preview uses AsyncStorage instead of SQLite.
- `docs/wireframe.jpg`: original local wireframe with grid and three screens. This is **not a Figma export**. Recreate/import and finish the requested Figma components/styles before claiming those activities complete.

## Checks completed

TypeScript and Expo ESLint checks; Android JavaScript bundle export (not APK installation). Browser UI: onboarding validation, menu download, search + category filtering, profile update persistence across reload, logout and cleared onboarding. Android/iOS runtime, offline native SQLite, and image selection have not been tested. Avatar upload is not yet implemented; initials are used.

## Before peer submission

1. Review and understand the implementation and course AI-use rules.
2. Finish the Figma design activities and export the wireframe as requested.
3. Test on a real device or emulator, including offline SQLite caching.
4. Review the published source: https://github.com/Altusha4/little-lemon-capstone.
5. The actual repository URL is saved in the Coursera draft; submission remains a separate step.

Menu data and remote dish images are referenced from the Meta course repository:
https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API

## Design workspace

Figma design in progress: https://www.figma.com/design/wjaCgs0dU3yNz55unVGYpT/
