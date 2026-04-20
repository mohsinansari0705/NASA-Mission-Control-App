# NASA Mission Control App

A full-stack monorepo for a NASA-inspired Mission Control experience.

This project includes:
- A Node.js + Express backend API that serves habitable exoplanets and mission launch data.
- A React Native + Expo frontend that runs on both Android and Web.
- A mission workflow with launch scheduling, upcoming launches management, and launch history.

## Highlights

- Full-stack TypeScript monorepo architecture.
- CSV ingestion of NASA Kepler exoplanet data at server startup.
- Mission launch scheduling with validation.
- Abort flow for upcoming launches.
- Responsive Expo app supporting Android and Web.

## Architecture

The app follows a client-server architecture.

- Frontend (Expo client) calls backend endpoints over HTTP.
- Backend loads and filters Kepler data from `data/kepler_data.csv`.
- Backend exposes mission and planet data for launch operations.

![NASA Mission Control Architecture](data/NASA%20Mission%20Control%20Architecture.png)

## Tech Stack

- Frontend: React Native, Expo, Expo Router, TypeScript
- Backend: Node.js, Express, TypeScript
- Data: CSV parsing via `csv-parse`
- HTTP client: Axios
- Tooling: Jest, ts-jest, tsx, concurrently

## Monorepo Structure

```text
NASA-Mission-Control-App/
	client/                  # Expo app (Android + Web)
		app/                   # Route screens (Launch, Upcoming, History)
		common/                # API layer, shared context, sound hooks, types
		components/            # Reusable UI components
		theme/                 # Theme tokens and theme provider
		assets/                # Backgrounds, icons, fonts, sound
	src/                     # Backend source
		controllers/           # Route handlers
		models/                # Launch + planet domain logic
		routes/                # API routes
	data/                    # Kepler dataset + architecture/screenshots
	index.ts                 # Server entrypoint
```

## How It Works

1. Server starts and loads habitable planets from the Kepler CSV dataset.
2. Client fetches planets and launches from the API.
3. User schedules a launch by selecting a valid destination planet.
4. Upcoming launches can be aborted.
5. Launch outcomes are shown in the history screen.

Planet filtering criteria:
- Planetary radius < 1.6 Earth radii
- Effective stellar flux > 0.36 and < 1.11 Earth values
- Disposition must be `CONFIRMED`

## API Endpoints

Base URL: `http://localhost:3000`

- `GET /planets` - Returns habitable planets.
- `GET /launches` - Returns all launches.
- `POST /launches` - Creates a new launch.
- `PUT /launches/:id` - Aborts a launch by flight number.

Example launch payload:

```json
{
	"mission": "GrayCode IS07",
	"rocket": "Explorer IS1",
	"launchDate": "2026-04-20",
	"destination": "Kepler-1649 b"
}
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install Dependencies

From the repository root:

```bash
npm install
npm run install-client
```

## Running the Project

### Run Backend (root)

```bash
npm run dev
```

Server runs on `http://localhost:3000` by default.

### Run Frontend (Expo client)

From the root:

```bash
npm run client
```

Or directly in the `client` folder: `npm start`

## Testing

From root:

```bash
npm test
```

Server tests only: `npm run test-server`

Client tests only: `npm run test-client`

## Notes

- This is an educational project inspired by NASA/SpaceX mission workflows.
- The app is built and verified for Android and Web targets.
- Backend CORS is configured for local frontend origin `http://localhost:8081`.

## License

See [LICENSE](LICENSE).
