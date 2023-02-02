/**
 * 窗口移动的方式计算
 * @param s
 * @returns
 */

function lengthOfLongestSubstring(s: string): number {
  let maxLen = 0;

  let charMap = {};

  let start = 0,
    curIndex = 0;
  while (curIndex < s.length && s.length - start > maxLen) {
    const char = s[curIndex];
    if (typeof charMap[char] == "undefined") {
      // 不存在相同的
      charMap[char] = curIndex;
      curIndex++;
      continue;
    }

    // 存在相同的，第 curIndex 个元素和第 charMap[char] 个元素相同
    const curLen = curIndex - start;
    if (maxLen < curLen) {
      maxLen = curLen;
    }
    start = charMap[char] + 1;
    charMap = {};
    for (let j = start; j <= curIndex; j++) {
      const element = s[j];
      charMap[element] = j;
    }
    curIndex++;
  }

  if (curIndex == s.length) {
    const curLen = curIndex - start;
    if (curLen > maxLen) {
      maxLen = curLen;
    }
  }

  return maxLen;
}

const input = "pwwkew";
console.log("input:", input);
console.log("result:", lengthOfLongestSubstring(input));
