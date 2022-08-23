const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  email: 'testUser@user.com',
  password: '123456',
  username: 'testUsers'
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('POST /users should create a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { email, username } = mockUser;
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      email,
      username
    });
  });
  it('POST /users/sessions should log in a user', async () => {
    await request(app).post('/api/v1/users').send(mockUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'testUser@user.com', password: '123456' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Signed in successfully!'
    });
  });
});
