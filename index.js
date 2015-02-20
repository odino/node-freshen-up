/**
 * Constructor: we are going to
 * take a function and save its
 * product somewhere, and call it
 * over and over again, updating the
 * product.
 * 
 * You can specify the interval, else
 * 50ms will be used.
 */
function freshenUp(fn, interval) {
  interval = interval || 50;
  var self = this;
  self.value = fn();
  
  setInterval(function(){
    self.value = fn();
  }, interval);
}

/**
 * Returns the value of the function.
 * 
 * This will be updated at a given
 * interval.
 */
freshenUp.prototype.get = function() {
  return this.value;
}

/**
 * Exporting our freshener!
 */
module.exports = function(fn, interval){
  return new freshenUp(fn, interval);
};