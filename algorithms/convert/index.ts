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

  // 只有一行
  if (len <= numRows || numRows <= 1) {
    return s;
  }

  // n 个完整 z 字的字符串长度
  function getNZLen(n: number): number {
    return (3 * numRows - 2) * n - numRows * (n - 1);
  }

  const count = Math.ceil((len - numRows) / (2 * (numRows - 1)));
  const rd = (len - numRows) % (2 * (numRows - 1));
  const columns =
    rd == 0
      ? numRows * count - (count - 1)
      : Math.min(
          numRows * (count - 1) - (count - 1 - 1) + rd + 1,
          numRows * count - (count - 1)
        );

  for (let i = 1; i <= numRows; i++) {
    let offset = numRows - i;

    let j = 1;
    while (j <= columns) {
      const curCount = Math.ceil((j - 1) / (numRows - 1));
      const remainder = (j - 1) % (numRows - 1);

      if (remainder == 0) {
        // 竖
        const index = getNZLen(curCount) - (numRows - i) - 1;
        if (typeof s[index] != "undefined") {
          resStr += s[index];
        } else {
          break;
        }
      } else {
        // 对角线
        const index = getNZLen(curCount - 1) + (numRows - i) - 1;
        if (typeof s[index] != "undefined") {
          resStr += s[index];
        } else {
          break;
        }
      }
      if (i != 1 && i != numRows) {
        j += offset;
        const temp = offset;
        offset = numRows - 1 - temp;
      } else {
        offset = numRows - 1;
        j += offset;
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
