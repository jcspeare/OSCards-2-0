/*
 * This router handles routes to localhost:3000/card
 */

const express = require('express');
const cardController = require('../controllers/cardControllers');

const cardRouter = express.Router();

// directs post requests made to the root endpoint of /card to the cardController
cardRouter.post('/', cardController.addCard, (req, res) => {
  res.status(200).send(res.locals.newCard);
});


// directs delete request for the selected cardId
cardRouter.delete('/delete/:cardId', cardController.deleteCard, (req, res) => {
  res.status(200).json(res.locals.count);
})


// directs patch request for the selected cardId
cardRouter.patch('/patch/:cardId', cardController.patchCard, (req, res) => {
  res.status(200).json(res.locals.patchedCard);
})

module.exports = cardRouter;
