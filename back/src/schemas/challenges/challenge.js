const mongoose = require('mongoose');
const Unit = require('./unit');

const Challenge = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  difficulty: {
    type: String,
    required: [true, 'difficulty is required']
  },
  description: {
    type: String,
    required: [true, 'description is required']
  },
  units: [{type: Unit, required: false}]
});


module.exports = Challenge;
