var assert = require("assert");
var freshenUp = require("../index.js");

describe('freshen-up', function(){
  describe('()', function(){
    it('should accept a fn and return its value', function(){
      assert.equal('hello', freshenUp(function(){
        return 'hello';
      }).get());
    })
    
    it('should accept a fn and resolve its value multiple times, at the given interval', function(done){
      var time = freshenUp(function(){
        return new Date().getTime();
      });
      
      var timestamp = time.get();
      
      setTimeout(function(){
        assert.notEqual(timestamp, time.get())
        done()
      }, 100);
    })
    
    it('should accept a fn and resolve its value multiple times. if we access the value before it gets freshened, the old one will be returned', function(done){
      var time = freshenUp(function(){
        return new Date().getTime();
      }, 100);
      
      var timestamp = time.get();
      
      /**
       * Ops, I still see the old value, too fast!
       */
      setTimeout(function(){
        assert.equal(timestamp, time.get())
        
        /**
         * Ok, now it has been freshened up!
         */
        setTimeout(function(){
          assert.notEqual(timestamp, time.get())
          done()
        }, 200);
      }, 10);
    })
  })
})
