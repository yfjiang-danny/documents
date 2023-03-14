/**
 
给你两个非负整数数组 rowSum 和 colSum ，其中 rowSum[i] 是二维矩阵中第 i 行元素的和， colSum[j] 是第 j 列元素的和。换言之你不知道矩阵里的每个元素，但是你知道每一行和每一列的和。

请找到大小为 rowSum.length x colSum.length 的任意 非负整数 矩阵，且该矩阵满足 rowSum 和 colSum 的要求。

请你返回任意一个满足题目要求的二维矩阵，题目保证存在 至少一个 可行矩阵。

输入：rowSum = [3,8], colSum = [4,7]
输出：[[3,0],
      [1,7]]
解释：
第 0 行：3 + 0 = 3 == rowSum[0]
第 1 行：1 + 7 = 8 == rowSum[1]
第 0 列：3 + 1 = 4 == colSum[0]
第 1 列：0 + 7 = 7 == colSum[1]
行和列的和都满足题目要求，且所有矩阵元素都是非负的。
另一个可行的矩阵为：[[1,2],
                  [3,5]]

输入：rowSum = [5,7,10], colSum = [8,6,8]
输出：[[0,5,0],
      [6,1,0],
      [2,0,8]]

输入：rowSum = [14,9], colSum = [6,9,8]
输出：[[0,9,5],
      [6,0,3]]

输入：rowSum = [1,0], colSum = [1]
输出：[[1],
      [0]]

输入：rowSum = [0], colSum = [0]
输出：[[0]]

1 <= rowSum.length, colSum.length <= 500
0 <= rowSum[i], colSum[i] <= 10^8
sum(rowSum) == sum(colSum)

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/find-valid-matrix-given-row-and-column-sums
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 */

namespace ArrayType {
  export function restoreMatrix(
    rowSum: number[],
    colSum: number[]
  ): number[][] {
    const n = rowSum.length,
      m = colSum.length;
    const matrix = new Array(n).fill(0).map(() => new Array(m).fill(0));
    let i = 0,
      j = 0;
    while (i < n && j < m) {
      const v = Math.min(rowSum[i], colSum[j]);
      matrix[i][j] = v;
      rowSum[i] -= v;
      colSum[j] -= v;
      if (rowSum[i] === 0) {
        ++i;
      }
      if (colSum[j] === 0) {
        ++j;
      }
    }
    return matrix;
  }
}

(() => {
  const input = [3, 8];
  const input2 = [4, 7];

  console.log("input1:", input.toString());
  console.log("input2:", input2.toString());

  const result = ArrayType.restoreMatrix(input, input2);

  console.log("result:", result.toString());
})();
