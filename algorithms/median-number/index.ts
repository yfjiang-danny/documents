/*
给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

算法的时间复杂度应该为 O(log (m+n)) 。

输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2

输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5


*/

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let res = 0;

  const len1 = nums1.length,
    len2 = nums2.length;

  const remainder = (len1 + len2) % 2;
  let index = -1,
    index1 = -1;
  if (remainder == 1) {
    index = Math.floor((len1 + len2) / 2);
  } else {
    index1 = (len1 + len2) / 2;
    index = index1 - 1;
  }

  if (len1 == 0 || len2 == 0) {
    if (remainder == 1) {
      return !!len1 ? nums1[index] : nums2[index];
    } else {
      return !!len1
        ? (nums1[index] + nums1[index1]) / 2
        : (nums2[index] + nums2[index1]) / 2;
    }
  }

  let i1 = 0,
    i2 = 0;

  if (remainder == 1) {
    while (i1 + i2 <= index) {
      if (i1 >= len1) {
        res = nums2[i2];
        i2++;
        continue;
      }
      if (i2 >= len2) {
        res = nums1[i1];
        i1++;
        continue;
      }
      if (nums1[i1] < nums2[i2]) {
        res = nums1[i1];
        i1++;
        continue;
      } else {
        res = nums2[i2];
        i2++;
        continue;
      }
    }
    return res;
  } else {
    let res1 = 0;
    while (i1 + i2 <= index1) {
      if (i1 + i2 == index1) {
        res1 = res;
      }
      if (i1 >= len1) {
        res = nums2[i2];
        i2++;
        continue;
      }
      if (i2 >= len2) {
        res = nums1[i1];
        i1++;
        continue;
      }
      if (nums1[i1] < nums2[i2]) {
        res = nums1[i1];
        i1++;
        continue;
      } else {
        res = nums2[i2];
        i2++;
        continue;
      }
    }
    return (res + res1) / 2;
  }
}

const input = [1, 2];
const input1 = [3, 4];
console.log("input:", input);
console.log("result:", findMedianSortedArrays(input, input1));
