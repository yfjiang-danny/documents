/**
 
给你一个整数数组 ranks 和一个字符数组 suit 。你有 5 张扑克牌，第 i 张牌大小为 ranks[i] ，花色为 suits[i] 。

下述是从好到坏你可能持有的 手牌类型 ：

"Flush"：同花，五张相同花色的扑克牌。
"Three of a Kind"：三条，有 3 张大小相同的扑克牌。
"Pair"：对子，两张大小一样的扑克牌。
"High Card"：高牌，五张大小互不相同的扑克牌。
请你返回一个字符串，表示给定的 5 张牌中，你能组成的 最好手牌类型 。

注意：返回的字符串 大小写 需与题目描述相同。


输入：ranks = [13,2,3,1,9], suits = ["a","a","a","a","a"]
输出："Flush"
解释：5 张扑克牌的花色相同，所以返回 "Flush" 。

输入：ranks = [4,4,2,4,4], suits = ["d","a","a","b","c"]
输出："Three of a Kind"
解释：第一、二和四张牌组成三张相同大小的扑克牌，所以得到 "Three of a Kind" 。
注意我们也可以得到 "Pair" ，但是 "Three of a Kind" 是更好的手牌类型。
有其他的 3 张牌也可以组成 "Three of a Kind" 手牌类型。

输入：ranks = [10,10,2,12,9], suits = ["a","b","c","a","d"]
输出："Pair"
解释：第一和第二张牌大小相同，所以得到 "Pair" 。
我们无法得到 "Flush" 或者 "Three of a Kind" 。

ranks.length == suits.length == 5
1 <= ranks[i] <= 13
'a' <= suits[i] <= 'd'
任意两张扑克牌不会同时有相同的大小和花色。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/best-poker-hand
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 */

function bestHand(ranks: number[], suits: string[]): string {
  const mapR = new Map<number, number>();

  let maybeFlush = true;

  let isPair = false;

  for (let i = 0; i < ranks.length; i++) {
    const s = suits[i];
    if (i > 0 && maybeFlush) {
      if (s != suits[i - 1]) {
        maybeFlush = false;
      }
      if (i == 4) {
        return "Flush";
      }
    }

    const r = ranks[i];
    if (mapR.has(r)) {
      const count = mapR.get(r) + 1;
      mapR.set(r, count);
      if (count >= 3) {
        return "Three of a Kind";
      }
      if (count == 2) {
        isPair = true;
      }
    } else {
      mapR.set(r, 1);
    }
  }

  return isPair ? "Pair" : "High Card";
}

const input1 = [10, 10, 2, 12, 9];
const input2 = ["d", "a", "a", "b", "c"];

console.log("input1:", input1.toString());
console.log("input2:", input2.toString());

const result = bestHand(input1, input2);

console.log("result:", result.toString());
