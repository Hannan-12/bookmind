# BookMind React Project

This is a React conversion of the BookMind website, an AI-powered book recommendation system.

## Project Structure

The project follows a modern React architecture with the following key features:

- React Router for navigation
- Context APIs for global state management
- Firebase for authentication
- Open Library API for book data
- Light/Dark theme support
- Responsive design for all screen sizes

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Create a new React project:
```bash
npx create-react-app bookmind-react
cd bookmind-react
```

2. Install dependencies:
```bash
npm install react-router-dom firebase
```

3. Replace the default src folder with the provided project files

4. Start the development server:
```bash
npm start
```

## Key Features

- **User Authentication**: Email/password and Google sign-in options
- **Personalized Recommendations**: Book recommendations based on user preferences
- **Category Browsing**: Explore books by different genres and categories
- **Search Functionality**: Search books with autocomplete suggestions
- **User Profiles**: Customizable user profiles with reading preferences
- **Theme Switching**: Toggle between light and dark themes

## Firebase Configuration

The project uses Firebase for authentication. Make sure to set up your Firebase project and update the configuration in `src/services/firebase.js` if needed.

## API Integration

The project leverages the Open Library API for book data. The integration is handled in `src/services/bookApi.js`.

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects the app from create-react-app

## Additional Notes

- This project is a React conversion of an existing HTML/CSS/JavaScript website
- Local storage is used for data persistence across sessions
- The design is fully responsive and works on mobile devices

## Future Enhancements

- Add a backend server for storing user preferences and book lists
- Implement a rating system for books
- Add a recommendation algorithm based on user ratings
- Create a book detail page with more information
- Add social features like sharing book recommendations

## License

MIT