/// <reference path="../../test.ts" />

/**
 * 1625. 执行操作后字典序最小的字符串
 
 给你一个字符串 s 以及两个整数 a 和 b 。其中，字符串 s 的长度为偶数，且仅由数字 0 到 9 组成。

你可以在 s 上按任意顺序多次执行下面两个操作之一：

累加：将  a 加到 s 中所有下标为奇数的元素上（下标从 0 开始）。数字一旦超过 9 就会变成 0，如此循环往复。例如，s = "3456" 且 a = 5，则执行此操作后 s 变成 "3951"。
轮转：将 s 向右轮转 b 位。例如，s = "3456" 且 b = 1，则执行此操作后 s 变成 "6345"。
请你返回在 s 上执行上述操作任意次后可以得到的 字典序最小 的字符串。

如果两个字符串长度相同，那么字符串 a 字典序比字符串 b 小可以这样定义：在 a 和 b 出现不同的第一个位置上，字符串 a 中的字符出现在字母表中的时间早于 b 中的对应字符。例如，"0158” 字典序比 "0190" 小，因为不同的第一个位置是在第三个字符，显然 '5' 出现在 '9' 之前。

输入：s = "5525", a = 9, b = 2
输出："2050"
解释：执行操作如下：
初态："5525"
轮转："2555"
累加："2454"
累加："2353"
轮转："5323"
累加："5222"
累加："5121"
轮转："2151"
累加："2050"​​​​​​​​​​​​
无法获得字典序小于 "2050" 的字符串。

输入：s = "74", a = 5, b = 1
输出："24"
解释：执行操作如下：
初态："74"
轮转："47"
累加："42"
轮转："24"​​​​​​​​​​​​
无法获得字典序小于 "24" 的字符串。

输入：s = "0011", a = 4, b = 2
输出："0011"
解释：无法获得字典序小于 "0011" 的字符串。

输入：s = "43987654", a = 7, b = 3
输出："00553311"

2 <= s.length <= 100
s.length 是偶数
s 仅由数字 0 到 9 组成
1 <= a <= 9
1 <= b <= s.length - 1

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/lexicographically-smallest-string-after-applying-operations
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 
 */
namespace Medium {
  function calc(str: string, a: number): string {
    const arr: number[] = [];
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      let num = parseInt(char);
      if (i % 2 == 1) {
        num = (num + a) % 10;
      }
      arr.push(num);
    }
    return arr.join("");
  }

  export function move(str: string, b: number) {
    if (str.length <= b) {
      return str;
    }
    const str1 = str.substring(0, str.length - b);
    const str2 = str.substring(str.length - b, str.length);
    return str2 + str1;
  }

  // 枚举法：超时
  export function findLexSmallestString(
    s: string,
    a: number,
    b: number
  ): string {
    const n = s.length,
      map = new Map<string, boolean>();

    const list: string[] = [s];
    while (list.length > 0) {
      // console.log(list);

      //
      const str = list.shift() as string;
      if (!map.has(str)) {
        map.set(str, true);
      }

      //
      let tempStr = str;
      while (true) {
        const calcStr = calc(tempStr, a);
        if (map.has(calcStr)) {
          break;
        } else {
          list.push(calcStr);
          tempStr = calcStr;
        }
      }

      //
      const moveStr = move(str, b);
      if (!map.has(moveStr)) {
        list.push(moveStr);
      }
    }

    const entries: string[] = [];
    map.forEach((_, key) => {
      entries.push(key);
    });

    entries.sort((a, b) => {
      return a > b ? 1 : -1;
    });

    // console.log(entries);

    return entries[0];
  }

  function getMinCalcNum(num: number, a: number): number {
    const map = new Map<number, number>();
    let min = num,
      count = 0;
    while (!map.has(num)) {
      map.set(num, count);
      if (num == 0) {
        break;
      }
      num = (num + a) % 10;
      count++;
      min = Math.min(min, num);
    }

    return map.get(min) || 0;
  }

  // 获取最大公约数
  function getMaxCommonDivisor(num1: number, num2: number): number {
    let max = Math.max(num1, num2);
    let min = Math.min(num1, num2);
    let a = max % min;
    if (a == 0) {
      return min;
    }
    max = min;
    min = a;
    while (min != 0) {
      a = max % min;
      max = min;
      min = a;
    }
    return max;
  }

  /**
   * 枚举优化，
   * @param s
   * @param a
   * @param b
   * @returns
   */
  export function answer1(s: string, a: number, b: number): string {
    let res = s;

    const isEven = (s.length + b) % 2 == 0;
    const moveOffset = getMaxCommonDivisor(s.length, b);

    for (let i = 0; i < s.length; i += moveOffset) {
      const na = isEven ? 0 : getMinCalcNum(parseInt(s[i]), a);
      const nb = getMinCalcNum(parseInt(s[(i + 1) % s.length]), a);

      let str = "";
      for (let j = i; j < s.length + i; j++) {
        const element = s[j % s.length];
        if ((j - i) % 2 == 0) {
          str += (parseInt(element) + na * a) % 10;
        } else {
          str += (parseInt(element) + nb * a) % 10;
        }
      }

      if (res > str) {
        res = str;
      }
    }

    return res;
  }

  export function answer2(s: string, a: number, b: number): string {
    const n = s.length;
    const vis = new Array(n).fill(false);
    let res = s;
    // 将 s 延长一倍，方便截取轮转后的字符串 t
    s = s + s;
    for (let i = 0; !vis[i]; i = (i + b) % n) {
      vis[i] = true;
      for (let j = 0; j < 10; j++) {
        let kLimit = b % 2 === 0 ? 0 : 9;
        for (let k = 0; k <= kLimit; k++) {
          // 每次进行累加之前，重新截取 t
          const t = [...s.slice(i, i + n)];
          for (let p = 1; p < n; p += 2) {
            t[p] = String.fromCharCode(
              "0".charCodeAt(0) +
                ((t[p].charCodeAt(0) - "0".charCodeAt(0) + j * a) % 10)
            );
          }
          for (let p = 0; p < n; p += 2) {
            t[p] = String.fromCharCode(
              "0".charCodeAt(0) +
                ((t[p].charCodeAt(0) - "0".charCodeAt(0) + k * a) % 10)
            );
          }
          const tStr = t.join("");
          if (tStr < res) {
            res = tStr;
          }
        }
      }
    }
    return res;
  }
}

// tsc -t esnext --outFile algorithms/test.js algorithms/test.ts algorithms/medium/find-lex-smallest-string/index.ts && node algorithms/test.js
(() => {
  UnitTest.test(Medium.findLexSmallestString, "5525", 9, 2, "2050");
  UnitTest.test(Medium.findLexSmallestString, "74", 5, 1, "24");
  UnitTest.test(Medium.findLexSmallestString, "0011", 4, 2, "0011");
  UnitTest.test(Medium.findLexSmallestString, "43987654", 7, 3, "00553311");
  UnitTest.test(
    Medium.findLexSmallestString,
    "1830393069345171789354915923",
    1,
    23,
    "0000722832088524769686998638"
  );
  UnitTest.test(
    Medium.findLexSmallestString,
    "593290172167",
    7,
    4,
    "206658319916"
  );
  UnitTest.test(
    Medium.findLexSmallestString,
    "87144140372271458627",
    4,
    8,
    "31267549802181184544"
  );
})();
