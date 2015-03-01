var async = require('../lib/vyadre.async.js');


var testsF, testsRandomF;

async.series([function(next){
  var st = Date.now();
  async.parallel([function(ready){
    setTimeout(ready, 1500);
  }, function(ready){
    setTimeout(ready, 3000);
  }], function(){
    var t = Date.now() - st;
    console.log("Timers test async.parallel:", t);
    next();
  });
}, function(next){
  var st = Date.now();
  async.series([function(ready){
    setTimeout(ready, 1500);
  }, function(ready){
    setTimeout(ready, 3000);
  }], function(){
    var t = Date.now() - st;
    console.log("Timers test async.series:", t);
    next();
  });
}, function(next){
  var tests = [];
  for(var i = 0; i < 1000000; i++){
    tests.push(i);
  }
  testsF = tests.map(function(i){
    return function(next){
      next();
    };
  });
  next();
}, function(next){
  var tsParallel = Date.now();
  async.parallel(testsF, function(){
    var tParallel = Date.now() - tsParallel;
    console.log("Sped test time async.parallel:", tParallel);
    next();
  });
}, function(next){
  var tsSeries = Date.now();
  async.series(testsF, function(){
    var tSeries = Date.now() - tsSeries;
    console.log("Sped test time async.series:", tSeries);
    next();
  });
}, function(next){
  var testsRandom = [];
  for(var i = 0; i < 100; i++){
    testsRandom.push(i);
  }
  testsRandomF = testsRandom.map(function(i){
    return function(next){
      setTimeout(function(){
	console.log(i);
	next(i === 15 ? i : null);
      }, Math.random() * 10);
    };
  });
  next();
}, function(next){
  console.log("testsRandomF async.parallel");
  async.parallel(testsRandomF, next);
}, function(next){
  console.log("testsRandomF async.series");
  async.series(testsRandomF, next);
}, function(next){
  console.log("testsRandomF async.waterfall");
  async.waterfall(testsRandomF, function(err){
    console.log("test err callback:", err);
    next();
  });
}], function(){
  console.log("Все тесты завершены =)");
});