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

function convert(s: string, numRows: number): string {
  let resStr: string = "";

  const len = s.length;

  if (len <= numRows) {
    return s;
  }

  const size = numRows * 2 - 2;

  const count = Math.floor(len / size);
  const remainder = len % size;

  const arr: string[][] = [];
  let k = 0;

  for (let i = 0; i <= count + remainder; i++) {
    for (let j = 0; j <= numRows; j++) {
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

  for (let i = 0; i <= numRows; i++) {
    for (let j = 0; j <= count + remainder; j++) {
      if (typeof arr[i][j] == "string") {
        resStr += arr[i][j];
      }
    }
  }

  return resStr;
}

const input1 = "PAYPALISHIRING";
const input2 = 3;

console.log("input1:", input1.toString());
console.log("input2:", input2.toString());

const result = convert(input1, input2);

console.log("result:", result.toString());
