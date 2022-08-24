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
  
  const registerAndLogin = async (agent, user)  => {
    const res = await agent.post('/api/v1/users').send(user);
    expect(res.status).toBe(200);
    return res.body;
  }; 



  it('GET /me should return the current user', async () => {
    const agent = request.agent(app);
    await registerAndLogin(agent, mockUser);
    const me = await agent.get('/api/v1/users/me');
    expect(me.status).toBe(200);
    expect(me.body).toEqual({
      email: 'testUser@user.com',
      username: 'testUsers',
      id: expect.any(String),
      exp: expect.any(Number),
      iat: expect.any(Number)
    });
  });
  it('POST /users should create a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { email, username } = mockUser;
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Signed in successfully!',
      newUser: { id: expect.any(String),
        email,
        username }
    });
  });
  // describe('Authenticated requests') add all authenticate routes here
  //add another before each block
  

  it('POST /users/sessions should log in a user', async () => {
    const agent = request.agent(app);
    await registerAndLogin(agent, mockUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'testUser@user.com', password: '123456' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Signed in successfully!'
    });
  });
  
});
