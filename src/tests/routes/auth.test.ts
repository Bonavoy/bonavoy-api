import app from '../../index';
import request from 'supertest';
import mongoose from 'mongoose';
import User from '../../database/models/user';

describe('Test the auth endpoints', () => {
  let db;
  let connection;
  beforeAll(async () => {
    connection = await mongoose.connect(
      process.env.TEST_MONGO_DATABASE_CONNECTION_STRING,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    db = mongoose.connection;
  });

  afterAll(async () => {
    await User.deleteOne({ email: 'test@test.com' });
  });

  it('Should sign up user and return new user data', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      email: 'test@test.com',
      username: 'testUsername',
      firstname: 'testFirstname',
      lastname: 'testLastname',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        refreshToken: expect.any(String),
        email: expect.any(String),
        username: expect.any(String),
        firstname: expect.any(String),
        lastname: expect.any(String),
      })
    );
  });

  it('Should not sign up a user with invalid email', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      email: 'invalidemail.com',
      username: 'testUsername',
      firstname: 'testFirstname',
      lastname: 'testLastname',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: expect.any(Number),
        message: expect.any(String),
      })
    );
  });

  it('Should not sign up a user with mismatching password and confirm password', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      email: 'invalidemail.com',
      username: 'testUsername',
      firstname: 'testFirstname',
      lastname: 'testLastname',
      password: 'password123',
      confirmPassword: 'passwrod66',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: expect.any(Number),
        message: expect.any(String),
      })
    );
  });

  it('Should return a refresh and access token', async () => {
    const res = await request(app).post('/api/auth/token').send({
      username: 'testUsername',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        refreshToken: expect.any(String),
      })
    );
  });

  it('Should not return a refresh and access token with non existent username', async () => {
    const res = await request(app).post('/api/auth/token').send({
      username: 'nonexistentUsername',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: expect.any(Number),
        message: expect.any(String),
      })
    );
  });

  it('Should not return a refresh and access token with incorrect password', async () => {
    const res = await request(app).post('/api/auth/token').send({
      username: 'testUsername',
      password: 'notcorrectpassword',
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: expect.any(Number),
        message: expect.any(String),
      })
    );
  });

  describe('Test refreshing access token', () => {
    let refreshToken;
    beforeEach(async () => {
      const res = await request(app).post('/api/auth/token').send({
        username: 'testUsername',
        password: 'password123',
      });
      refreshToken = res.body.refreshToken;
    });

    it('Should return a new access token', async () => {
      const res = await request(app).post('/api/auth/refresh-token').send({
        refreshToken: refreshToken,
      });
      expect(res.statusCode).toEqual(200);
    });
  });
});
