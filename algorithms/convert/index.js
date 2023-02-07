/*
6. N 字形变换

将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：

P   A   H   N
A P L S I I G
Y   I   R

之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);


实例：

输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"

输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I

输入：s = "A", numRows = 1
输出："A"

*/
/**
 * n * n 的矩形
 * @param s
 * @param numRows
 * @returns
 */
function convert(s, numRows) {
    var resStr = "";
    var len = s.length;
    if (len <= numRows) {
        return s;
    }
    var size = numRows * 2 - 2;
    var count = Math.floor(len / size);
    var remainder = len % size;
    var arr = [];
    var k = 0;
    for (var i = 0; i <= count + remainder; i++) {
        for (var j = 0; j <= numRows; j++) {
            if (j % (numRows - 1) == 0) {
                arr[j][i] = s[k];
                k++;
                continue;
            }
            if ((j + i) % (numRows - 1) == 0) {
                arr[j][i] = s[k];
                k++;
                continue;
            }
            arr[j][i] = null;
        }
    }
    for (var i = 0; i <= numRows; i++) {
        for (var j = 0; j <= count + remainder; j++) {
            if (typeof arr[i][j] == "string") {
                resStr += arr[i][j];
            }
        }
    }
    return resStr;
}
var input1 = "PAYPALISHIRING";
var input2 = 3;
console.log("input1:", input1.toString());
console.log("input2:", input2.toString());
var result = convert(input1, input2);
console.log("result:", result.toString());
