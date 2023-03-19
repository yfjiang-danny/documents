/// <reference path="../../test.ts" />

/**
 * 2389. 和有限的最长子序列
 
给你一个长度为 n 的整数数组 nums ，和一个长度为 m 的整数数组 queries 。

返回一个长度为 m 的数组 answer ，其中 answer[i] 是 nums 中 元素之和小于等于 queries[i] 的子序列的最大长度  。

子序列 是由一个数组删除某些元素（也可以不删除）但不改变剩余元素顺序得到的一个数组。

输入：nums = [4,5,2,1], queries = [3,10,21]
输出：[2,3,4]
解释：queries 对应的 answer 如下：
- 子序列 [2,1] 的和小于或等于 3 。可以证明满足题目要求的子序列的最大长度是 2 ，所以 answer[0] = 2 。
- 子序列 [4,5,1] 的和小于或等于 10 。可以证明满足题目要求的子序列的最大长度是 3 ，所以 answer[1] = 3 。
- 子序列 [4,5,2,1] 的和小于或等于 21 。可以证明满足题目要求的子序列的最大长度是 4 ，所以 answer[2] = 4 。

输入：nums = [2,3,4,5], queries = [1]
输出：[0]
解释：空子序列是唯一一个满足元素和小于或等于 1 的子序列，所以 answer[0] = 0 。

n == nums.length
m == queries.length
1 <= n, m <= 1000
1 <= nums[i], queries[i] <= 10^6

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/longest-subsequence-with-limited-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 */

namespace Easy {
  export function getMaxLen(sums: number[], value: number): number {
    let res = 0,
      right = sums.length - 1;

    console.log(sums);

    while (right > res - 1) {
      console.log("right: ", right);
      console.log("res: ", res);
      console.log("");

      if (sums[right] <= value) {
        res = Math.max(res, right + 1);
        break;
      }
      let left = 0;
      while (left <= right - res) {
        console.log("diff:", sums[right] - sums[left], " ", value);

        if (sums[right] - sums[left] <= value) {
          res = Math.max(res, right - left);
          break;
        }
        left++;
      }
      right--;
    }
    return res;
  }

  export function answerQueries(nums: number[], queries: number[]): number[] {
    const res = [];

    let sum = 0,
      sums = [];
    for (const num of nums) {
      sum += num;
      sums.push(sum);
    }

    console.log(sums);

    const map = new Map<number, number>();
    for (const v of queries) {
      if (map.has(v)) {
        res.push(map.get(v));
      } else {
        const maxLen = getMaxLen(sums, v);
        res.push(maxLen);
        map.set(v, maxLen);
      }
    }

    return res;
  }

  export function answer1(nums: number[], queries: number[]): number[] {
    nums.sort((a, b) => a - b);

    const res = [];

    let sum = 0,
      sums = [];
    for (const num of nums) {
      sum += num;
      sums.push(sum);
    }

    const map = new Map<number, number>();
    for (const v of queries) {
      if (map.has(v)) {
        res.push(map.get(v));
      } else {
        let index = sums.findIndex((a) => a > v);
        let maxLen = index;
        if (index == -1) {
          maxLen = sums.length;
        }
        res.push(maxLen);
        map.set(v, maxLen);
      }
    }

    return res;
  }
}

// tsc -t esnext --outFile algorithms/easy/test.js algorithms/easy/test.ts algorithms/easy/answer-queries/index.ts && node algorithms/easy/test.js
(() => {
  // Easy.getMaxLen([736411, 921293, 1835934, 1873859, 2088774], 718089);
  UnitTest.test(Easy.answer1, [4, 5, 2, 1], [3, 10, 21], [2, 3, 4]);
  UnitTest.test(Easy.answer1, [2, 3, 4, 5], [1], [0]);
  UnitTest.test(
    Easy.answer1,

    [736411, 184882, 914641, 37925, 214915],
    [331244, 273144, 118983, 118252, 305688, 718089, 665450],
    [2, 2, 1, 1, 2, 3, 3]
  );
  //   UnitTest.test(Easy.answerQueries, [], []);
  //   UnitTest.test(Easy.answerQueries, [], []);
  //   UnitTest.test(Easy.answerQueries, [], []);
})();
