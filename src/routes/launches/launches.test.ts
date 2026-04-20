import { describe, test, expect } from '@jest/globals';
import request from 'supertest';

import { app } from '../../app';


describe('Test GET /launches', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});


describe('Test POST /launches', () => {
  const launchData = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    destination: 'Kepler-62 f',
    launchDate: 'June 28, 2030',
  };
  const launchDataWithoutDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    destination: 'Kepler-62 f',
  };
  const launchDataWithInvalidDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    destination: 'Kepler-62 f',
    launchDate: 'Am I a date',
  };

  test('It should respond with 201 created', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchData)
      .expect('Content-Type', /json/)
      .expect(201);

    const requestDate = new Date(launchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launch.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body.launch).toMatchObject(launchDataWithoutDate);
  });

  test('It should catch missing required properties', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      ok: false,
      error: 'Missing required launch property',
    });
  });

  test('It should catch invalid dates', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      ok: false,
      error: 'Invalid launch date',
    });
  });
});
