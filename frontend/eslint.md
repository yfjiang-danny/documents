1. 配置 eslint 的时候如果不生效，查看模块类型是否用错了，比如 commonjs 和 module 的区分
2. Eslint 配置文件的几种形式： `.eslintrc`,`.eslintrc.js`,`.eslintrc.cjs`,`.eslintrc.yaml`,`.eslintrc.yml`,`.eslintrc.json`
3. Debug：在 package.json 里配置
   ```
   script: {
       lint: "eslint src/**/*.ts src/**/*.tsx" // "src/**/*.ts src/**/*.tsx" 是源文件路径
   }
   ```
   然后运行: `yarn lint` 进行调试
4. 常用的 eslint 插件：`eslint-plugin-react`,`eslint-plugin-react-hooks`,`@typescript-eslint/eslint-plugin`,`@typescript-eslint/parser`
