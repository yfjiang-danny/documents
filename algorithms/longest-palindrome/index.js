/*
给你一个字符串 s，找到 s 中最长的回文子串。

如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。

输入：s = "cbbd"
输出："bb"
*/
function longestPalindrome(s) {
    var start = 0, end = 0, len = s.length;
    function calc(str, lIndex, rIndex) {
        var l = lIndex, r = rIndex;
        while (l >= 0 && r < len) {
            if (s[l] != s[r]) {
                break;
            }
            if (end - start < r - l) {
                start = l;
                end = r;
            }
            l--;
            r++;
        }
        return;
    }
    for (var i = 0; i < len; i++) {
        var left = i - 1, right = i + 1;
        if (left < 0) {
            continue;
        }
        if (s[i] == s[left]) {
            if (end - start < i - left) {
                start = left;
                end = i;
            }
            calc(s, left - 1, right);
        }
        if (right >= len) {
            continue;
        }
        calc(s, left, right);
    }
    return s.substring(start, end + 1);
}
var input = "bb"; //"cbbd"; //"babad";
console.log("input:", input.toString());
var result = longestPalindrome(input);
console.log("result:", result.toString());
