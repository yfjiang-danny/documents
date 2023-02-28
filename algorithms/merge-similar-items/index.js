/**

给你两个二维整数数组 items1 和 items2 ，表示两个物品集合。每个数组 items 有以下特质：

items[i] = [valuei, weighti] 其中 valuei 表示第 i 件物品的 价值 ，weighti 表示第 i 件物品的 重量 。
items 中每件物品的价值都是 唯一的 。
请你返回一个二维数组 ret，其中 ret[i] = [valuei, weighti]， weighti 是所有价值为 valuei 物品的 重量之和 。

注意：ret 应该按价值 升序 排序后返回。

输入：items1 = [[1,1],[4,5],[3,8]], items2 = [[3,1],[1,5]]
输出：[[1,6],[3,9],[4,5]]
解释：
value = 1 的物品在 items1 中 weight = 1 ，在 items2 中 weight = 5 ，总重量为 1 + 5 = 6 。
value = 3 的物品再 items1 中 weight = 8 ，在 items2 中 weight = 1 ，总重量为 8 + 1 = 9 。
value = 4 的物品在 items1 中 weight = 5 ，总重量为 5 。
所以，我们返回 [[1,6],[3,9],[4,5]] 。

输入：items1 = [[1,1],[3,2],[2,3]], items2 = [[2,1],[3,2],[1,3]]
输出：[[1,4],[2,4],[3,4]]

输入：items1 = [[1,3],[2,2]], items2 = [[7,1],[2,2],[1,4]]
输出：[[1,7],[2,4],[7,1]]

1 <= items1.length, items2.length <= 1000
items1[i].length == items2[i].length == 2
1 <= valuei, weighti <= 1000
items1 中每个 valuei 都是 唯一的 。
items2 中每个 valuei 都是 唯一的 。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/merge-similar-items
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




 */
function mergeSimilarItems(items1, items2) {
    for (var i = 0; i < items1.length; i++) {
        var element = items1[i];
        var k = 0;
        while (k < items2.length) {
            if (items2[k][0] == element[0]) {
                element[1] += items2[k][1];
                items2.splice(k, 1);
                break;
            }
            k++;
        }
    }
    return items1.sort(function (a, b) {
        return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
    });
}
var input1 = [
    [1, 1],
    [4, 5],
    [3, 8],
];
var input2 = [
    [3, 1],
    [1, 5],
];
console.log("input1:", input1);
console.log("input2:", input2);
console.log("result:", mergeSimilarItems(input1, input2));
