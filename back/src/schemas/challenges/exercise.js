const mongoose = require('mongoose');
const EXERCISE_TYPES = require('../../constants/exerciseTypes');

const Exercise = new mongoose.Schema({
  _id: false,
  type: {
    type: String,
    enum: Object.keys(EXERCISE_TYPES),
    required: [true, 'type is required']
  },
  options: {
    type: [{
      text: {
        type: String,
        required: true
      },
      correct: {
        type: Boolean,
        required: true
      }
    }],
    required: [true, 'options is required']
  }
});

module.exports = Exercise;
