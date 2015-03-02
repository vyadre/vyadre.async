# vyadre.async
Подпроект в рамках проекта [**VYadre**](http://vyadre.com). Функционал будет появляться по мере необходимости в материнском проекте. =) <br>
Основной упор делается на максимальную скорость (минимальный оверхед) взамен контроля возможных ошибок.
(Для контроля возможных ошибок планируется использовать дебаг адаптированные функции на этапе разработки и тестирования.)

##### Пока реализованы методы:
  * `parallel(tasks, callback);`
  * `series(tasks, callback);`
  * `waterfall(tasks, callback);`
  
 `tasks` - массив функций, принимающих на вход только функцию обратного вызова, которая должна быть вызвана ровно один раз. В случае `waterfall` функция обратного вызова принимает один параметр. Если он отличен от null, undefined, 0 и подобных, то происходит завершение нисхождения и он передается в завершающий callback первым параметром. В `parallel` и  `series` функция обратного вызова не принимает ни каких параметров.
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
``` 
Конечно async более гибкий, но когда дело доходит до HighLoad, выжать более 25% того стоит. <br>
p.s.: В методе messages.sendMessage происходит праверка прав, сохранение сообщения в базу данных, обновление кешей и другие подобные действия.
  
