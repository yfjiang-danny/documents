/**
 
给你一个长度为 n 下标从 0 开始的字符串 blocks ，blocks[i] 要么是 'W' 要么是 'B' ，表示第 i 块的颜色。字符 'W' 和 'B' 分别表示白色和黑色。

给你一个整数 k ，表示想要 连续 黑色块的数目。

每一次操作中，你可以选择一个白色块将它 涂成 黑色块。

请你返回至少出现 一次 连续 k 个黑色块的 最少 操作次数。

输入：blocks = "WBBWWBBWBW", k = 7
输出：3
解释：
一种得到 7 个连续黑色块的方法是把第 0 ，3 和 4 个块涂成黑色。
得到 blocks = "BBBBBBBWBW" 。
可以证明无法用少于 3 次操作得到 7 个连续的黑块。
所以我们返回 3 。

输入：blocks = "WBWBBBW", k = 2
输出：0
解释：
不需要任何操作，因为已经有 2 个连续的黑块。
所以我们返回 0 。

n == blocks.length
1 <= n <= 100
blocks[i] 要么是 'W' ，要么是 'B' 。
1 <= k <= n

https://leetcode.cn/problems/minimum-recolors-to-get-k-consecutive-black-blocks/

 */

namespace MinimumRecolors {
  export function minimumRecolors(blocks: string, k: number): number {
    let bLen = 0;

    // 可改为 while 循环，在下面的循环里也可以再次使用
    for (let i = 0; i < k; i++) {
      if (blocks[i] == "B") {
        bLen++;
      }
    }

    if (bLen == k) {
      return 0;
    }

    let maxLen = bLen;

    for (let i = k; i < blocks.length; i++) {
      if (blocks[i - k] == "B") {
        bLen--;
      }
      if (blocks[i] == "B") {
        bLen++;
      }
      if (bLen == k) {
        return 0;
      }
      maxLen = Math.max(bLen, maxLen);
    }

    return k - maxLen;
  }
}

(() => {
  const input = "WBBWWBBWBW";
  const input2 = 11;

  console.log("input1:", input.toString());
  console.log("input2:", input2.toString());

  const result = MinimumRecolors.minimumRecolors(input, input2);

  console.log("result:", result.toString());
})();
