/**
 
二进制数转字符串。给定一个介于0和1之间的实数（如0.72），类型为double，打印它的二进制表达式。如果该数字无法精确地用32位以内的二进制表示，则打印“ERROR”。

 输入：0.625
 输出："0.101"

  输入：0.1
 输出："ERROR"
 提示：0.1无法被二进制准确表示

 32位包括输出中的 "0." 这两位。
题目保证输入用例的小数位数最多只有 6 位

https://leetcode.cn/problems/bianry-number-to-string-lcci/
 */
var PrintBin;
(function (PrintBin) {
    function printBin(num) {
        let res = "";
        while (res.length <= 30 && num !== 0) {
            num *= 2;
            res += parseInt(num.toFixed(1));
            num = parseFloat("0." + num.toString().split(".")[1]);
        }
        console.log("res:", res);
        console.log("num:", num);
        return num > 0 ? "ERROR" : "0." + res;
    }
    PrintBin.printBin = printBin;
})(PrintBin || (PrintBin = {}));
(function test() {
    const input = 0.000005;
    console.log("input:", input.toString());
    const result = PrintBin.printBin(input);
    console.log("result:", result.toString());
})();
