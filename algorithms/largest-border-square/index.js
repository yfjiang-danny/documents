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
/**
 * 判断 [row, column] 长度为 n 的情况是否满足
 * @param row
 * @param column
 * @param n
 * @param arr
 * @returns
 */
function isSquare(row, column, n, arr) {
    if (n == 0)
        return true;
    if (row + n >= arr.length || column + n >= arr[row].length)
        return false;
    for (var j = 0; j <= n; j++) {
        if (arr[row][column + j] != 1 ||
            arr[row + n][column + j] != 1 ||
            arr[row + j][column] != 1 ||
            arr[row + j][column + n] != 1) {
            return false;
        }
    }
    return true;
}
/**
 * 获取以 [row,column] 为左上顶点时最大的可能性长度
 * @param arr
 * @param row
 * @param column
 */
function getMaxN(arr, row, column) {
    var n = 0;
    while (row + n < arr.length && column + n < arr[row].length) {
        if (arr[row][column + n] != 1 || arr[row + n][column] != 1) {
            break;
        }
        n++;
    }
    return n;
}
function largest1BorderedSquare(grid) {
    var res = 0;
    var row = grid.length, column = grid[0].length;
    var i = 0;
    while (i < row - res) {
        var j = 0;
        while (j < column - res) {
            if (grid[i][j] == 1) {
                var maxN = getMaxN(grid, i, j);
                for (var n = maxN; n >= 0; n--) {
                    if (isSquare(i, j, n, grid)) {
                        res = Math.max(res, n + 1);
                        break;
                    }
                }
            }
            j++;
        }
        i++;
    }
    return Math.pow(res, 2);
}
var input = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
];
console.log("input:", input.toString());
var result = largest1BorderedSquare(input);
console.log("result:", result.toString());
