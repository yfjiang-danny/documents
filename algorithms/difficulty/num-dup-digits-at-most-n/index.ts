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
   * @description A[n,k] = n!/(n-k)! = n*(n-1)*...*(n-k)
   *
   * @param n
   * @param k
   * @returns
   */
  function getPermutationValue(n: number, k: number): number {
    if (k <= 0) {
      return getFactorialValue(n);
    }
    let res = 1,
      cur = n;
    while (cur >= k) {
      res *= cur;
    }
    return res;
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

    // console.log("maxCombination", maxCombination);

    const firstNum = maxNumArr[0];
    const arr = maxNumArr.slice(1);

    // arr.sort((a, b) => a - b);

    let notFit = 0;
    i = 0;

    while (i < arr.length) {
      notFit += (arr[i] - 1) * getPermutationValue(9, len - 1);
    }

    console.log("notFit", notFit);

    notFit += (firstNum - 1) * getPermutationValue(9, len - 1);

    i = len - 1;
    while (i > 1) {
      notFit += 9 * getPermutationValue(9, i - 1);
      i--;
    }

    notFit += 9;

    console.log("notFit", notFit);

    return n - notFit;
  }
}

// tsc -t esnext --outFile algorithms/test.js algorithms/test.ts algorithms/difficulty/num-dup-digits-at-most-n/index.ts && node algorithms/test.js
(() => {
  UnitTest.test(Difficulty.numDupDigitsAtMostN, 120, 13);
  // UnitTest.test(Difficulty.numDupDigitsAtMostN, 10, 0);
  // UnitTest.test(Difficulty.numDupDigitsAtMostN, 11, 1);
  // UnitTest.test(Difficulty.numDupDigitsAtMostN, 20, 1);
  // UnitTest.test(Difficulty.numDupDigitsAtMostN, 22, 2);
  // UnitTest.test(Difficulty.numDupDigitsAtMostN, 100, 10);
  // UnitTest.test(Difficulty.numDupDigitsAtMostN, 1000, 262);
  // UnitTest.test(Difficulty.numDupDigitsAtMostN, 999, 261);
})();
