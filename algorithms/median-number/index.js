function findMedianSortedArrays(nums1, nums2) {
    var res = 0;
    var len1 = nums1.length, len2 = nums2.length;
    var remainder = (len1 + len2) % 2;
    var index = -1, index1 = -1;
    if (remainder == 1) {
        index = Math.floor((len1 + len2) / 2);
    }
    else {
        index1 = (len1 + len2) / 2;
        index = index1 - 1;
    }
    if (len1 == 0 || len2 == 0) {
        if (remainder == 1) {
            return !!len1 ? nums1[index] : nums2[index];
        }
        else {
            return !!len1
                ? (nums1[index] + nums1[index1]) / 2
                : (nums2[index] + nums2[index1]) / 2;
        }
    }
    var i1 = 0, i2 = 0;
    if (remainder == 1) {
        while (i1 + i2 <= index) {
            if (i1 >= len1) {
                res = nums2[i2];
                i2++;
                continue;
            }
            if (i2 >= len2) {
                res = nums1[i1];
                i1++;
                continue;
            }
            if (nums1[i1] < nums2[i2]) {
                res = nums1[i1];
                i1++;
                continue;
            }
            else {
                res = nums2[i2];
                i2++;
                continue;
            }
        }
        return res;
    }
    else {
        var res1 = 0;
        while (i1 + i2 <= index1) {
            if (i1 + i2 == index1) {
                res1 = res;
            }
            if (i1 >= len1) {
                res = nums2[i2];
                i2++;
                continue;
            }
            if (i2 >= len2) {
                res = nums1[i1];
                i1++;
                continue;
            }
            if (nums1[i1] < nums2[i2]) {
                res = nums1[i1];
                i1++;
                continue;
            }
            else {
                res = nums2[i2];
                i2++;
                continue;
            }
        }
        return (res + res1) / 2;
    }
}
var input = [1, 2];
var input1 = [3, 4];
console.log("input:", input);
console.log("result:", findMedianSortedArrays(input, input1));
