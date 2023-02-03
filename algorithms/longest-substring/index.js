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
/**
 * answer
 */
function answer(s) {
    // 哈希集合，记录每个字符是否出现过
    var occ = new Set();
    var n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    var rk = -1, ans = 0;
    for (var i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ["delete"](s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
}
/**
 * optimization
 */
function optimization(s) {
    var max = 0, left = 0, right = 0;
    var len = s.length, mp = new Map();
    while (left < len && len - left > max) {
        mp.clear();
        while (right < len) {
            var char = s[right];
            if (mp.has(char)) {
                // 重复
                max = Math.max(max, right - left);
                left = mp.get(char) + 1;
                right = left;
                break;
            }
            // 不重复
            mp.set(char, right);
            right++;
        }
        max = Math.max(max, right - left);
    }
    return max;
}
var input = "pwwakw"; // pwwakw
console.log("input:", input);
console.log("result:", optimization(input));
