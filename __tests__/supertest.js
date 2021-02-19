const {MongoClient} = require('mongodb');
const app = require("../server/server.js"); // Link to your server file
const request = require("supertest");
// const request = supertest(app);
require('dotenv').config();

const server = 'http://localhost:3000';

describe('User Login and Registration', () => {
  describe('/user', () => {
    describe('POST', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and application/json content type', () => {
        const testUser = ({username: "testUser", password: "testPassword"})
        return request(server)
          .post('/user')
          .send(testUser)
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });
})