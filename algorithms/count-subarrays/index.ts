/**
 * 2488. 统计中位数为 K 的子数组
 
给你一个长度为 n 的数组 nums ，该数组由从 1 到 n 的 不同 整数组成。另给你一个正整数 k 。

统计并返回 nums 中的 中位数 等于 k 的非空子数组的数目。

注意：

数组的中位数是按 递增 顺序排列后位于 中间 的那个元素，如果数组长度为偶数，则中位数是位于中间靠 左 的那个元素。
例如，[2,3,1,4] 的中位数是 2 ，[8,4,3,5,1] 的中位数是 4 。
子数组是数组中的一个连续部分。


输入：nums = [3,2,1,4,5], k = 4
输出：3
解释：中位数等于 4 的子数组有：[4]、[4,5] 和 [1,4,5] 。

输入：nums = [2,3,1], k = 3
输出：1
解释：[3] 是唯一一个中位数等于 3 的子数组。

n == nums.length
1 <= n <= 105
1 <= nums[i], k <= n
nums 中的整数互不相同

https://leetcode.cn/problems/count-subarrays-with-median-k/
 */

namespace ArrayType {
  const sign = (num) => {
    if (num === 0) {
      return 0;
    }
    return num > 0 ? 1 : -1;
  };

  export function countSubarrays(nums: number[], k: number): number {
    const n = nums.length;
    let kIndex = -1;
    for (let i = 0; i < n; i++) {
      if (nums[i] === k) {
        kIndex = i;
        break;
      }
    }
    let ans = 0;
    const counts = new Map();
    counts.set(0, 1);
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += sign(nums[i] - k);
      if (i < kIndex) {
        counts.set(sum, (counts.get(sum) || 0) + 1);
      } else {
        const prev0 = counts.get(sum) || 0;
        const prev1 = counts.get(sum - 1) || 0;
        ans += prev0 + prev1;
      }
    }
    return ans;
  }

  export function test(nums: number[], k: number, expect: number) {
    const res = countSubarrays(nums, k);
    if (res != expect) {
      console.log("input:", nums.toString());
      console.log("input:", k);
      console.log("expect: ", expect);
      console.log("result: ", res);
      console.log("");
    }
  }
}

(() => {
  ArrayType.test([2, 5, 1, 4, 3, 6], 1, 3);
  ArrayType.test([3, 2, 1, 4, 5], 4, 3);
  ArrayType.test([2, 3, 1], 3, 1);
  ArrayType.test([3], 4, 0);
  ArrayType.test([3], 3, 1);
})();
