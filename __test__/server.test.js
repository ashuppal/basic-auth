'use strict';

// 3rd Party Resources
// const basic = require ('../src/auth/middleware/basic.js');
const{app} = require ('../src/app.js');
const supertest = require ('supertest');
const request = supertest (app);
const {sequelizeDatabase} = require ('../index.js');





beforeAll (async () => {
  await sequelizeDatabase.sync ();
});

afterAll (async () => {
  await sequelizeDatabase.drop ();
});


describe ('Testing the /signup route', () => {
  it ('should create a new user', async () => {
    const response = await request.post ('/signup').send ({
      username: 'ash',
      password: '123',
    });
    expect (response.status).toBe (200);
    expect (response.body.username).toEqual ('ash');
    expect (response.body.password).not.toEqual ('123');
      
  });
});


describe ('Testing the /signin route', () => {
  it('should login with username and password', async () => {
    const response = await request.post('/signin').auth('ash', '123');
    expect(response.status).toBe(200);
    expect(response.body.username).toEqual('ash');
    expect(response.body.password).not.toEqual('123');
  },
  );
});
