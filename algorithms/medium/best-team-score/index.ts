/// <reference path="../../test.ts" />

/**
 * 1626. 无矛盾的最佳球队
 

假设你是球队的经理。对于即将到来的锦标赛，你想组合一支总体得分最高的球队。球队的得分是球队中所有球员的分数 总和 。

然而，球队中的矛盾会限制球员的发挥，所以必须选出一支 没有矛盾 的球队。如果一名年龄较小球员的分数 严格大于 一名年龄较大的球员，则存在矛盾。同龄球员之间不会发生矛盾。

给你两个列表 scores 和 ages，其中每组 scores[i] 和 ages[i] 表示第 i 名球员的分数和年龄。请你返回 所有可能的无矛盾球队中得分最高那支的分数 。

输入：scores = [1,3,5,10,15], ages = [1,2,3,4,5]
输出：34
解释：你可以选中所有球员。

输入：scores = [4,5,6,5], ages = [2,1,2,1]
输出：16
解释：最佳的选择是后 3 名球员。注意，你可以选中多个同龄球员。

输入：scores = [1,2,3,5], ages = [8,9,10,1]
输出：6
解释：最佳的选择是前 3 名球员。

1 <= scores.length, ages.length <= 1000
scores.length == ages.length
1 <= scores[i] <= 10^6
1 <= ages[i] <= 1000

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/best-team-with-no-conflicts
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 */

namespace Medium {
  export function bestTeamScore(scores: number[], ages: number[]): number {
    const n = scores.length;
    const people = new Array(n).fill(0).map(() => new Array(2).fill(0));
    for (let i = 0; i < n; ++i) {
      people[i] = [scores[i], ages[i]];
    }
    people.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
    const dp = new Array(n).fill(0);
    let res = 0;
    for (let i = 0; i < n; ++i) {
      for (let j = i - 1; j >= 0; --j) {
        if (people[j][1] <= people[i][1]) {
          dp[i] = Math.max(dp[i], dp[j]);
        }
      }
      dp[i] += people[i][0];
      res = Math.max(res, dp[i]);
    }
    return res;
  }
}

// tsc -t esnext --outFile algorithms/test.js algorithms/test.ts algorithms/medium/find-lex-smallest-string/index.ts && node algorithms/test.js
(() => {
  UnitTest.test(Medium.bestTeamScore, [1, 3, 5, 10, 15], [1, 2, 3, 4, 5], 34);
  UnitTest.test(Medium.bestTeamScore, [4, 5, 6, 5], [2, 1, 2, 1], 16);
  UnitTest.test(Medium.bestTeamScore, [1, 2, 3, 5], [8, 9, 10, 1], 6);
})();
