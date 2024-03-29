/// <reference path="../../test.ts" />

/**
 * 1012. 至少有 1 位重复的数字
 * https://leetcode.cn/problems/numbers-with-repeated-digits/
 
给定正整数 n，返回在 [1, n] 范围内具有 至少 1 位 重复数字的正整数的个数。

输入：n = 20
输出：1
解释：具有至少 1 位重复数字的正数（<= 20）只有 11 。

输入：n = 100
输出：10
解释：具有至少 1 位重复数字的正数（<= 100）有 11，22，33，44，55，66，77，88，99 和 100 。

输入：n = 1000
输出：262

1 <= n <= 10^9

 */

namespace Difficulty {
  /**
   * 阶乘
   * @param num
   * @returns
   */
  function getFactorialValue(num: number): number {
    if (num <= 1) {
      return 1;
    }
    let res = 1,
      cur = 1;
    while (cur <= num && res <= Number.MAX_VALUE) {
      res *= cur;
      cur++;
    }
    return res;
  }

  /**
   * 组合
   * @description C[n,k] = n!/((n-k)!*k!) = n*(n-1)*...*(n-k)/k!
   *
   * @param n
   * @param k
   * @returns
   */
  function getCombinationValue(n: number, k: number): number {
    return (
      getFactorialValue(n) / (getFactorialValue(n - k) * getFactorialValue(k))
    );
  }

  /**
   * 排列
   * @description A[n,k] = n!/(n-k)! = n*(n-1)*...*(n-k)
   *
   * @param n
   * @param k
   * @returns
   */
  function getPermutationValue(n: number, k: number): number {
    if (k <= 0 || n < k) {
      return 0;
    }
    let res = 1,
      cur = n;
    while (cur > n - k) {
      res *= cur;
      cur--;
    }
    return res;
  }

  function getPartialValue(
    arr: number[],
    i: number,
    map: Map<number, boolean>
  ): number {
    let res = 0,
      max = arr[i];
    if (i == arr.length - 1) {
      let j = max;
      while (j >= 0) {
        if (!map.has(j)) {
          res += 1;
        }
        j--;
      }
      return res;
    }

    // console.log(i, res);
    // console.log("map", map);

    if (!map.has(max)) {
      const newMap = new Map(map);
      newMap.set(max, true);
      res += getPartialValue(arr, i + 1, newMap);
    }
    if (max > 0) {
      let j = max - 1,
        count = 0;
      // console.log("j", j);
      // console.log("map", map);
      while (j >= 0) {
        if (!map.has(j)) {
          count += 1;
        }
        j--;
      }
      // console.log("count", count);

      res +=
        count * (getPermutationValue(10 - (i + 1), arr.length - (i + 1)) || 1);
    }
    // console.log("res", res);

    return res;
  }

  function getIntegralValue(max: number, len: number): number {
    if (len <= 1) {
      return max;
    }

    let notFit = 0;
    if (max - 1 > 0) {
      notFit += (max - 1) * getPermutationValue(9, len - 1);
    }

    let i = len - 1;
    while (i > 1) {
      notFit += 9 * getPermutationValue(9, i - 1);
      i--;
    }

    notFit += 9;

    return notFit;
  }

  export function numDupDigitsAtMostN(n: number): number {
    if (n <= 10) {
      return 0;
    }

    const s = n.toString();
    const len = s.length;

    const maxNumArr: number[] = [];
    let i = 0;
    while (i < len) {
      const num = parseInt(s.charAt(i));

      maxNumArr.push(num);
      i++;
    }

    let notFit = getIntegralValue(maxNumArr[0], maxNumArr.length);

    // console.log("notFit", notFit);

    i = 1;
    const map = new Map<number, boolean>();
    map.set(maxNumArr[0], true);
    notFit += getPartialValue(maxNumArr, i, map);
    // console.log("notFit", notFit);

    return n - notFit;
  }

  export function answer1(n: number): number {
    const sn = "" + n;
    const dp = new Array(sn.length)
      .fill(0)
      .map(() => new Array(1 << 10).fill(-1));
    const f = (mask, sn, i, same) => {
      if (i === sn.length) {
        return 1;
      }
      if (!same && dp[i][mask] >= 0) {
        return dp[i][mask];
      }
      let res = 0,
        t = same ? sn[i].charCodeAt() - "0".charCodeAt(0) : 9;
      for (let k = 0; k <= t; k++) {
        if ((mask & (1 << k)) !== 0) {
          continue;
        }
        res += f(
          mask === 0 && k === 0 ? mask : mask | (1 << k),
          sn,
          i + 1,
          same && k === t
        );
      }
      if (!same) {
        dp[i][mask] = res;
      }
      return res;
    };
    return n + 1 - f(0, sn, 0, true);
  }
}

// tsc -t esnext --outFile algorithms/test.js algorithms/test.ts algorithms/difficulty/num-dup-digits-at-most-n/index.ts && node algorithms/test.js
(() => {
  UnitTest.test(Difficulty.numDupDigitsAtMostN, 10, 0);
  UnitTest.test(Difficulty.numDupDigitsAtMostN, 11, 1);
  UnitTest.test(Difficulty.numDupDigitsAtMostN, 20, 1);
  UnitTest.test(Difficulty.numDupDigitsAtMostN, 22, 2);
  UnitTest.test(Difficulty.numDupDigitsAtMostN, 100, 10);
  UnitTest.test(Difficulty.numDupDigitsAtMostN, 120, 21);
  UnitTest.test(Difficulty.numDupDigitsAtMostN, 999, 261);
  UnitTest.test(Difficulty.numDupDigitsAtMostN, 1000, 262);
})();
