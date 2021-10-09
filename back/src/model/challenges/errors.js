const factory = require('../../errorFactory')

module.exports = {
  UnitNotFound: ({unitOrderNumber}) => factory('UnitNotFound')(`Unit with order number ${unitOrderNumber} not found`),
}
