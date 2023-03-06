/**
 
给你一个字符串 s ，它仅包含字符 'a' 和 'b'​​​​ 。

你可以删除 s 中任意数目的字符，使得 s 平衡 。当不存在下标对 (i,j) 满足 i < j ，且 s[i] = 'b' 的同时 s[j]= 'a' ，此时认为 s 是 平衡 的。

请你返回使 s 平衡 的 最少 删除次数。

输入：s = "aababbab"
输出：2
解释：你可以选择以下任意一种方案：
下标从 0 开始，删除第 2 和第 6 个字符（"aababbab" -> "aaabbb"），
下标从 0 开始，删除第 3 和第 6 个字符（"aababbab" -> "aabbbb"）。

输入：s = "bbaaaaabb"
输出：2
解释：唯一的最优解是删除最前面两个字符。

1 <= s.length <= 105
s[i] 要么是 'a' 要么是 'b'​ 。​

https://leetcode.cn/problems/minimum-deletions-to-make-string-balanced/

 */

namespace MinimumDeletions {
  export function minimumDeletions(s: string): number {
    let endA = {
        minDel: 0,
        countA: 0,
      },
      endB = {
        minDel: 0,
        countA: 0,
        countB: 0,
      };

    let i = 0;
    while (i < s.length) {
      if (s[i] == "a") {
        let countA = 1;
        while (i + countA < s.length && s[i + countA] == "a") {
          countA++;
        }
        i += countA;
        const tempMinDelA = endA.minDel;
        if (tempMinDelA > endB.countB + endB.minDel) {
          endA = {
            minDel: endB.countB + endB.minDel,
            countA: endB.countA + countA,
          };
        } else {
          endA.countA += countA;
        }
        endB.minDel += countA;
        continue;
      }

      let countB = 1;
      while (i + countB < s.length && s[i + countB] == "b") {
        countB++;
      }
      i += countB;
      const tempMinDel = endB.minDel;
      if (tempMinDel > endA.minDel) {
        endB = {
          minDel: endA.minDel,
          countA: endA.countA,
          countB: countB,
        };
      } else {
        endB.countB += countB;
      }
      endA.minDel += countB;
      continue;
    }

    return Math.min(endA.minDel, endB.minDel);
  }

  export function answer(s: string): number {
    let leftB = 0,
      rightA = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "a") {
        rightA++;
      }
    }
    let res = rightA;
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (c === "a") {
        rightA--;
      } else {
        leftB++;
      }
      res = Math.min(res, leftB + rightA);
    }
    return res;
  }
}

(() => {
  const input = "aababbab";

  console.log("input:", input.toString());

  const result = MinimumDeletions.answer(input);

  console.log("result:", result.toString());
})();
