# 🎵 Moodify

> A mood-aware music player that detects your facial expression and plays songs that match how you feel.

![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![React](https://img.shields.io/badge/react-19-61DAFB.svg)

---

## ✨ Features

- 🎭 **Real-time facial expression detection** — uses your webcam to detect your mood
- 🎶 **Mood-based song playback** — songs are tagged by mood and played accordingly
- 📁 **Song upload with metadata** — reads ID3 tags (title, artist, album, year) automatically
- 🖼️ **Album art extraction** — pulls embedded artwork from MP3 files
- ⚡ **Custom audio player** — with progress bar, skip controls, speed control, and volume
- ☁️ **Cloud storage** — songs and posters stored on ImageKit
- 🗄️ **Persistent library** — song metadata stored in MongoDB
- ⚡ **Redis caching** — fast repeated queries

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| SCSS (BEM) | Styling |
| MediaPipe | Facial landmark detection |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Song metadata storage |
| Redis | Caching layer |
| ImageKit | Cloud storage for audio & images |
| node-id3 | MP3 ID3 tag parsing |
| Multer | File upload handling |

---

## 📁 Project Structure

```
Moodify/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── song.controller.js
│   │   ├── models/
│   │   │   └── song.model.js
│   │   ├── routes/
│   │   │   └── song.routes.js
│   │   └── services/
│   │       └── storage.service.js
│   ├── .env
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Player.jsx
    │   │   └── FaceExpression.jsx
    │   ├── hooks/
    │   │   └── useSong.js
    │   ├── styles/
    │   │   └── player.scss
    │   ├── utils/
    │   │   └── util.js
    │   └── song.context.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)
- Redis (local or cloud)
- [ImageKit](https://imagekit.io/) account

### 1. Clone the repository

```bash
git clone https://github.com/SubhamBhuin-05/Moodify.git
cd Moodify
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
REDIS_URL=your_redis_url
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 📡 API Reference

### Upload a Song

```http
POST /api/songs/upload
Content-Type: multipart/form-data
```

| Field | Type | Description |
|---|---|---|
| `file` | `File` | MP3 file with embedded ID3 tags |
| `mood` | `String` | One of: `happy`, `sad`, `surprised` |

**Response:**
```json
{
  "message": "Song uploaded successfully",
  "song": {
    "_id": "...",
    "title": "Song Title",
    "artist": "Artist Name",
    "album": "Album Name",
    "year": "2024",
    "mood": "happy",
    "url": "https://ik.imagekit.io/...",
    "posterUrl": "https://ik.imagekit.io/..."
  }
}
```

### Get Songs by Mood

```http
GET /api/songs?mood=happy
```

---

## 🎭 How Mood Detection Works

1. The app accesses your webcam via the browser
2. [MediaPipe Face Landmarker](https://developers.google.com/mediapipe) analyzes your facial landmarks in real time
3. The detected expression (`happy`, `sad`, `surprised`) is matched against songs in the database
4. The matching song is loaded into the player automatically

---

## 🎵 Song Upload Requirements

For best results, upload MP3 files with complete ID3 tags:

- **Title** — song name
- **Artist** — artist name  
- **Album** — album name
- **Year** — release year
- **Embedded album art** — used as the poster in the player

You can tag MP3s using tools like [Mp3tag](https://www.mp3tag.de/) (free, Windows/Mac).

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is currently unlicensed. All rights reserved © Subham Bhuin.

---

## 👤 Author

**Subham Bhuin**  
GitHub: [@SubhamBhuin-05](https://github.com/SubhamBhuin-05)

---

<p align="center">Made with ❤️ and good music 🎧</p>