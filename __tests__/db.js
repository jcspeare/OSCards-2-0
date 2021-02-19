const {MongoClient} = require('mongodb');
// const request = require('supertest');
require('dotenv').config();

describe('user creation and deletion', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    db = await connection.db("<OSCards>");
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  // If test one fails, check database to ensure that the mockUser isn't already present
  it('should insert into the users collection', async () => {
    const users = db.collection('users');
    const mockUser = {
      username: 'John',
      password: 'Doe'
    }; 
    console.log("mockUser before: ", mockUser);
    const {username, password} = mockUser;
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({username});
    console.log("mockUser after: ", mockUser);
    console.log("insertedUser: ",insertedUser);
    expect(insertedUser).toEqual(mockUser);

  });

  it('should delete from the users collection', async () => {
    const users = db.collection('users');
    const mockUser = {
      username: 'John',
      password: 'Doe'
    }; 
    const {username, password} = mockUser;
    const insertedUser = await users.findOne({username});
    const deletedUser = await users.findOneAndDelete(mockUser)
    console.log("insertedUser: ",insertedUser);
    console.log("deletedUser: ",deletedUser.value);
    // need to check to the found user agains the value property of the document returned from delete
    expect(insertedUser).toEqual(deletedUser.value);
  });
});