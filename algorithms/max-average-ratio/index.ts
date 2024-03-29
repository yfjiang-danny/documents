/**

一所学校里有一些班级，每个班级里有一些学生，现在每个班都会进行一场期末考试。给你一个二维数组 classes ，其中 classes[i] = [passi, totali] ，表示你提前知道了第 i 个班级总共有 totali 个学生，其中只有 passi 个学生可以通过考试。

给你一个整数 extraStudents ，表示额外有 extraStudents 个聪明的学生，他们 一定 能通过任何班级的期末考。你需要给这 extraStudents 个学生每人都安排一个班级，使得 所有 班级的 平均 通过率 最大 。

一个班级的 通过率 等于这个班级通过考试的学生人数除以这个班级的总人数。平均通过率 是所有班级的通过率之和除以班级数目。

请你返回在安排这 extraStudents 个学生去对应班级后的 最大 平均通过率。与标准答案误差范围在 10-5 以内的结果都会视为正确结果。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/maximum-average-pass-ratio
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

输入：classes = [[1,2],[3,5],[2,2]], extraStudents = 2
输出：0.78333
解释：你可以将额外的两个学生都安排到第一个班级，平均通过率为 (3/4 + 3/5 + 2/2) / 3 = 0.78333 。


输入：classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4
输出：0.53485

1 <= classes.length <= 10^5
classes[i].length == 2
1 <= passi <= totali <= 10^5
1 <= extraStudents <= 10^5


 */

/**
 * 贪心，循环次数太多，会超时
 * @param classes
 * @param extraStudents
 */
function answerA(classes: number[][], extraStudents: number): number {
  let res = 0;

  while (extraStudents > 0) {
    let index = 0;
    let maxAmplitude = getAmplitude(classes[0][0], classes[0][1], 1);
    for (let i = 1; i < classes.length; i++) {
      const element = classes[i];
      const amplitude = getAmplitude(element[0], element[1], 1);
      if (amplitude > maxAmplitude) {
        maxAmplitude = amplitude;
        index = i;
        continue;
      }
    }
    const temp = classes[index];
    classes[index] = [temp[0] + 1, temp[1] + 1];
    extraStudents--;
  }

  for (let i = 0; i < classes.length; i++) {
    const element = classes[i];
    res += element[0] / element[1];
  }

  return res / classes.length;
}

/**
 * 获取最大振幅
 * @param params
 */
function getAmplitude(pass: number, total: number, extra: number): number {
  return ((total - pass) * extra) / (total * (total + extra));
}

function insertionSort(arr: number[][]) {
  var len = arr.length;
  var preIndex, current;
  for (var i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (
      preIndex >= 0 &&
      getAmplitude(arr[preIndex][0], arr[preIndex][1], 1) >
        getAmplitude(current[0], current[1], 1)
    ) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

function maxAverageRatio(classes: number[][], extraStudents: number): number {
  let arr = classes;
  let n = extraStudents;
  let res = 0;

  while (n > 0) {
    insertionSort(arr);
    const temp = arr[0];
    arr[0] = [temp[0] + 1, temp[1] + 1];
    n--;
  }

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    res += element[0] / element[1];
  }

  return res / arr.length;
}

const input1 = [
  [2, 4],
  [3, 9],
  [4, 5],
  [2, 10],
];
const input2 = 4;

console.log("input1:", input1.toString());
console.log("input2:", input2.toString());

const result = answerA(input1, input2);

console.log("result:", result.toString());
