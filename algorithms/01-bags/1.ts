/**
 * 分数背包
 * @param w 重量
 * @param v 价值
 * @param maxW 背包容量
 */
function getBagMaxValue(w: number[], v: number[], maxW: number): number {
  if (!w.length) {
    return 0;
  }
  if (w.length !== v.length) {
    throw new Error("输入的重量个数和价值个数不一致");
  }
  // 计算单位价值 [price,index][]
  const priceAndIndexArr: [number, number][] = [];
  for (let i = 0; i < w.length; i++) {
    priceAndIndexArr[i] = [v[i] / w[i], i];
  }

  // 按照单位价值降序排序
  const priceSortedResult = priceAndIndexArr.sort(
    (a: [number, number], b: [number, number]) => b[0] - a[0]
  );

  let value = 0;
  let restW = maxW;
  for (let i = 0; i < w.length; i++) {
    const index = priceSortedResult[i][1];
    const p = priceSortedResult[i][0];
    if (restW - w[index] >= 0) {
      value += v[index];
      restW -= w[index];
      continue;
    }
    value += restW * p;
    break;
  }
  return value;
}
