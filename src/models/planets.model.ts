import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse';

export const habitablePlanets: any[] = [];

const isHabitablePlanet = (planet: any) => {
  if (planet['koi_disposition'] === 'CONFIRMED') {
    if (planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11) {
      if (planet['koi_prad'] < 1.6) {
        return planet;
      }
    }
  }
};

export function loadPlanetsData() {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(
      path.join(import.meta.dirname, '../..', 'data', 'kepler_data.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
}
