/*
有一个骰子模拟器会每次投掷的时候生成一个 1 到 6 的随机数。

不过我们在使用它时有个约束，就是使得投掷骰子时，连续 掷出数字 i 的次数不能超过 rollMax[i]（i 从 1 开始编号）。

现在，给你一个整数数组 rollMax 和一个整数 n，请你来计算掷 n 次骰子可得到的不同点数序列的数量。

假如两个序列中至少存在一个元素不同，就认为这两个序列是不同的。由于答案可能很大，所以请返回 模 10^9 + 7 之后的结果。


输入：n = 2, rollMax = [1,1,2,2,2,3]
输出：34
解释：我们掷 2 次骰子，如果没有约束的话，共有 6 * 6 = 36 种可能的组合。但是根据 rollMax 数组，数字 1 和 2 最多连续出现一次，所以不会出现序列 (1,1) 和 (2,2)。因此，最终答案是 36-2 = 34。

输入：n = 2, rollMax = [1,1,1,1,1,1]
输出：30

输入：n = 3, rollMax = [1,1,1,2,2,3]
输出：181

*/

/**
 * 动态规划思路
 * arr[i][j][k] 代表第 i 次掷色子，掷出 j，并且有 k 个连续 j 的方案
 *
 * 假设第 i - 1 次掷色子状态为 arr[i-1][p][k]
 * a. 当 p == j, 且 k + 1 <= rollMax[j] 时，arr[i][j][k+1] += arr[i-1][j][k]
 * b. 当 p != j 时，arr[i][p][1] += arr[i-1][j][k]
 *
 *
 * @param n
 * @param rollMax
 * @returns
 */
function dieSimulator(n: number, rollMax: number[]): number {
  const MOD = 1000000007;
  let res = 0;

  // Generate arr
  let arr = new Array(n + 1)
    .fill(0)
    .map((v) => new Array(6).fill(0).map((a) => new Array(16).fill(0)));

  // Init
  for (let j = 0; j < 6; j++) {
    arr[1][j][1] = 1;
  }

  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < 6; j++) {
      for (let k = 1; k <= rollMax[j]; k++) {
        for (let p = 0; p < 6; p++) {
          if (p == j) {
            if (k + 1 <= rollMax[j]) {
              arr[i][p][k + 1] = (arr[i][p][k + 1] + arr[i - 1][j][k]) % MOD;
            }
          } else {
            arr[i][p][1] = (arr[i][p][1] + arr[i - 1][j][k]) % MOD;
          }
        }
      }
    }
  }

  for (let j = 0; j < 6; j++) {
    for (let k = 1; k <= rollMax[j]; k++) {
      res = (res + arr[n][j][k]) % MOD;
    }
  }

  return res;
}

const input1 = 2;
const input2 = [1, 1, 2, 2, 2, 3];

console.log("input1:", input1.toString());
console.log("input2:", input2.toString());

const result = dieSimulator(input1, input2);

console.log("result:", result.toString());
