# vyadre.async
Подпроект в рамках проекта [**VYadre**](http://vyadre.com). Функционал будет появляться по мере необходимости в материнском проекте. =) <br>
Основной упор делается на максимальную скорость (минимальный оверхед) взамен контроля возможных ошибок.
(Для контроля возможных ошибок планируется использовать дебаг адаптированные функции на этапе разработки и тестирования.)

##### Пока реализованы методы:
  * `parallel(tasks, callback);`
  * `series(tasks, callback);`
  * `waterfall(tasks, callback);`
  * `map(arrArgs, func, callback)`
  
<br>
 `tasks` - массив функций, принимающих на вход только функцию обратного вызова, которая должна быть вызвана ровно один раз. В случае `waterfall` функция обратного вызова принимает один параметр. Если он отличен от null, undefined, 0 и подобных, то происходит завершение нисхождения и он передается в завершающий callback первым параметром. В `parallel` и  `series` функция обратного вызова не принимает ни каких параметров. <br>
 `arrArgs` - массив аргументов, элементы которого передаются func в первом параметре <br>
 `func(arrArgsItem, next)` - функция вызываемая на каждый элемент из arrArgs
<br><br><br>

##### Подтверждение предположения, что async подтормаживает:
###### use vyadre.async:
```
================== Test apiPerformance =======================
apiPerformance тестируется метод api messages.sendMessage
OK: тест apiPerformance пройден за 50180 ms
messages.sendMessage
  {"requests":8192,"concurrency":16}
  rps: 163.4836057394879
  maxResponseTime: 235
  medianResponseTime: 83.589599609375
  minResponseTime: 17
================== End test apiPerformance ==================

================== Test apiPerformance =======================
apiPerformance тестируется метод api messages.getMessage
OK: тест apiPerformance пройден за 3069 ms
messages.getMessage
  {"requests":8192,"concurrency":16}
  rps: 2708.099173553719
  maxResponseTime: 36
  medianResponseTime: 2.3497314453125
  minResponseTime: 0
================== End test apiPerformance ==================

================== Test apiPerformance =======================
apiPerformance тестируется метод api dialogs.sendMessage
OK: тест apiPerformance пройден за 8012 ms
dialogs.sendMessage
  {"requests":1024,"concurrency":16}
  rps: 128.5140562248996
  maxResponseTime: 307
  medianResponseTime: 107.287109375
  minResponseTime: 0
================== End test apiPerformance ==================

================== Test apiPerformance =======================
apiPerformance тестируется метод api dialogs.getDialogs
OK: тест apiPerformance пройден за 3648 ms
dialogs.getDialogs
  {"requests":1024,"concurrency":32}
  rps: 283.8924313834211
  maxResponseTime: 187
  medianResponseTime: 98.47265625
  minResponseTime: 36
================== End test apiPerformance ==================
```
###### use async:
```
================== Test apiPerformance =======================
apiPerformance тестируется метод api messages.sendMessage
OK: тест apiPerformance пройден за 64622 ms
messages.sendMessage
  {"requests":8192,"concurrency":16}
  rps: 126.85631107050499
  maxResponseTime: 433
  medianResponseTime: 123.0540771484375
  minResponseTime: 51
================== End test apiPerformance ==================

================== Test apiPerformance =======================
apiPerformance тестируется метод api messages.getMessage
OK: тест apiPerformance пройден за 6433 ms
messages.getMessage
  {"requests":8192,"concurrency":16}
  rps: 1282.003129890454
  maxResponseTime: 59
  medianResponseTime: 10.544189453125
  minResponseTime: 1
  normalResponseTimePercent: 99.57275390625
================== End test apiPerformance ==================

================== Test apiPerformance =======================
apiPerformance тестируется метод api dialogs.sendMessage
OK: тест apiPerformance пройден за 9598 ms
dialogs.sendMessage
  {"requests":1024,"concurrency":16}
  rps: 107.14659411949356
  maxResponseTime: 318
  medianResponseTime: 144.7265625
  minResponseTime: 0
================== End test apiPerformance ==================

================== Test apiPerformance =======================
apiPerformance тестируется метод api dialogs.getDialogs
OK: тест apiPerformance пройден за 5437 ms
dialogs.getDialogs
  {"requests":1024,"concurrency":32}
  rps: 189.77020014825797
  maxResponseTime: 335
  medianResponseTime: 165.4521484375
  minResponseTime: 97
================== End test apiPerformance ==================

``` 

Конечно async более гибкий, но когда дело доходит до HighLoad, выжать более 25% того стоит. <br>
p.s.: В методе messages.sendMessage происходит проверка прав, сохранение сообщения в базу данных, обновление кешей и другие подобные действия.
  
