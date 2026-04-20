# NASA Mission Control - Client

Expo + React Native frontend for NASA Mission Control.

Targets: Android and Web.

## Stack

- Expo 54
- React Native 0.81
- Expo Router
- TypeScript
- Axios

## Quick Start

```bash
cd client
npm install
npm start
```

Run platform-specific:

- `npm run android`
- `npm run web`

## API Configuration

Set backend URL via environment variable:

```bash
PUBLIC_API_BASE_URL=http://localhost:3000
```

If not provided, the app defaults to `http://localhost:3000`.

## Scripts

- `npm start` - Expo dev server
- `npm run android` - launch Android target
- `npm run web` - launch Web target
- `npm run lint` - lint TS/TSX files

## Application Screens

### Launch Screen

<div align='center'>
    <img src="../data/Launches%20screen.png" alt="App Snapshot" width="400" />
</div>

### Upcoming Screen

<div align='center'>
    <img src="../data/Upcoming%20Screen%20wide.png" alt="App Snapshot" width="400" />
</div>

### History Screen

<div align='center'>
    <img src="../data/History%20Screen.png" alt="App Snapshot" width="400" />
</div>
