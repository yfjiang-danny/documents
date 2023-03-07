/**
 
如果你熟悉 Shell 编程，那么一定了解过花括号展开，它可以用来生成任意字符串。

花括号展开的表达式可以看作一个由 花括号、逗号 和 小写英文字母 组成的字符串，定义下面几条语法规则：

如果只给出单一的元素 x，那么表达式表示的字符串就只有 "x"。R(x) = {x}
例如，表达式 "a" 表示字符串 "a"。
而表达式 "w" 就表示字符串 "w"。
当两个或多个表达式并列，以逗号分隔，我们取这些表达式中元素的并集。R({e_1,e_2,...}) = R(e_1) ∪ R(e_2) ∪ ...
例如，表达式 "{a,b,c}" 表示字符串 "a","b","c"。
而表达式 "{{a,b},{b,c}}" 也可以表示字符串 "a","b","c"。
要是两个或多个表达式相接，中间没有隔开时，我们从这些表达式中各取一个元素依次连接形成字符串。R(e_1 + e_2) = {a + b for (a, b) in R(e_1) × R(e_2)}
例如，表达式 "{a,b}{c,d}" 表示字符串 "ac","ad","bc","bd"。
表达式之间允许嵌套，单一元素与表达式的连接也是允许的。
例如，表达式 "a{b,c,d}" 表示字符串 "ab","ac","ad"​​​​​​。
例如，表达式 "a{b,c}{d,e}f{g,h}" 可以表示字符串 "abdfg", "abdfh", "abefg", "abefh", "acdfg", "acdfh", "acefg", "acefh"。
给出表示基于给定语法规则的表达式 expression，返回它所表示的所有字符串组成的有序列表。

假如你希望以「集合」的概念了解此题，也可以通过点击 “显示英文描述” 获取详情。

输入：expression = "{a,b}{c,{d,e}}"
输出：["ac","ad","ae","bc","bd","be"]

输入：expression = "{{a,z},a{b,c},{ab,z}}"
输出：["a","ab","ac","z"]
解释：输出中 不应 出现重复的组合结果。

1 <= expression.length <= 60
expression[i] 由 '{'，'}'，',' 或小写英文字母组成
给出的表达式 expression 用以表示一组基于题目描述中语法构造的字符串

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/brace-expansion-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 */

/**
 * @description
 * 堆栈的方法
 *
 */
namespace BraceExpansion {
  function isChar(char: string): boolean {
    return /[a-z]/.test(char);
  }

  function calc(operator: string[], values: (string | string[])[]) {
    const opt = operator.pop();
    if (opt == "{") {
      return;
    }
    if (values.length < 2) {
      return;
    }
    const back = values.pop();
    const front = values.pop();
    if (!back || !front) {
      return;
    }
    if (opt == "*") {
      if (typeof back == "string" && typeof front == "string") {
        values.push(front + back);
        return;
      }
      if (Array.isArray(front) && Array.isArray(back)) {
        const res: string[] = [];
        front.forEach((a) => {
          back.forEach((b) => {
            res.push(a + b);
          });
        });
        values.push(res);

        return;
      }
      if (Array.isArray(front) && !Array.isArray(back)) {
        const res: string[] = [];
        front.forEach((a) => {
          res.push(a + back);
        });
        values.push(res);
        return;
      }
      if (!Array.isArray(front) && Array.isArray(back)) {
        const res: string[] = [];
        back.forEach((a) => {
          res.push(front + a);
        });
        values.push(res);
        return;
      }
    }

    // Deal with ','
    const res: string[] = [
      ...(Array.isArray(front) ? front : [front]),
      ...(Array.isArray(back) ? back : [back]),
    ];
    values.push(res);
  }

  export function braceExpansionII(expression: string): string[] {
    const res: (string[] | string)[] = [],
      operator: string[] = [],
      len = expression.length;

    let i = 0;
    while (i < len) {
      const element = expression[i];
      if (isChar(element)) {
        if (i - 1 >= 0) {
          if (expression[i - 1] == "}") {
            operator.push("*");
          }
        }
        let str = element;
        i++;
        while (i < len && isChar(expression[i])) {
          str += expression[i];
          i++;
        }
        res.push(str);
        continue;
      }
      if (element == "{") {
        if (
          i - 1 >= 0 &&
          (expression[i - 1] == "}" || isChar(expression[i - 1]))
        ) {
          operator.push("*");
        }
        operator.push("{");
        i++;
        continue;
      }
      if (element == ",") {
        while (operator.length > 0 && operator[operator.length - 1] == "*") {
          calc(operator, res);
        }
        operator.push(element);
        i++;
        continue;
      }
      if (element == "}") {
        while (operator.length > 0 && operator[operator.length - 1] != "{") {
          calc(operator, res);
        }
        if (operator[operator.length - 1] == "{") {
          operator.pop();
        }
        i++;
        continue;
      }
    }

    while (operator.length > 0) {
      calc(operator, res);
    }

    const arr: string[] = [];
    res.forEach((v) => {
      if (Array.isArray(v)) {
        arr.push(...v);
      } else {
        arr.push(v);
      }
    });

    const set = new Set(arr);

    return Array.from(set).sort();
  }

  export function recursion(expression: string): string[] {
    const dfs = (exp: string) => {
      let j = exp.indexOf("}");
      if (j === -1) {
        set.add(exp);
        return;
      }
      let i = j;
      while (exp.charAt(i) !== "{") {
        --i;
      }
      let a = exp.substring(0, i);
      let c = exp.substring(j + 1);
      for (const b of exp.substring(i + 1, j).split(",")) {
        dfs(a + b + c);
      }
    };
    const set: Set<string> = new Set();
    dfs(expression);
    return Array.from(set).sort();
  }
}

(() => {
  const input = "{{a,z},a{b,c},{ab,z}}";

  console.log("input:", input.toString());

  const result = BraceExpansion.braceExpansionII(input);

  console.log("result:", result.toString());
})();
