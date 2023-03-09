/**

在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？

输入: 
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 12
解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物

0 < grid.length <= 200
0 < grid[0].length <= 200
 
https://leetcode.cn/problems/li-wu-de-zui-da-jie-zhi-lcof/
 */

namespace MaxValue {
  export function maxValue(grid: number[][]): number {
    const row = grid.length;
    const column = grid[0]?.length || 0;

    // Init values
    const values = new Array(row).fill(0).map((v) => new Array(column).fill(0));

    values[0][0] = grid[0][0];
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        const element = grid[i][j];
        if (i - 1 >= 0) {
          values[i][j] = Math.max(values[i][j], values[i - 1][j] + element);
        }
        if (j - 1 >= 0) {
          values[i][j] = Math.max(values[i][j], values[i][j - 1] + element);
        }
      }
    }

    return values[row - 1][column - 1];
  }

  export function maxValue1(grid: number[][]): number {
    const row = grid.length;
    const column = grid[0]?.length || 0;

    // Init values
    const values = new Array(column).fill(0);

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        const element = grid[i][j];
        const v1 = values[j] + element;
        const v2 = j > 0 ? values[j - 1] + element : element;
        values[j] = Math.max(v1, v2);
      }
    }

    return values[column - 1];
  }
}

(() => {
  const input = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ];

  console.log("input:", input.toString());

  const result = MaxValue.maxValue1(input);

  console.log("result:", result.toString());
})();
