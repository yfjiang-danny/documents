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

/**
 * answer
 */

function answer(s: string): number {
  // 哈希集合，记录每个字符是否出现过
  const occ = new Set();
  const n = s.length;
  // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
  let rk = -1,
    ans = 0;
  for (let i = 0; i < n; ++i) {
    if (i != 0) {
      // 左指针向右移动一格，移除一个字符
      occ.delete(s.charAt(i - 1));
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
function optimization(s: string): number {
  let max = 0,
    left = 0,
    right = 0;

  const len = s.length,
    mp = new Map<string, number>();

  while (left < len && len - left > max) {
    const char = s[right];
    if (mp.has(char)) {
      // 重复
      max = Math.max(max, right - left);
      left = mp.get(char) + 1;
      right = left;
      mp.clear();
      continue;
    }
    // 不重复
    mp.set(char, right);
    right++;
    max = Math.max(max, right - left);
  }

  return max;
}

const input = "pwwakw"; // pwwakw
console.log("input:", input);
console.log("result:", optimization(input));
