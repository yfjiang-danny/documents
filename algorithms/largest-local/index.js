/**
 
给你一个大小为 n x n 的整数矩阵 grid 。

生成一个大小为 (n - 2) x (n - 2) 的整数矩阵  maxLocal ，并满足：

maxLocal[i][j] 等于 grid 中以 i + 1 行和 j + 1 列为中心的 3 x 3 矩阵中的 最大值 。
换句话说，我们希望找出 grid 中每个 3 x 3 矩阵中的最大值。

返回生成的矩阵。

输入：grid = [[9,9,8,1],[5,6,2,6],[8,2,6,4],[6,2,2,2]]
输出：[[9,9],[8,6]]
解释：原矩阵和生成的矩阵如上图所示。
注意，生成的矩阵中，每个值都对应 grid 中一个相接的 3 x 3 矩阵的最大值。

输入：grid = [[1,1,1,1,1],[1,1,1,1,1],[1,1,2,1,1],[1,1,1,1,1],[1,1,1,1,1]]
输出：[[2,2,2],[2,2,2],[2,2,2]]
解释：注意，2 包含在 grid 中每个 3 x 3 的矩阵中。

n == grid.length == grid[i].length
3 <= n <= 100
1 <= grid[i][j] <= 100

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/largest-local-values-in-a-matrix
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 */
function largestLocal(grid) {
    const len = grid.length;
    const n = len - 2;
    if (n <= 0) {
        return [];
    }
    let res = new Array(n)
        .fill(Number.MIN_VALUE)
        .map((v) => new Array(n).fill(Number.MIN_VALUE));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let max = grid[i + 1][j + 1];
            for (let k = i; k < i + 3; k++) {
                for (let h = j; h < j + 3; h++) {
                    if (k < 0 || k >= len || h < 0 || h >= len) {
                        continue;
                    }
                    max = Math.max(max, grid[k][h]);
                }
            }
            res[i][j] = max;
        }
    }
    return res;
}
(function test() {
    const input = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 2, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
    ];
    console.log("input:", input.toString());
    const result = largestLocal(input);
    console.log("result:", result.toString());
})();
