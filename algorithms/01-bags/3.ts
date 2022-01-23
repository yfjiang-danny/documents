/**
 * 01-背包，输出路径;
 * 在01背包最大值的二维数组解法上，加上一个 paths 的二维数组记录路径 path[i][j] -> []（i 为物品，j 为容量）
 * 当且仅当 matrix[i - 1][j - weight] + value >= matrix[i - 1][j] 时，才将当前物品记录进路径中
 * @param w 重量
 * @param v 价值
 * @param maxW 背包容量
 * @returns
 */
function get01BagPath(w: number[], v: number[], maxW: number): Array<number>[] {
  if (!w.length) {
    return [];
  }
  if (w.length !== v.length) {
    throw new Error("输入的重量个数和价值个数不一致");
  }
  const matrix: number[][] = [];
  const path: Array<number>[][] = [];
  for (let i = 0; i <= w.length; i++) {
    matrix[i] = [0];
    path[i] = [new Array<number>()];
  }
  for (let i = 0; i <= maxW; i++) {
    matrix[0][i] = 0;
    path[0][i] = new Array<number>();
  }
  for (let i = 1; i <= w.length; i++) {
    const weight = w[i - 1];
    const value = v[i - 1];
    for (let j = 1; j <= maxW; j++) {
      if (weight > j) {
        // 放不下
        matrix[i][j] = matrix[i][j - 1];
        path[i][j] = path[i][j - 1];
      } else {
        matrix[i][j] = Math.max(
          matrix[i - 1][j],
          matrix[i - 1][j - weight] + value
        );
        if (matrix[i - 1][j] > matrix[i - 1][j - weight] + value) {
          path[i][j] = path[i - 1][j];
        } else {
          const v = Array.from(path[i - 1][j - weight]);
          //   const v = JSON.parse(JSON.stringify(path[i - 1][j - weight]));
          v.push(i);
          path[i][j] = v;
        }
      }
    }
  }

  const resPaths: number[][] = [];
  const maxValue = matrix[w.length][maxW];
  for (let i = w.length; i > 0; i--) {
    for (let j = maxW; j > 0; j--) {
      if (matrix[i][j] === maxValue) {
        const p = path[i][j];
        const findP = resPaths.find((v) => v && v.toString() == p.toString());
        if (!findP) {
          resPaths.push(p);
        }
        continue;
      }
      if (matrix[i][j] < maxValue) {
        break;
      }
    }
  }
  return resPaths.map((v) => {
    return v.map((a) => a - 1);
  });
}
