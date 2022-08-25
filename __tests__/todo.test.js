const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');



describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  const mockUser = {
    email: 'testUser@user.com',
    password: '123456',
    username: 'testUsers'
  };
  const registerAndLogin = async (agent, user)  => {
    const res = await agent.post('/api/v1/users').send(user);
    expect(res.status).toBe(200);
    return res.body;
  }; 

  it('POST should add a new task', async () => {
    const agent = request.agent(app);
    await registerAndLogin(agent, mockUser);
    const newTask = { 
      taskName: 'complete this project',
      description: 'I sure hope this makes more sense soon',
    };
    const res = await agent
      .post('/api/v1/tasks')
      .send(newTask);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      taskName: newTask.taskName,
      description: newTask.description,
      completed: false,
      userId: expect.any(String)
    });
  });

  it('GET / should return a list of users tasks', async () => {
    const agent = request.agent(app);
    await registerAndLogin(agent, mockUser);
    const newTask = { 
      taskName: 'complete this project',
      description: 'I sure hope this makes more sense soon',
    };
    await agent
      .post('/api/v1/tasks')
      .send(newTask);
    const res = await agent.get('/api/v1/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      taskName: newTask.taskName,
      description: newTask.description,
      completed: false,
      userId: expect.any(String)
    });

  });


});
