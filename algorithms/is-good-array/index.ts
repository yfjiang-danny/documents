/**

给你一个正整数数组 nums，你需要从中任选一些子集，然后将子集中每一个数乘以一个 任意整数，并求出他们的和。

假如该和结果为 1，那么原数组就是一个「好数组」，则返回 True；否则请返回 False。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/check-if-it-is-a-good-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

输入：nums = [12,5,7,23]
输出：true
解释：挑选数字 5 和 7。
5*3 + 7*(-2) = 1

输入：nums = [29,6,10]
输出：true
解释：挑选数字 29, 6 和 10。
29*1 + 6*(-3) + 10*(-1) = 1

输入：nums = [3,6]
输出：false

 */

/**
 * Answer：求最大公约数是 1，只要有一组满足就是 true
 * @param num1
 * @param num2
 * @returns
 */
function gcd(num1: number, num2: number): number {
  while (num2 !== 0) {
    const temp = num1;
    num1 = num2;
    num2 = temp % num2;
  }
  return num1;
}

function isGoodArray(nums: number[]): boolean {
  let divisor = nums[0];
  for (const num of nums) {
    divisor = gcd(divisor, num);
    if (divisor === 1) {
      break;
    }
  }
  return divisor === 1;
}

const input = [3, 6];

console.log("input:", input.toString());

const result = isGoodArray(input);

console.log("result:", result.toString());
