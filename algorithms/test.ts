namespace UnitTest {
  export function test(fn: Function, ...args: any) {
    const res = fn.call(null, ...args);
    const expect = args.splice(args.length - 1, 1)[0];
    if (JSON.stringify(res) !== JSON.stringify(expect)) {
      for (const arg of args) {
        console.log(arg);
      }
      console.log("expect: ", expect);
      console.log("result: ", res);
      console.log("");
    }
  }
}
