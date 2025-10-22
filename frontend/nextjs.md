# Nextjs

### 什么是 Next.js？它与 React 的关系是什么？

Next.js 是一个基于 React 的全栈开发框架，由 Vercel 开发和维护。它在 React 的基础上提供了额外的功能和优化，如服务器组件(Server Components)、流式渲染(Streaming)、服务器操作(Server Actions)等。
我认为 Next.js 最大的价值在于它简化了 React 应用的开发流程，特别是在处理服务器端渲染和路由方面，使我们能够构建高性能、SEO 友好的应用，而无需从零开始配置复杂的工具链。

### Next.js 14 有哪些主要特性？这些特性如何提升开发体验？

- React Server Components: 默认使用服务器组件，减少客户端 JavaScript 体积，提升性能
- App Router: 基于文件夹的路由系统，支持布局、加载状态和错误处理，简化路由管理
- 服务器操作(Server Actions): 直接在组件中定义服务器端逻辑，无需创建 API 路由
- 流式渲染(Streaming): 逐步渲染 UI，提高用户体验和感知性能
- Turbopack: 基于 Rust 的打包工具，提供更快的开发体验和热重载
- 内置优化: 自动图像、字体和脚本优化，无需额外配置
- SEO 优化: 内置元数据 API 和结构化数据支持，提升搜索引擎可见性
- 国际化路由: 内置的多语言支持，简化国际化应用开发
- Middleware: 请求处理中间件，实现认证、重定向等功能

### 解释 Next.js 的 App Router 是如何工作的？它与 Pages Router 有何不同？

App Router 是 Next.js 13+引入的基于文件夹的路由系统，它使用约定式路由，通过文件夹结构自动创建路由：

- 核心概念: 使用 app 目录组织路由结构，每个路由段对应一个文件夹
- 特殊文件约定:
  - page.js: 定义路由 UI 和公开访问点
  - layout.js: 定义共享布局，可嵌套
  - loading.js: 创建加载 UI，自动集成 Suspense
  - error.js: 处理错误，自动集成 Error Boundary
  - not-found.js: 处理 404 错误
- 高级功能:
  - 支持嵌套路由和布局
  - 路由组(Route Groups): 使用(groupName)语法组织路由而不影响 URL 结构
  - 平行路由(Parallel Routes): 使用@folder 语法在同一页面显示多个路由
  - 拦截路由(Intercepting Routes): 使用(.)、(..)、(...)语法拦截路由，如模态框

与 Pages Router 相比，App Router 的主要区别：

- 服务器组件: App Router 默认使用 React 服务器组件，而 Pages Router 使用客户端组件
- 布局系统: App Router 提供了更强大的嵌套布局系统，Pages Router 需要使用自定义\_app.js
- 数据获取: App Router 允许在组件中直接使用 async/await，Pages Router 使用 getServerSideProps 等函数
- 文件约定: App Router 使用 page.js 表示路由，Pages Router 使用 index.js 或命名文件
- 路由分组: App Router 支持路由组、平行路由和拦截路由等高级功能

### 在服务端渲染中流式渲染是为了解决什么问题？

过去 SSR 需要等待服务端渲染完毕、组件代码打包到 bundle、完成水合后才能操作。Streaming SSR 可以一边渲染一边传输。

### 一般怎么触发流式渲染？使用场景是什么？

核心是采用 Suspense 在渲染的时候用一个占位符替代，等在服务端请求完毕，再流式传输给 html，替代之前占位符，用 loading.js、page 内的 suspense 都可以触发这种流式渲染。

流式渲染特别适合包含多个独立数据区域的页面。

### 服务端组件有哪些特性和限制？

- 服务端组件在服务器上渲染，不发送 JavaScript 到客户端。适用于不需要客户端交互的 UI 部分，可以显著减少 JavaScript 包大小，可以直接连接数据库、文件系统或其他后端服务，无需中间 API 层，内容在服务器端渲染，搜索引擎可以更好地索引页面内容。
- 服务端组件不能使用 React Hooks、浏览器 API、事件处理器。不能响应客户端组件的状态变化，从服务端组件传递给客户端组件的 props 必须是可序列化的（不能是函数或类实例）。
