# BookMind

BookMind is a React book discovery app for searching Open Library, browsing genre categories, and viewing recommendations and trending titles. It includes Firebase email/password and Google sign-in, a local profile, and a persisted light/dark theme. The deployed app is available at the [BookMind live demo](https://book-website-self-five.vercel.app/).

## Screenshots

> Add screenshots here:
> - Home / recommendations
> - Search results
> - Categories
> - Profile
> - Login / signup
> - Dark mode

## Features

- Search Open Library titles with autocomplete suggestions.
- Browse books by subject and view recommendation and newest-title lists.
- Sign in with Firebase email/password or Google authentication.
- Edit profile details stored in the browser's local storage.
- Toggle between light and dark themes; the selection is stored locally.
- Responsive page layouts and lazy-loaded routes.

## Tech stack

- React 19 with Create React App (`react-scripts` 5)
- React Router DOM 7
- Firebase Authentication SDK 11
- Open Library Search API
- Plain CSS and React Context for auth and theme state

## Architecture and data flow

`src/index.js` mounts the app. `src/App.js` wraps route rendering in the Firebase auth and theme providers, and `src/routes.js` maps URLs to lazily loaded page components. Page components compose reusable layout, auth, and book components. `src/services/firebase.js` initializes Firebase from build-time environment variables; `src/services/bookApi.js` fetches book records and cover links from Open Library. Search and category pages render API results through the shared book grid and cards. Firebase controls authentication state; local storage holds theme and editable profile display data.

## Authentication and routes

Firebase's `onAuthStateChanged` listener restores the signed-in session. Protected routes wait for that initial check and send signed-out users to `/login`. Browser-stored profile values do not grant access.

| Access | Routes |
| --- | --- |
| Protected | `/`, `/categories`, `/profile` |
| Public | `/login`, `/about`, `/contact`, `/privacy` |

Unknown paths redirect to `/` (and then to `/login` if signed out).

## Open Library integration

The app calls Open Library's `/search.json` endpoint for search, autocomplete, subject categories, recommendations, and newest-title results. Cover images link to Open Library Covers, and book details link to the corresponding Open Library work. Failed requests resolve to an empty result list; the book grid displays a no-results message. The app does not include a backend cache or its own recommendation model.

## Local setup

Requirements: Node.js and npm. From the repository root:

```bash
npm install
cp .env.example .env
# Fill in the Firebase values in .env
npm start
```

Create a Firebase project and enable Email/Password and Google providers in Firebase Authentication. Add the local development host to Firebase's authorized domains if required. Restart the development server after changing environment variables.

### Environment variables

Copy `.env.example` to `.env` and supply the Firebase web app configuration values. These `REACT_APP_*` variables are embedded in the client build by Create React App. Do not put passwords, service account keys, or other server credentials in them. The Firebase web API key identifies the client project; restrict it using Firebase/Google Cloud settings and configure Firebase security rules and authorized domains.

For Vercel, set the same six variables in the project's Environment Variables settings for each deployment environment. Redeploy after changing them.

## npm scripts

- `npm start` — start the development server.
- `npm run build` — create an optimized production build in `build/`.
- `npm test -- --watchAll=false` — run the Jest/React Testing Library suite once.
- `npm test` — start the test runner in watch mode.
- `npm run eject` — expose Create React App configuration (irreversible; generally unnecessary).

There is no separate lint script; Create React App reports lint diagnostics during build and development.

## Deployment

The live deployment is hosted on Vercel at https://book-website-self-five.vercel.app/. Vercel should build this Create React App project with `npm run build` and serve the generated `build/` directory. Configure the Firebase environment variables in Vercel before building.

The app uses `BrowserRouter`, so direct navigation or refreshing a nested URL must serve `index.html` as the SPA fallback. Vercel's Create React App framework preset normally supplies this behavior; verify paths such as `/about` and `/categories` on the deployed domain. If direct refreshes return 404, add a Vercel rewrite to `/index.html`. The root path is protected and redirects signed-out users to `/login`.

## Known limitations

- The profile and theme are stored per browser in local storage; profiles are not synchronized between devices or stored in a backend.
- Recommendations are query-based mixes of fiction and mystery, not personalized from reading history or ratings.
- Open Library availability and metadata quality vary; requests depend on the external service and network.
- The contact form currently logs submitted form data locally and is not connected to a delivery service.
- The current test suite has a theme control smoke test; authentication, route protection, and API behavior still need dedicated coverage.
- Firebase configuration must be provided at build time; the app intentionally fails with a clear configuration error when required values are missing.

## Future improvements

- Add focused tests for Firebase auth state, protected routes, API loading, and empty/error states.
- Persist user profiles and reading lists in a backend or Firebase database.
- Add a real contact submission endpoint and a book detail page.
- Improve recommendations with saved preferences and user feedback.

## Security

Firebase web configuration is client-side configuration, not a place for private credentials. Protect access with Firebase Authentication settings, API key restrictions, and correctly configured Firebase rules. Never commit `.env` files, service account keys, passwords, or tokens. A Firebase API key was present in the repository's existing Git history; moving it to environment variables does not remove it from old commits. Review the history exposure and rotate or restrict the key if appropriate. Client-side route protection is a user-interface control and does not replace backend authorization rules.

## Repository naming

For a public portfolio repository, consider renaming `book-website` to `bookmind` or `bookmind-book-discovery`. Rename the GitHub repository manually if desired; the current remote URL is unchanged.
