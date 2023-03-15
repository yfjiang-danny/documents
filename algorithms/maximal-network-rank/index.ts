/**

n 座城市和一些连接这些城市的道路 roads 共同组成一个基础设施网络。每个 roads[i] = [ai, bi] 都表示在城市 ai 和 bi 之间有一条双向道路。

两座不同城市构成的 城市对 的 网络秩 定义为：与这两座城市 直接 相连的道路总数。如果存在一条道路直接连接这两座城市，则这条道路只计算 一次 。

整个基础设施网络的 最大网络秩 是所有不同城市对中的 最大网络秩 。

给你整数 n 和数组 roads，返回整个基础设施网络的 最大网络秩 。

输入：n = 4, roads = [[0,1],[0,3],[1,2],[1,3]]
输出：4
解释：城市 0 和 1 的网络秩是 4，因为共有 4 条道路与城市 0 或 1 相连。位于 0 和 1 之间的道路只计算一次。

输入：n = 5, roads = [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]]
输出：5
解释：共有 5 条道路与城市 1 或 2 相连。

输入：n = 8, roads = [[0,1],[1,2],[2,3],[2,4],[5,6],[5,7]]
输出：5
解释：2 和 5 的网络秩为 5，注意并非所有的城市都需要连接起来。


2 <= n <= 100
0 <= roads.length <= n * (n - 1) / 2
roads[i].length == 2
0 <= ai, bi <= n-1
ai != bi
每对城市之间 最多只有一条 道路相连

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/maximal-network-rank
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 */

namespace Graph {
  export function maximalNetworkRank(n: number, roads: number[][]): number {
    if (roads.length <= 0) {
      return 0;
    }
    let res = 1,
      maxRoad = 1,
      maxCities = new Array(n).fill(0).map((_, i) => i),
      secondRoad = 0,
      secondCities = [];
    const map = new Map<number, number[]>(),
      roadMap = new Map<string, boolean>();

    for (let i = 0; i < roads.length; i++) {
      const [a, b] = roads[i];
      roadMap.set(`${a},${b}`, true);
      if (map.has(a)) {
        const v = map.get(a);
        v.push(b);
        if (maxRoad < v.length) {
          const secondCitiesTemp = maxCities.filter((v) => v !== a);
          if (secondCitiesTemp.length > 0) {
            secondRoad = maxRoad;
            secondCities = secondCitiesTemp;
          }
          maxRoad = v.length;
          maxCities = [a];
        } else if (maxRoad == v.length) {
          maxCities.push(a);
        } else if (secondRoad == v.length) {
          secondCities.push(a);
        }
      } else {
        map.set(a, [b]);
      }
      if (map.has(b)) {
        const v = map.get(b);
        v.push(a);
        if (maxRoad < v.length) {
          const secondCitiesTemp = maxCities.filter((v) => v !== b);
          if (secondCitiesTemp.length > 0) {
            secondRoad = maxRoad;
            secondCities = secondCitiesTemp;
          }
          maxRoad = v.length;
          maxCities = [b];
        } else if (maxRoad == v.length) {
          maxCities.push(b);
        } else if (secondRoad == v.length) {
          secondCities.push(b);
        }
      } else {
        map.set(b, [a]);
      }
    }

    console.log("maxRoad:", maxRoad);
    console.log("secondRoad:", secondRoad);
    console.log("maxCities:", maxCities);
    console.log("secondCities:", secondCities);

    // console.log("map:", map);

    const maxArr =
      maxCities.length > 1 ? maxCities : [...maxCities, ...secondCities];
    for (let i = 0; i < maxArr.length; i++) {
      const a = maxArr[i];
      for (let j = i + 1; j < maxArr.length; j++) {
        const b = maxArr[j];
        const len = (map.get(a)?.length || 0) + (map.get(b)?.length || 0);
        if (roadMap.has(`${a},${b}`) || roadMap.has(`${b},${a}`)) {
          res = Math.max(res, len - 1);
        } else {
          res = Math.max(res, len);
        }
      }
    }

    return res;
  }

  export function answer1(n: number, roads: number[][]): number {
    const connect = new Array(n).fill(0).map(() => new Array(n).fill(0));
    const degree = new Array(n).fill(0);
    for (const v of roads) {
      connect[v[0]][v[1]] = true;
      connect[v[1]][v[0]] = true;
      degree[v[0]]++;
      degree[v[1]]++;
    }

    let maxRank = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let rank = degree[i] + degree[j] - (connect[i][j] ? 1 : 0);
        maxRank = Math.max(maxRank, rank);
      }
    }
    return maxRank;
  }

  /**
   * 贪心
   * @param n
   * @param roads
   * @returns
   */
  export function answer2(n: number, roads: number[][]): number {
    const connect = new Array(n).fill(0).map(() => new Array(n).fill(0));
    const degree = new Array(n).fill(0);
    for (const road of roads) {
      let x = road[0],
        y = road[1];
      connect[x][y] = true;
      connect[y][x] = true;
      degree[x]++;
      degree[y]++;
    }

    let first = -1,
      second = -2;
    let firstArr = [];
    let secondArr = [];
    for (let i = 0; i < n; ++i) {
      if (degree[i] > first) {
        second = first;
        secondArr = [...firstArr];
        first = degree[i];
        firstArr = [i];
      } else if (degree[i] === first) {
        firstArr.push(i);
      } else if (degree[i] > second) {
        secondArr = [];
        second = degree[i];
        secondArr.push(i);
      } else if (degree[i] === second) {
        secondArr.push(i);
      }
    }
    if (firstArr.length === 1) {
      const u = firstArr[0];
      for (const v of secondArr) {
        if (!connect[u][v]) {
          return first + second;
        }
      }
      return first + second - 1;
    } else {
      const m = roads.length;
      if ((firstArr.length * (firstArr.length - 1)) / 2 > m) {
        return first * 2;
      }
      for (const u of firstArr) {
        for (const v of firstArr) {
          if (u !== v && !connect[u][v]) {
            return first * 2;
          }
        }
      }
      return first * 2 - 1;
    }
  }
}

(() => {
  const input1 = 28;
  const input2 = [
    [13, 5],
    [22, 17],
    [22, 4],
    [26, 8],
    [27, 13],
    [27, 9],
    [20, 19],
    [19, 5],
    [15, 1],
    [10, 24],
    [19, 22],
    [19, 13],
    [4, 10],
    [13, 3],
    [6, 9],
    [9, 16],
    [9, 12],
    [15, 8],
    [26, 12],
    [16, 5],
    [14, 15],
    [2, 10],
    [4, 18],
    [13, 21],
    [22, 9],
    [10, 22],
    [25, 27],
    [21, 1],
    [6, 20],
    [17, 0],
    [6, 11],
    [0, 26],
    [11, 5],
    [21, 23],
    [3, 10],
    [19, 17],
    [18, 21],
    [14, 18],
    [8, 23],
    [1, 25],
    [0, 16],
    [18, 9],
    [1, 3],
    [20, 8],
    [13, 2],
    [7, 0],
    [16, 21],
    [18, 27],
    [8, 21],
    [2, 11],
    [0, 3],
    [24, 12],
    [5, 0],
    [1, 4],
    [26, 16],
    [23, 14],
    [0, 19],
    [7, 24],
    [5, 27],
    [23, 0],
    [6, 2],
    [3, 26],
    [5, 23],
    [25, 24],
    [23, 3],
    [9, 3],
    [22, 21],
    [14, 3],
    [3, 15],
    [25, 6],
    [6, 10],
    [12, 3],
    [2, 19],
    [26, 18],
    [20, 22],
    [9, 26],
    [17, 5],
    [8, 3],
    [1, 14],
    [21, 2],
    [7, 1],
    [27, 3],
    [11, 0],
    [27, 23],
    [14, 10],
    [27, 26],
    [24, 20],
    [25, 16],
    [17, 6],
    [14, 17],
    [21, 10],
    [2, 22],
    [9, 2],
    [1, 6],
    [22, 14],
    [21, 25],
    [7, 25],
    [11, 25],
    [15, 23],
    [11, 24],
    [3, 17],
    [20, 10],
    [27, 17],
    [23, 2],
    [21, 20],
    [3, 2],
    [12, 27],
    [22, 12],
    [1, 22],
    [7, 17],
    [4, 24],
    [27, 24],
    [12, 11],
    [10, 7],
    [5, 24],
    [5, 4],
    [8, 14],
    [15, 11],
    [6, 7],
    [2, 8],
    [20, 1],
    [9, 24],
    [20, 0],
    [22, 24],
    [17, 24],
    [9, 20],
    [10, 9],
    [3, 7],
    [14, 4],
    [18, 0],
    [27, 7],
    [22, 16],
    [16, 15],
    [20, 16],
    [16, 8],
    [13, 10],
    [20, 12],
    [14, 25],
    [19, 24],
    [20, 5],
    [3, 19],
    [27, 16],
    [26, 13],
    [13, 17],
    [17, 21],
    [8, 19],
    [1, 2],
    [23, 13],
    [7, 12],
    [4, 15],
    [5, 1],
    [23, 9],
    [23, 12],
    [18, 25],
    [21, 3],
    [10, 19],
    [18, 3],
    [5, 26],
    [15, 18],
    [7, 15],
    [4, 13],
    [22, 27],
    [10, 17],
    [14, 6],
    [25, 15],
    [4, 0],
    [26, 23],
    [18, 19],
    [13, 12],
    [26, 4],
  ];

  console.log("input1:", input1.toString());
  console.log("input2:", input2.toString());

  const result = Graph.maximalNetworkRank(input1, input2);

  console.log("result:", result.toString());
})();
