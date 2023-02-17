# 前端大杂烩

1. 宏任务和微任务
   首先，JS 是一个单线程的脚本语言。也就是说在一行代码执行的过程中，必然不会存在同时执行的另一行代码。
   **微任务会在宏任务之前执行；** 在当前的微任务没有执行完成时，是不会执行下一个宏任务的。
   所以一个 js 线程里边定义的微任务会优先于宏任务先执行。
   setTimeout 和 setInterval 属于宏任务。
   Promise.then 属于微任务。

   ```typescript
   setTimeout(() => console.log(0), 0);
   new Promise((r) => {
     r();
   }).then((r) => console.log(2));

   // output: 2 0
   ```

2. Promise 的优缺点
   优：解决 callback（回调地狱） 的问题
   缺：不可中断
