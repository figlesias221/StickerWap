# StickerWap

A mobile sticker collecting and trading platform with Tinder-style swipe mechanics and real-time chat functionality.

## About

StickerWap revolutionizes digital sticker collecting by combining the nostalgia of traditional sticker albums with modern mobile technology. Users can maintain their digital sticker collection, discover nearby collectors, and trade stickers through an intuitive swipe-based interface - all while chatting in real-time within the app.

## Features

### Core Functionality
- **Digital Sticker Book**: Organize and track your complete sticker collection
- **Swipe-to-Trade**: Tinder-like interface for browsing and matching with other collectors
- **Real-time Chat**: Built-in messaging system powered by Socket.io
- **Location-based Discovery**: Find and connect with collectors near you
- **User Authentication**: Secure login and registration system with JWT

### User Experience
- **Multi-language Support**: Internationalization with i18next
- **Redux State Management**: Smooth, predictable app behavior
- **Persistent Storage**: Your collection syncs across sessions
- **Responsive UI**: Custom components with React Native Vector Icons

## Tech Stack

### Frontend (Mobile App)
- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **React Navigation** - Screen routing and navigation
- **Socket.io Client** - Real-time communication
- **React Query** - Server state management
- **Axios** - HTTP client
- **i18next** - Internationalization

### Backend (API Server)
- **Node.js** with **Express** - RESTful API server
- **TypeScript** - Type-safe backend development
- **MongoDB** with **Mongoose** - NoSQL database
- **Socket.io** - WebSocket server for real-time features
- **JWT** - Secure authentication
- **bcrypt** - Password hashing

## Project Structure

```
StickerWap/
├── frontend/              # React Native mobile application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── screens/      # App screens/views
│   │   ├── navigation/   # Navigation configuration
│   │   ├── redux/        # State management
│   │   ├── hooks/        # Custom React hooks
│   │   ├── utils/        # Utility functions
│   │   ├── translations/ # i18n language files
│   │   └── assets/       # Images, fonts, etc.
│   └── __tests__/        # Frontend tests
│
├── backend/              # Node.js API server
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── models/       # Mongoose schemas
│   │   ├── middleware/   # Express middleware
│   │   ├── config/       # Configuration files
│   │   └── tests/        # Backend tests
│   └── dist/             # Compiled JavaScript
│
├── documentation/        # UML diagrams and docs
└── testdata/            # Test fixtures
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB instance
- iOS development environment (Xcode) or Android Studio
- React Native CLI

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Create .env file with:
# - MongoDB connection string
# - JWT secret
# - Port number
```

4. Start the server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Create .env file with:
# - API base URL
```

4. Install iOS dependencies (macOS only):
```bash
cd ios && pod install && cd ..
```

5. Run the app:
```bash
npm run ios    # For iOS
# or
npm run android # For Android
```

## Development

### Running Tests

**Frontend:**
```bash
cd frontend
npm test
```

**Backend:**
```bash
cd backend
npm test
```

### Code Quality

Both frontend and backend use ESLint for code linting:
```bash
npm run lint
```

## Architecture Highlights

- **RESTful API Design**: Clean, resource-based endpoints
- **Real-time Communication**: Socket.io for instant messaging and live updates
- **Secure Authentication**: JWT-based auth with bcrypt password hashing
- **Type Safety**: TypeScript across the entire stack
- **State Management**: Redux Toolkit for predictable state updates
- **Persistence**: Redux Persist for offline-first experience

## Future Enhancements

- Push notifications for new matches and messages
- Image upload for custom stickers
- Advanced filtering and search
- Trading history and statistics
- Social features (friends, groups)
- Achievement system

## Contributing

This is an educational project. Feel free to fork and experiment!

## License

This project is for educational and portfolio purposes.

---

*Built with React Native, Node.js, and Socket.io*
