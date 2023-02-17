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
   优：a.解决 callback（回调地狱） 的问题 b.包含了更好的错误处理（异常处理） c.统一异步 API，Promise 逐渐被用作浏览器的异步 API，统一了各种各样的 API，以及不兼容的模式和手法。
   缺：a.无法取消和中断，一旦新建就会立即执行，无法中途取消 b. 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部 c.当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将结束）？ d. Promise 真正执行回调的时候，定义 Promise 那部分实际上已经执行完了，所以 Promise 的报错堆栈上下文不太友好

3. JWT 和 Oauth 的区别 [知乎](https://zhuanlan.zhihu.com/p/121630884)
   - JWT(Json Web Token) 是一种认证协议 。JWT 提供了一种用于发布接入令牌（Access Token),并对发布的签名接入令牌进行验证的方法。 令牌（Token）本身包含了一系列声明，应用程序可以根据这些声明限制用户对资源的访问。
   - JWT 一般是由三部分组成，Header + Payload + Signature。Header 部分是一个 JSON 对象，描述 JWT 的元数据；Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。Signature 部分是对前两部分的签名，防止数据篡改。其中 Header 部分和 Payload 部分通常会采用 Base64URL 的算法进行加密。
   - Base64URL 算法与 Base64 算法的区别：Base64 有三个字符`+`、`/`和`=`，在 URL 里面有特殊含义，所以要被替换掉：`=`被省略、`+`替换成`-`，`/`替换成`_` 。这就是 Base64URL 算法。
   - OAuth2 是一种授权框架。提供了一套详细的授权机制（指导）。用户或应用可以通过公开的或私有的设置，授权第三方应用访问特定资源。比如微信授权登录。
