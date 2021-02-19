const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.index({ username: 1 }, { unique: true });
const User = mongoose.model('User', userSchema);

module.exports = User;
