# Moodify

Moodify is a mood-based music web application built with a React frontend and an Express/MongoDB backend. It uses webcam face expression detection to identify moods and then plays a matching song from the backend database.

## Project Structure

- `Backend/`
  - `server.js` - starts the Express server and connects to MongoDB.
  - `src/app.js` - configures middleware, CORS, cookies, and mounts API routers.
  - `src/config/`
    - `database.js` - MongoDB connection logic.
    - `cache.js` - Redis connection used for session/token blacklist.
  - `src/routes/`
    - `auth.routes.js` - authentication routes.
    - `song.routes.js` - song upload and fetch routes.
  - `src/controllers/`
    - `auth.controller.js` - handles register, login, get current user, and logout.
    - `song.controller.js` - handles song upload and mood-based song retrieval.
  - `src/models/`
    - `user.model.js` - user schema for MongoDB.
    - `song.model.js` - song schema with mood metadata.
  - `src/middlewares/`
    - `auth.middleware.js` - verifies JWT cookie and checks Redis blacklist.
    - `upload.middleware.js` - multer memory storage for file uploads.
  - `src/services/`
    - `storage.service.js` - uploads files to ImageKit.

- `Frontend/`
  - `src/App.jsx` - wraps the app in `AuthProvider` and `SongContextProvider`.
  - `src/app.routes.jsx` - defines routes for `/`, `/login`, and `/register`.
  - `src/features/auth/` - authentication UI and hooks.
  - `src/features/home/` - home page, audio player, and song fetching logic.
  - `src/features/Expression/` - webcam face expression detection UI and utilities.
  - `src/features/shared/styles/` - shared styling for UI components.

## Backend Paths and API Endpoints

### Main backend entry
- `Backend/server.js` - loads environment variables, connects to MongoDB, and starts the server.
- `Backend/src/app.js` - configures middleware and wires API routers.

### Authentication API
- `POST /api/auth/register` - register a new user.
- `POST /api/auth/login` - login an existing user.
- `GET /api/auth/get-me` - fetch the authenticated user's profile.
- `GET /api/auth/logout` - logout by clearing token cookie and blacklisting the token in Redis.

### Song API
- `POST /api/songs` - upload a song file. The backend reads ID3 tags from the uploaded file, uploads the song and poster to ImageKit, then stores song metadata in MongoDB.
- `GET /api/songs?mood=<mood>` - fetch a random song whose `mood` matches the query.

## Frontend UI and Routing

### Routes
- `/` - protected home page that requires authentication.
- `/login` - login page.
- `/register` - registration page.

### Authentication Flow
- `Frontend/src/features/auth/hooks/useAuth.js` - provides login and registration logic.
- `Frontend/src/features/auth/services/auth.api.js` - calls backend auth endpoints using Axios.
- `Frontend/src/features/auth/components/Protected.jsx` - protects the home page and redirects unauthenticated users.

### Home Page
- `Frontend/src/features/home/pages/Home.jsx` - combines expression detection and the player UI.
- `Frontend/src/features/home/hooks/useSong.js` - manages fetching songs based on moods.
- `Frontend/src/features/home/components/Player.jsx` - audio player UI with controls for play/pause, skip, speed, volume, and progress.

### Expression Detection
- `Frontend/src/features/Expression/components/FaceExpression.jsx` - starts webcam capture and displays the detected expression.
- `Frontend/src/features/Expression/utils/util.js` - uses `@mediapipe/tasks-vision` to detect face blendshapes and classify the expression as `happy`, `sad`, or `surprised`.

## Core Functionalities

### User management
- Register new users with username, email, and password.
- Login users and store authentication token in cookies.
- Protect the home route with JWT verification.
- Logout users and blacklist the JWT token in Redis.

### Mood-based music discovery
- Detect facial expression from webcam input.
- Map expressions to moods: `happy`, `sad`, `surprised`.
- Request a random song matching the detected mood from the backend.

### Audio player features
- Play and pause music.
- Seek using progress bar.
- Skip forward/backward by 5 seconds.
- Change playback speed.
- Control volume and mute.
- Display song metadata with poster, artist, album, mood, and title.

### Media upload and metadata
- Upload MP3 files via `multer` memory storage.
- Extract metadata using `node-id3`.
- Upload song and poster images to ImageKit.
- Persist song metadata in MongoDB.

## Setup Instructions

### Backend
1. Navigate to `Backend/`.
2. Install dependencies: `npm install`.
3. Create a `.env` file with:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `REDIS_HOST`
   - `REDIS_PORT`
   - `REDIS_PASSWORD`
   - `IMAGEKIT_PRIVATE_KEY`
4. Start the backend: `npm run dev`.

### Frontend
1. Navigate to `Frontend/`.
2. Install dependencies: `npm install`.
3. Start the frontend: `npm run dev`.

## Notes

- Backend CORS allows `http://localhost:5173`.
- Frontend calls backend APIs at `http://localhost:3000`.
- The app uses `withCredentials: true` in Axios to send cookies.
- The face expression model runs entirely in the browser using Mediapipe.
