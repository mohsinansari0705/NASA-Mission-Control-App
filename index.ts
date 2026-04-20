import { createServer } from 'node:http';

import { app } from './src/app';
import { loadPlanetsData } from './src/models/planets.model';

const PORT = process.env.PORT || 3000;

const server = createServer(app);

async function startServer() {
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
  });
}
startServer();
