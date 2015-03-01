var async = require('../lib/fastAsync.js');


var st = Date.now();
async.parallel([function(ready){
  setTimeout(ready, 1500);
}, function(ready){
  setTimeout(ready, 3000);
}], function(){
  var t = Date.now() - st;
  console.log("Time:", t);
});