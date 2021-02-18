/*
 * This controller handles routes to localhost:3000/card
 * "Queries are Not Promises," from mongo docs: https://mongoosejs.com/docs/queries.html
 */

const CardModel = require('../Models/card');

const cardController = {};

cardController.addCard = (req, res, next) => {
  // deconstruct properties required in mongoose/mongo model from request.body
  const { term, definition, deckId } = req.body;
  // instantiate a new card document via the mongoose model
  CardModel.create({ term, definition, deckId })
    .then((results) => {
      res.locals.newCard = results;
      return next();
    })
    .catch(() => next(new Error('Error in addCard create method')));
};


cardController.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  CardModel.deleteOne({ _id: `${cardId}` })
    .then(data => {
      res.locals.count = data.n;
      return next();
    })
    .catch(err => next(err));
}


cardController.patchCard = (req, res, next) => {
  const cid = req.params.cardId;
  const { term, definition } = req.body;
  const value = {
    term: term,
    definition: definition,
  };

  CardModel.updateOne({_id: {$eq: cid}}, value)
    .then(result => {
      res.locals.patchedCard = result.n;
      return next();
    })
    .catch(err => next(err));
};

module.exports = cardController;
