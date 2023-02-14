/**

给你一份工作时间表 hours，上面记录着某一位员工每天的工作小时数。

我们认为当员工一天中的工作小时数大于 8 小时的时候，那么这一天就是「劳累的一天」。

所谓「表现良好的时间段」，意味在这段时间内，「劳累的天数」是严格 大于「不劳累的天数」。

请你返回「表现良好时间段」的最大长度。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/longest-well-performing-interval
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


输入：hours = [9,9,6,0,6,6,9]
输出：3
解释：最长的表现良好时间段是 [9,9,6]。

输入：hours = [6,6,6]
输出：0

 */

function longestWPI(hours: number[]): number {
  const len = hours.length;
  let res = 0;

  let good = 0;
  let bad = 0;

  let i = 0;

  while (i < len) {
    let j = i;
    let flag = hours[i] > 8 ? true : false;
    while (j < len) {
      if (flag) {
        good++;
      } else {
        bad++;
      }
      if (j < len - 1) {
        const nextFlag = hours[j + 1] > 8 ? true : false;
        if (nextFlag != flag) {
          // 切换

          break;
        }
      }
      j++;
    }
    i = j + 1;
  }

  return res;
}

const input = [9, 9, 6, 0, 6, 6, 9];

console.log("input:", input.toString());

const result = longestWPI(input);

console.log("result:", result.toString());
