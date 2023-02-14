/*
 我们从一块字母板上的位置 (0, 0) 出发，该坐标对应的字符为 board[0][0]。

在本题里，字母板为board = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"]，如下所示。

a b c d e
f g h i j
k l m n o
p q r s t
u v w x y
z

我们可以按下面的指令规则行动：

如果方格存在，'U' 意味着将我们的位置上移一行；
如果方格存在，'D' 意味着将我们的位置下移一行；
如果方格存在，'L' 意味着将我们的位置左移一列；
如果方格存在，'R' 意味着将我们的位置右移一列；
'!' 会把在我们当前位置 (r, c) 的字符 board[r][c] 添加到答案中。
（注意，字母板上只存在有字母的位置。）

返回指令序列，用最小的行动次数让答案和目标 target 相同。你可以返回任何达成目标的路径。

输入：target = "leet"
输出："DDR!UURRR!!DDD!"

输入：target = "code"
输出："RR!DDRR!UUL!R!"
 
 
 */
const board = "abcdefghijklmnopqrstuvwxyz";
function alphabetBoardPath(target) {
    const map = new Map();
    for (let i = 0; i < board.length; i++) {
        const element = board[i];
        const row = Math.floor(i / 5);
        const column = i % 5;
        map.set(element, [row, column]);
    }
    function move(offset, type) {
        let res = "";
        if (offset != 0) {
            const direction = type == "row" ? (offset < 0 ? "U" : "D") : offset < 0 ? "L" : "R";
            let count = Math.abs(offset);
            while (count > 0) {
                res += direction;
                count--;
            }
        }
        return res;
    }
    let res = "";
    let current = [0, 0];
    for (let i = 0; i < target.length; i++) {
        const element = target[i];
        const position = map.get(element);
        if (position) {
            const yOffset = position[0] - current[0];
            const xOffset = position[1] - current[1];
            if (current[0] == 5) {
                res += move(yOffset, "row");
                res += move(xOffset, "column");
            }
            else {
                res += move(xOffset, "column");
                res += move(yOffset, "row");
            }
            current[0] += yOffset;
            current[1] += xOffset;
            res += "!";
        }
    }
    return res;
}
const input1 = "leet";
console.log("input1:", input1.toString());
const result = alphabetBoardPath(input1);
console.log("result:", result.toString());
