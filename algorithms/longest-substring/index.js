/**
 * 窗口移动的方式计算
 * @param s
 * @returns
 */
function lengthOfLongestSubstring(s) {
    var maxLen = 0;
    var charMap = {};
    var start = 0, curIndex = 0;
    while (curIndex < s.length && s.length - start > maxLen) {
        var char = s[curIndex];
        if (typeof charMap[char] == "undefined") {
            // 不存在相同的
            charMap[char] = curIndex;
            curIndex++;
            continue;
        }
        // 存在相同的，第 curIndex 个元素和第 charMap[char] 个元素相同
        var curLen = curIndex - start;
        if (maxLen < curLen) {
            maxLen = curLen;
        }
        start = charMap[char] + 1;
        charMap = {};
        for (var j = start; j <= curIndex; j++) {
            var element = s[j];
            charMap[element] = j;
        }
        curIndex++;
    }
    if (curIndex == s.length) {
        var curLen = curIndex - start;
        if (curLen > maxLen) {
            maxLen = curLen;
        }
    }
    return maxLen;
}
var input = "pwwkew";
console.log("input:", input);
console.log("result:", lengthOfLongestSubstring(input));
