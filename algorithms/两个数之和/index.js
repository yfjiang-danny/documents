/**
 * Definition for singly-linked list.
 * */
var ListNode = /** @class */ (function () {
    function ListNode(val, next) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
    ListNode.prototype.toString = function () {
        if (this.next) {
            return this.val.toString() + this.next.toString();
        }
        return this.val.toString();
    };
    return ListNode;
}());
function getListValue(l, i) {
    if (i === void 0) { i = 1; }
    if (l.next) {
        return l.val * Math.pow(10, i - 1) + getListValue(l.next, i + 1);
    }
    return l.val * Math.pow(10, i - 1);
}
function createListNode(val) {
    var digit = val % 10;
    console.log("digit:", digit);
    var node = new ListNode(digit);
    if (val >= 10) {
        var remainder = Math.floor(val / 10);
        node.next = createListNode(remainder);
    }
    return node;
}
function createListNodeByList(val) {
    var resNode = new ListNode();
    var curNode = resNode;
    val.forEach(function (v, i) {
        if (i == 0) {
            resNode.val = v;
            curNode = resNode;
            return;
        }
        var node = new ListNode(v);
        curNode.next = node;
        curNode = node;
    });
    return resNode;
}
function getDeepLevel(node) {
    if (node.next) {
        return 1 + getDeepLevel(node.next);
    }
    return 1;
}
function addTwoNumbers(l1, l2) {
    var resNode = new ListNode();
    //   const res = getListValue(l1, 1) + getListValue(l2, 1);
    //   console.log("total:", res);
    //   return createListNode(res);
    var lv1 = getDeepLevel(l1);
    var lv2 = getDeepLevel(l2);
    var node1 = l1;
    var node2 = l2;
    var curNode;
    var up = 0;
    for (var i = 0; i < Math.max(lv1, lv2); i++) {
        if (!node1 || !node2)
            break;
        var a1 = node1.val;
        var a2 = node2.val;
        var sum = a1 + a2 + up;
        var digit = sum % 10;
        if (sum >= 10) {
            up = 1;
        }
        else {
            up = 0;
        }
        if (i == 0) {
            resNode.val = digit;
            curNode = resNode;
            node1 = node1.next;
            node2 = node2.next;
            continue;
        }
        var node = new ListNode(digit);
        curNode.next = node;
        curNode = node;
        node1 = node1.next;
        node2 = node2.next;
    }
    var diffNode = node1 !== null && node1 !== void 0 ? node1 : node2;
    while (diffNode) {
        var sum = diffNode.val + up;
        var digit = sum % 10;
        if (sum >= 10) {
            up = 1;
        }
        else {
            up = 0;
        }
        var node = new ListNode(digit);
        curNode.next = node;
        curNode = node;
        diffNode = diffNode.next;
    }
    return resNode;
}
var input1 = createListNodeByList([
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
]);
var input2 = createListNodeByList([5, 6, 4]);
console.log("input1:", input1.toString());
console.log("input2:", input2.toString());
var result = addTwoNumbers(input1, input2);
console.log("result:", result.toString());
// 输入：
// [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
// [5,6,4]
// 输出：
// [6,2,4,4,8,2,0,4,2,4,8,6,4,2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
// 预期结果：
// [6,6,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
