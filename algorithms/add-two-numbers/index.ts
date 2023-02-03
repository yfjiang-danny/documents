/**
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

 
示例：

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。


输入：nums = [3,2,4], target = 6
输出：[1,2]


输入：nums = [3,3], target = 6
输出：[0,1]

 */

/**
 * 因为数的长度可能超过 100，所以不成使用简单的数值加减
 */

/**
 * Definition for singly-linked list.
 * */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }

  toString() {
    if (this.next) {
      return this.val.toString() + this.next.toString();
    }
    return this.val.toString();
  }
}

// 这种方式不成，因为数值可能超限
// function getListValue(l: ListNode, i = 1): number {
//   if (l.next) {
//     return l.val * Math.pow(10, i - 1) + getListValue(l.next, i + 1);
//   }
//   return l.val * Math.pow(10, i - 1);
// }

// function createListNode(val: number): ListNode {
//   const digit = val % 10;
//   console.log("digit:", digit);

//   const node = new ListNode(digit);

//   if (val >= 10) {
//     const remainder = Math.floor(val / 10);
//     node.next = createListNode(remainder);
//   }

//   return node;
// }

function createListNodeByList(val: number[]): ListNode {
  const resNode = new ListNode();
  let curNode = resNode;
  val.forEach((v, i) => {
    if (i == 0) {
      resNode.val = v;
      curNode = resNode;
      return;
    }
    const node = new ListNode(v);
    curNode.next = node;
    curNode = node;
  });
  return resNode;
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode {
  const resNode: ListNode = new ListNode();

  function getDeepLevel(node: ListNode): number {
    if (node.next) {
      return 1 + getDeepLevel(node.next);
    }
    return 1;
  }

  const lv1 = getDeepLevel(l1);
  const lv2 = getDeepLevel(l2);

  let node1 = l1;
  let node2 = l2;

  let curNode: ListNode;
  let up = 0;
  for (let i = 0; i < Math.max(lv1, lv2); i++) {
    if (!node1 || !node2) break;
    const a1 = node1.val;
    const a2 = node2.val;
    const sum = a1 + a2 + up;
    const digit = sum % 10;
    if (sum >= 10) {
      up = 1;
    } else {
      up = 0;
    }
    if (i == 0) {
      resNode.val = digit;
      curNode = resNode;
      node1 = node1.next;
      node2 = node2.next;
      continue;
    }
    const node = new ListNode(digit);
    curNode.next = node;
    curNode = node;
    node1 = node1.next;
    node2 = node2.next;
  }

  let diffNode = node1 ?? node2;
  while (diffNode) {
    const sum = diffNode.val + up;
    const digit = sum % 10;
    if (sum >= 10) {
      up = 1;
    } else {
      up = 0;
    }
    const node = new ListNode(digit);
    curNode.next = node;
    curNode = node;
    diffNode = diffNode.next;
  }

  // 解决最后一位依然有进位的情况
  if (up == 1) {
    curNode.next = new ListNode(1);
  }

  return resNode;
}

const input1 = createListNodeByList([
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1,
]);
const input2 = createListNodeByList([5, 6, 4]);

console.log("input1:", input1.toString());
console.log("input2:", input2.toString());

const result = addTwoNumbers(input1, input2);

console.log("result:", result.toString());

// 输入：
// [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
// [5,6,4]
// 输出：
// [6,2,4,4,8,2,0,4,2,4,8,6,4,2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
// 预期结果：
// [6,6,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
