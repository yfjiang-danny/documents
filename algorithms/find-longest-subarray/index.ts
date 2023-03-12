/**
 
 给定一个放有字母和数字的数组，找到最长的子数组，且包含的字母和数字的个数相同。

返回该子数组，若存在多个最长子数组，返回左端点下标值最小的子数组。若不存在这样的数组，返回一个空数组。



输入: ["A","1","B","C","D","2","3","4","E","5","F","G","6","7","H","I","J","K","L","M"]

输出: ["A","1","B","C","D","2","3","4","E","5","F","G","6","7"]

输入: ["A","A"]

输出: []

array.length <= 100000
 
 https://leetcode.cn/problems/find-longest-subarray-lcci/
 */

namespace FindLongestSubarray {
  export function findLongestSubarray(array: string[]): string[] {
    const map = new Map<number, number>();

    let total = 0,
      maxLen = 0,
      startIndex = 0;
    for (let i = 0; i < array.length; i++) {
      if (/[0-9]/.test(array[i])) {
        // 字母
        total -= 1;
      } else {
        // 数字
        total += 1;
      }
      if (total == 0) {
        if (maxLen < i) {
          maxLen = i + 1;
          startIndex = 0;
        }
      } else {
        if (map.has(total)) {
          const sIndex = map.get(total) as number;
          if (maxLen < i - sIndex) {
            maxLen = i - sIndex;
            startIndex = sIndex + 1;
          }
        } else {
          map.set(total, i);
        }
      }
    }

    // console.log("map: ", map);
    // console.log("maxLen: ", maxLen);

    return array.slice(startIndex, startIndex + maxLen);
  }
}

(() => {
  const input = ["A", "1"];

  console.log("input1:", input.toString());

  const result = FindLongestSubarray.findLongestSubarray(input);

  console.log("result:", result.toString());
})();
