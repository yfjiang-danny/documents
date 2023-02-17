/**
 
给你一个由若干 0 和 1 组成的二维网格 grid，请你找出边界全部由 1 组成的最大 正方形 子网格，并返回该子网格中的元素数量。如果不存在，则返回 0。

输入：grid = [[1,1,1],[1,0,1],[1,1,1]]
输出：9


输入：grid = [[1,1,0,0]]
输出：1


1 <= grid.length <= 100
1 <= grid[0].length <= 100
grid[i][j] 为 0 或 1
 */
function isSquare(row, column, n, arr) {
    if (n <= 0 || row + n >= arr.length || column + n >= arr[row].length)
        return false;
    for (var j = 1; j <= n; j++) {
        if (arr[row][column + j] != 1 ||
            arr[row + n][column + j] != 1 ||
            arr[row + j][column] != 1 ||
            arr[row + j][column + n] != 1) {
            return false;
        }
    }
    return true;
}
function largest1BorderedSquare(grid) {
    var res = 0;
    var min = 0;
    var row = grid.length, column = grid[0].length;
    var i = 0;
    while (i < row - res) {
        var j = 0;
        while (j < column - res) {
            if (grid[i][j] == 1) {
                min = 1;
                var maxN = Math.max(row - i, column - j);
                for (var n = maxN; n > 0; n--) {
                    if (isSquare(i, j, n, grid)) {
                        res = Math.max(res, n);
                        break;
                    }
                }
            }
            j++;
        }
        i++;
    }
    return min > 0 ? Math.pow(res + 1, 2) : min;
}
var input = [[1, 1, 0, 0]];
console.log("input:", input.toString());
var result = largest1BorderedSquare(input);
console.log("result:", result.toString());
