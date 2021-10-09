/**
 *
 * @param {String } name is the name of the newly created error
 * @param {Function} [init] optional initialization function
 * @returns {Function} The new Error
 */
module.exports = function createError(name, init) {
  function Err(message) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    init && init.apply(this, arguments);
  }

  Err.prototype = new Error();
  //set the name property
  Err.prototype.name = name;
  // set the constructor
  Err.prototype.constructor = Err;
  return (...args) => new Err(...args);
}
