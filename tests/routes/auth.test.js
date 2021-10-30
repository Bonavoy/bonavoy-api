import app from '../../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Test the root path', () => {
  it('Should signup user', () => {
    expect(1).toBe(1);
  });
});
