/// <reference path="../test.ts" />
namespace EnhanceMath {
  /**
   * 获取最大公约数
   * @param num1
   * @param num2
   * @returns
   */
  export function getMaxCommonDivisor(num1: number, num2: number): number {
    if (num1 == 0 || num2 == 0) {
      return 0;
    }
    let max = Math.max(num1, num2);
    let min = Math.min(num1, num2);
    let a = max % min;
    if (a == 0) {
      return min;
    }
    max = min;
    min = a;
    while (min != 0) {
      a = max % min;
      max = min;
      min = a;
    }
    return max;
  }

  /**
   * 获取最小公倍数
   * @param num1
   * @param num2
   * @returns
   */
  export function getMinCommonMultipleNumber(
    num1: number,
    num2: number
  ): number {
    let a = num1,
      b = num2;
    let maxDivisor = getMaxCommonDivisor(num1, num2);
    let res = 1;
    while (maxDivisor != 1) {
      res *= maxDivisor;
      a /= maxDivisor;
      b /= maxDivisor;
      maxDivisor = getMaxCommonDivisor(a, b);
    }
    res *= a * b;
    return res;
  }

  /**
   * 判断是否是质数
   * @param num
   * @returns
   */
  export function isPrimeNumber(num: number): boolean {
    if (num == 1) {
      return true;
    }
    const half = Math.floor(Math.sqrt(num));
    for (let i = 2; i < half; i++) {
      if (num % half === 0) {
        return false;
      }
    }
    return true;
  }
}

// tsc -t esnext --outFile algorithms/test.js algorithms/test.ts algorithms/utils/math.ts && node algorithms/test.js
(() => {
  UnitTest.test(EnhanceMath.getMinCommonMultipleNumber, 4, 6, 12);
  UnitTest.test(EnhanceMath.getMinCommonMultipleNumber, 4, 8, 8);
  UnitTest.test(EnhanceMath.getMinCommonMultipleNumber, 5, 7, 35);
})();
