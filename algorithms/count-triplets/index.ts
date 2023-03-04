/**
 
给你一个整数数组 nums ，返回其中 按位与三元组 的数目。

按位与三元组 是由下标 (i, j, k) 组成的三元组，并满足下述全部条件：

0 <= i < nums.length
0 <= j < nums.length
0 <= k < nums.length
nums[i] & nums[j] & nums[k] == 0 ，其中 & 表示按位与运算符。

输入：nums = [2,1,3]
输出：12
解释：可以选出如下 i, j, k 三元组：
(i=0, j=0, k=1) : 2 & 2 & 1
(i=0, j=1, k=0) : 2 & 1 & 2
(i=0, j=1, k=1) : 2 & 1 & 1
(i=0, j=1, k=2) : 2 & 1 & 3
(i=0, j=2, k=1) : 2 & 3 & 1
(i=1, j=0, k=0) : 1 & 2 & 2
(i=1, j=0, k=1) : 1 & 2 & 1
(i=1, j=0, k=2) : 1 & 2 & 3
(i=1, j=1, k=0) : 1 & 1 & 2
(i=1, j=2, k=0) : 1 & 3 & 2
(i=2, j=0, k=1) : 3 & 2 & 1
(i=2, j=1, k=0) : 3 & 1 & 2

输入：nums = [0,0,0]
输出：27

1 <= nums.length <= 1000
0 <= nums[i] < 216

https://leetcode.cn/problems/triples-with-bitwise-and-equal-to-zero/

 */

namespace CountTriplet {
  export function countTriplets(nums: number[]): number {
    let res = 0;

    const n = nums.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        for (let k = 0; k < n; k++) {
          if ((nums[i] & nums[j] & nums[k]) == 0) {
            res++;
          }
        }
      }
    }

    return res;
  }

  function answer(nums: number[]): number {
    let res = 0;

    let count = new Array(Math.pow(2, 16)).fill(0);
    for (const x of nums) {
      for (const y of nums) {
        if ((x & y) == 0) {
          count[x & y]++;
        }
      }
    }

    for (const x of nums) {
      for (let v = 0; v < 1 << 16; ++v) {
        if ((x & v) == 0) {
          res += count[x & v];
        }
      }
    }

    return res;
  }
}

(() => {
  const input = [0, 0, 0];

  console.log("input1:", input.toString());

  const result = CountTriplet.countTriplets(input);

  console.log("result:", result.toString());
})();
