// required statement
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// invocation of dot env to access API keys
require('dotenv').config();

// creation of express instance
const app = express();
const PORT = 3000;
const mongoURI = 'mongodb+srv://coleredfearn:pebble37@cluster0.jo3mv.mongodb.net/<OSCards>?retryWrites=true&w=majority';

// connect to instance of mongodb atlas
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
  })
  .catch((err) => console.log(err));

// parse urlencoded body content from incoming requests and place it in req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the dist folder on the route '/dist'
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
}

// instantiate router(s) for data calls
const userRouter = require('./routes/userRoutes.js');
const cardRouter = require('./routes/cardRoutes.js');
const deckRouter = require('./routes/deckRoutes.js');

app.use('/user', userRouter);
app.use('/card', cardRouter);
app.use('/deck', deckRouter);

// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/src/index.html'));
});

// create 404 error
app.use('*', (req, res) => res.status(404).send('Not Found'));

// create global error handler
app.use((err, req, res, next) => {
  // console.log(err.code);
  if (err.code === 11000 && err.name === 'MongoError') {
    res.status(420).send('Username Exists');
  }
  // console.log(err);
   else res.status(500).send('Internal Server Error');
});
