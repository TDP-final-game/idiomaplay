const factory = require('../../errorFactory')

module.exports = {
  AnswerNotFound: ({answer}) => factory('AnswerNotFound')(`Answer "${answer}" is not an option`),
}
