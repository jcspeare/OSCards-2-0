// require mongoose and desctructure Schema 
const mongoose = require('mongoose');
const { Schema } = mongoose; 

// create a constant card cardModel, which will be object
const cardSchema = new Schema ({
  // term -> options numbers or strings, object add type key and required key ... REQUIRED
  term: {
    type: String,
    required: true
  }, 
  // definition -> options numbers or strings ... REQUIRED
  definition: {
    type: String,
    required: true
  },
  // deck -> options numbers or strings ... REQUIRED
  deckId: {
    type: String,
    required: true
  }
});
// cardSchema.index({ term: 1, definition: 1, deckId: 1}, { unique: true });
// export the model that we make
module.exports = mongoose.model('Card', cardSchema);