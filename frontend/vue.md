# Vue

好的，我们来深入探讨 **Vue 的 Diff 算法**。Vue 的 Diff 算法同样基于虚拟 DOM，但在具体实现上与 React 有所不同，特别是在 Vue 2 和 Vue 3 之间存在显著的优化。

## Vue 2 的 Diff 算法

Vue 2 采用了一种非常经典的 **双端比较算法**，在子节点列表对比时尤其高效。

### 核心过程：updateChildren

当比较两个相同类型的节点且都有子节点时，Vue 2 会执行 `updateChildren` 方法：

#### 双指针四路比较

Vue 使用**四个指针**同时遍历新旧子节点数组：

- `oldStartIdx` / `newStartIdx`：旧/新开始指针
- `oldEndIdx` / `newEndIdx`：旧/新结束指针

**比较过程（循环执行直到任一列表遍历完成）：**

1. **`oldStartVnode` vs `newStartVnode`**（头头比较）

   - 如果相同：直接 patch，两个开始指针都右移

2. **`oldEndVnode` vs `newEndVnode`**（尾尾比较）

   - 如果相同：直接 patch，两个结束指针都左移

3. **`oldStartVnode` vs `newEndVnode`**（头尾比较）

   - 如果相同：说明节点从头部移到了尾部
   - 复用节点，将对应 DOM 移动到 `oldEndVnode` 之后，`oldStartIdx` 右移，`newEndIdx` 左移

4. **`oldEndVnode` vs `newStartVnode`**（尾头比较）

   - 如果相同：说明节点从尾部移到了头部
   - 复用节点，将对应 DOM 移动到 `oldStartVnode` 之前，`oldEndIdx` 左移，`newStartIdx` 右移

5. **Key 映射查找**
   - 如果以上四种情况都不匹配，Vue 会创建一个旧节点 key 到 index 的映射表
   - 用 `newStartVnode` 的 key 在映射表中查找
   - 如果找到：复用该节点，移动到正确位置
   - 如果没找到：创建新节点插入

#### 循环结束后的处理

- **新列表先遍历完**：删除旧列表中剩余的节点
- **旧列表先遍历完**：创建新列表中剩余的节点并插入

### 示例演示

```javascript
// 旧列表: [A, B, C, D]
// 新列表: [D, A, B, C]

// 比较过程：
1. 头头比较: A ≠ D ❌
2. 尾尾比较: D ≠ C ❌
3. 头尾比较: A ≠ C ❌
4. 尾头比较: D == D ✅
   - 将 D 移动到 A 前面
   - 旧列表指针: [A, B, C] | 新列表指针: [A, B, C]

5. 头头比较: A == A ✅
6. 头头比较: B == B ✅
7. 头头比较: C == C ✅
// 完成！只进行了一次移动操作
```

## Vue 3 的 Diff 算法优化

Vue 3 对 Diff 算法进行了重大优化，主要引入了 **最长递增子序列** 算法来最小化 DOM 移动操作。

### 主要优化点

#### 1. 前置后置筛选

在开始复杂比较前，Vue 3 先进行两轮快速处理：

**前置节点处理**：

```javascript
// 从头部开始，跳过相同节点
i = 0;
while (i <= oldEnd && i <= newEnd && sameVnode(old[i], new [i]())) {
  patch(old[i], new [i]());
  i++;
}
```

**后置节点处理**：

```javascript
// 从尾部开始，跳过相同节点
while (i <= oldEnd && i <= newEnd && sameVnode(old[oldEnd], new [newEnd]())) {
  patch(old[oldEnd], new [newEnd]());
  oldEnd--;
  newEnd--;
}
```

#### 2. 新增/删除处理

经过前置后置筛选后：

- 如果旧列表遍历完，新列表还有剩余 → **批量新增**
- 如果新列表遍历完，旧列表还有剩余 → **批量删除**

#### 3. 未知序列处理（核心优化）

当还有未处理的节点时，Vue 3 使用 **最长递增子序列** 来优化：

```javascript
// 1. 建立 key 到 index 的映射
const keyToNewIndexMap = new Map();
for (let i = newStart; i <= newEnd; i++) {
  keyToNewIndexMap.set(newChildren[i].key, i);
}

// 2. 找出不需要移动的最长递增子序列
const newIndexToOldIndexMap = new Array(remainingNewNodes);
const increasingNewIndexSequence = getSequence(newIndexToOldIndexMap);

// 3. 从后向前遍历，只有不在最长递增子序列中的节点才需要移动
let lastIndex = increasingNewIndexSequence.length - 1;
for (let i = remainingNewNodes - 1; i >= 0; i--) {
  if (i !== increasingNewIndexSequence[lastIndex]) {
    // 需要移动
    moveNode(newChildren[newStart + i]);
  } else {
    // 保持原位
    lastIndex--;
  }
}
```

### Vue 3 优化示例

```javascript
// 旧列表: [A, B, C, D, E]
// 新列表: [A, D, C, B, F, E]

// Vue 3 处理：
1. 前置处理: A == A ✅ (跳过)
2. 后置处理: E == E ✅ (跳过)
3. 剩余旧列表: [B, C, D] → 索引: [1,2,3]
4. 剩余新列表: [D, C, B, F] → 索引: [3,2,1,4]

5. 最长递增子序列: [2, 3] (对应 C, D)
6. 只有 B 和 F 需要移动
// 总操作: 1次移动(B) + 1次新增(F)
```

## Vue Diff 算法特点总结

### Vue 2 特点：

- **双端比较**：头头、尾尾、头尾、尾头四路比较
- **实现相对简单**，对于常见操作（头尾插入）很高效
- **移动操作相对较多**

### Vue 3 优化特点：

- **前置后置筛选**：快速处理头尾相同节点
- **最长递增子序列**：最小化 DOM 移动次数
- **Patch Flags**：编译时标记动态内容，运行时跳过静态比较
- **Fragment 支持**：更好处理多根节点模板

### Key 的重要性

与 React 一样，Vue 也强烈依赖 `key`：

```html
<!-- 好的 key：唯一且稳定 -->
<div v-for="item in list" :key="item.id">{{ item.name }}</div>

<!-- 坏的 key：使用索引 -->
<div v-for="(item, index) in list" :key="index">{{ item.name }}</div>
```

### 性能对比

Vue 3 的 Diff 算法在以下场景表现更优：

- **大量节点重排**：使用最长递增子序列最小化移动
- **静态内容**：Patch Flags 跳过不必要的比较
- **相同节点较多**：前置后置筛选快速处理

Vue 的 Diff 算法设计体现了"常见情况快速路径，复杂情况优化处理"的思想，在实际项目中能提供出色的性能表现。
