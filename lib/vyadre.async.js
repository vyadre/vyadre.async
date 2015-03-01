/*!
 * vyadre.async
 * https://github.com/vyadre/fastAsync
 *
 * Copyright 2015 VYadre Inc. (Aleksei Ganin)
 * Released under the GNU GPL v2.0
 */

(function () {

    var async = {};

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