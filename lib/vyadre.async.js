/*!
 * vyadre.async
 * https://github.com/vyadre/vyadre.async
 *
 * Copyright: (C) 2015 VYadre Inc.
 * Author: Aleksei Ganin
 * Released under the GNU GPL v2.0
 *
 */

(function () {

    var async = {};
    
    if(typeof(process) === 'undefined' || !(process.nextTick)) {
      // типо в браузере
      if(typeof(setImmediate) === 'function') {
        async.nextTick = setImmediate;
        async.setImmediate = async.nextTick;
      } else {
        async.nextTick = function (fn) {
          setTimeout(fn, 0);
        };
        async.setImmediate = async.nextTick;
      }
    } else {
      // типо в ноде
      async.nextTick = process.nextTick;
      if(typeof(setImmediate) === 'function') {
        async.setImmediate = setImmediate;
      } else {
        async.setImmediate = async.nextTick;
      }
    }

    
    
    // WARNING предполагается что первым параметром передается массив,
    // содержащий исключительно функции. Каждая функция из этого массива
    // принимает первым параметром функцию, которую следует вызвать
    // по завершению её работы ровно один раз.
    // Эти ограничения сделаны исключительно с целью повышения скорости кода.
    // NOTE результаты работы функции можно сохранять например в замыкании.
    
    
    
    async.parallel = function(tasks, callback){
      var ready = 0;
      var tl = tasks.length;
      for(var i = 0; i < tl; i++){
	tasks[i](function(){
	  ready++;
	  if(ready === tl){
	    callback();
	  }
	});
      }
    };
    
    async.series = function(tasks, callback){
      var ready = 0;
      var tl = tasks.length;
      var next = function(){
	ready++;
	if(ready === tl){
	  callback();
	} else {
	  if(ready % 1000){
	    tasks[ready](next);
	  } else {
	    async.setImmediate(tasks[ready].bind(this, next));
	  }
	}
      };
      tasks[0](next);
    };
    
    async.waterfall = function(tasks, callback){
      var ready = 0;
      var tl = tasks.length;
      var next = function(err){
	ready++;
	if(err || ready === tl){
	  callback(err);
	} else {
	  if(ready % 1000){
	    tasks[ready](next);
	  } else {
	    async.setImmediate(tasks[ready].bind(this, next));
	  }
	}
      };
      tasks[0](next);      
    };
    
    // Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    // AMD / RequireJS
    else if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return async;
        });
    }
    // included directly via <script> tag
    else {
      this.async = async;
    }

}());
