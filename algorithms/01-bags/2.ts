/**
 * 01-背包，二维数组解法;
 * 对于容量 j（j < maxW），计算前 i 件物品在 j 容量下的最大价值 matrix[i][j]
 * 其中 matrix[0][0...n] 和 matrix[0...n][0] 初始化为 0（表示未有容量或未装物品时的价值都为0），循环从 i = 1，j = 1 开始
 * @param w 重量
 * @param v 价值
 * @param maxW 背包容量
 */
function get01BagMaxValue(w: number[], v: number[], maxW: number): number {
  if (!w.length) {
    return 0;
  }
  if (w.length !== v.length) {
    throw new Error("输入的重量个数和价值个数不一致");
  }
  const matrix: number[][] = [];
  for (let i = 0; i <= w.length; i++) {
    matrix[i] = [0];
  }
  for (let i = 0; i <= maxW; i++) {
    matrix[0][i] = 0;
  }
  for (let i = 1; i <= w.length; i++) {
    const weight = w[i - 1];
    const value = v[i - 1];
    for (let j = 1; j <= maxW; j++) {
      if (weight > j) {
        // 放不下
        matrix[i][j] = matrix[i][j - 1];
      } else {
        matrix[i][j] = Math.max(
          matrix[i - 1][j],
          matrix[i - 1][j - weight] + value
        );
      }
    }
  }
  return matrix[w.length][maxW];
}
