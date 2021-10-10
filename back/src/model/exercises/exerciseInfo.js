const exerciseTypes = require('../../constants/exerciseTypes');

module.exports = {
  _id: false,
  type: {
    type: String,
    enum: Object.values(exerciseTypes),
    required: [true, 'type is required']
  },
  statement: {
    type: String,
    required: true
  },
  options: {
    type: [{
      _id: false,
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
}
