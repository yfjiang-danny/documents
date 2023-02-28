var Sorts;
(function (Sorts) {
    /**
     * 快速排序的最坏运行情况是 O(n²)，比如说顺序数列的快排。
     * 但它的平摊期望时间是 O(nlogn)，且 O(nlogn) 记号中隐含的常数因子很小，比复杂度稳定等于 O(nlogn) 的归并排序要小很多。
     * 所以，对绝大多数顺序性较弱的随机数列而言，快速排序总是优于归并排序。
     * @param arr
     */
    function quickSort(arr, low, high) {
        if (low === void 0) { low = 0; }
        high = high !== null && high !== void 0 ? high : arr.length - 1;
        if (low < high) {
            var pivot = partition(arr, low, high);
            quickSort(arr, low, pivot - 1);
            quickSort(arr, pivot + 1, high);
        }
        return arr;
    }
    Sorts.quickSort = quickSort;
    function swap(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    /**
     * 分区
     * @param arr
     * @param left
     * @param right
     * @returns middle
     */
    function partition(arr, low, high) {
        var pivot = arr[low];
        while (low < high) {
            while (low < high && arr[high] > pivot) {
                --high;
            }
            arr[low] = arr[high];
            while (low < high && arr[low] <= pivot) {
                ++low;
            }
            arr[high] = arr[low];
        }
        arr[low] = pivot;
        return low;
    }
})(Sorts || (Sorts = {}));
/// <reference path="../sorts/index.ts" />
function test() {
    var input = [4, 6, 9, 41, 0];
    console.log("input:", input);
    console.log("result:", Sorts.quickSort(input, 0));
}
test();
