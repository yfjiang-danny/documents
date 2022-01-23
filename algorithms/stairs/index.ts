/**
 * climbStairs，走阶梯；递归的方法，只能再 n 很小的情况下才能用，不然会溢出
 *
 * @param n
 * @returns
 */
function climbStairs(n: number): number {
  if (n <= 0) {
    return 0;
  }
  if (n == 1) {
    return 1;
  }
  if (n == 2) {
    return 2;
  }
  return climbStairs(n - 1) + climbStairs(n - 2);
}

/**
 * climbStairs1，动态规划
 * 第 i 阶必定是从 i-1 或 i-2 阶走上来的，当 i 增加时，也需要更新 i-1 和 i-2 的值
 * @param n
 * @returns
 */
function climbStairs1(n: number): number {
  if (n <= 0) {
    return 0;
  }
  if (n == 1) {
    return 1;
  }
  if (n == 2) {
    return 2;
  }
  let downStair2 = 1,
    downStair1 = 2,
    result = 0;
  for (let i = 3; i <= n; i++) {
    result = downStair1 + downStair2;
    downStair2 = downStair1;
    downStair1 = result;
  }
  return result;
}
