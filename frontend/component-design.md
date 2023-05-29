# 组件设计模式

## 需要思考的问题

- 怎么才能让组件适配更多的使用场景？
- 怎么才能设计出比较简单并且合理的 API，让它变得易用？
- 怎么才能让该组件的 UI 界面和功能有较强的可扩展性？
- 如何在组件的灵活度和复杂度上达到平衡（取舍）？

### 1. 复合组件模式

```jsx
import React from "react";
import { Counter } from "./Counter";

function Usage() {
  const handleChangeCounter = (count) => {
    console.log("count", count);
  };

  return (
    <Counter onChange={handleChangeCounter}>
      <Counter.Decrement icon="minus" />
      <Counter.Label>Counter</Counter.Label>
      <Counter.Count max={10} />
      <Counter.Increment icon="plus" />
    </Counter>
  );
}

export { Usage };
```

```jsx
function Counter() {
  return <div>...</div>;
}

Counter.Count = Count;
Counter.Label = Label;
Counter.Increment = Increment;
Counter.Decrement = Decrement;

export { Counter };
```

将一个组件解耦为多个组件，有更加灵活的 `UI` 结构和 `API`，降低组件的复杂度（子组件承担自己的 `Props`，而不是由父组件传递）。有点类似数组的 `flatten`，减少组件嵌套的作用。内部的 `state` 一般使由 `context` 管理。

### 2. Props 受控

将关键 `state` 暴露到组件外，由外部控制组件的状态：

```jsx
import React, { useState } from "react";
import { Counter } from "./Counter";

function Usage() {
  const [count, setCount] = useState(0);

  const handleChangeCounter = (newCount) => {
    setCount(newCount);
  };
  return (
    <Counter value={count} onChange={handleChangeCounter}>
      <Counter.Decrement icon={"minus"} />
      <Counter.Label>Counter</Counter.Label>
      <Counter.Count max={10} />
      <Counter.Increment icon={"plus"} />
    </Counter>
  );
}

export { Usage };
```

### 3. 自定义钩子

自定义 `hook`，并对外暴露，外部组价可以通过 `hook` 访问组织的 `state`，这个其实是受控组件的提升，通过 `hook` 暴露更多的状态：

```jsx
function Usage() {
  const { count, handleIncrement, handleDecrement } = useCounter(0);

  return <div>...</div>;
}
```

这种方式会暴露更多的状态，更加的灵活，但同时需要写更多的逻辑来维护和实现组件。

### 4. Props Getters

这种模式把每一个子组件的 `props` 集成在自定义 `hook` 内部，并暴露 `getter`，使用者只需要将子组件的 `getter` 获取的 `props` 传入。

```jsx
function Usage() {
  const { count, getCounterProps, getIncrementProps, getDecrementProps } =
    useCounter({
      initial: 0,
      max: MAX_COUNT,
    });

  return (
    <>
      <Counter {...getCounterProps()}>
        <Counter.Decrement icon={"minus"} {...getDecrementProps()} />
        <Counter.Label>Counter</Counter.Label>
        <Counter.Count />
        <Counter.Increment icon={"plus"} {...getIncrementProps()} />
      </Counter>
      <button {...getIncrementProps({ onClick: handleBtn1Clicked })}>
        Custom increment btn 1
      </button>
      <button {...getIncrementProps({ disabled: count > MAX_COUNT - 2 })}>
        Custom increment btn 2
      </button>
    </>
  );
}
```

这种方式更加灵活，可以不用知道子组件内部的 `state` 细节，直接将 `getter` 拿到的属性回传就好。但同时也提供了自定义修改属性的方式，更加灵活可变。

### 5. 插件模式

这种模式主要针对比较复杂的组件，拥有多个拆分子组件，只要子组件实现规定的接口，就可以在组件内部调用，实现自定义。

```jsx
interface PluginModel {
  render(): void;
  // ...
}

function Counter({ plugins = [...defaultPlugins] }) {
  return (
    <>
      {plugins.map(() => {
        return plugins.render();
      })}
    </>
  );
}
```

插件模式一般用于拥有固定框架的组件中，提供默认样式的同时，也提供自定义的实现方式。

### Reference

【[详解 4 种不同的 React 组件设计模式](https://juejin.cn/post/6969335440839016455)】
