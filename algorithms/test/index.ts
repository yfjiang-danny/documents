/// <reference path="../sorts/index.ts" />

namespace Test {
  export function testSort() {
    const input = [4, 6, 9, 41, 0];

    console.log("input:", input);
    console.log("result:", Sorts.quickSort(input, 0));
  }
}

// tsc --outFile algorithms/test/index.js algorithms/test/index.ts algorithms/sorts/index.ts && node algorithms/test/index.js
Test.testSort();
