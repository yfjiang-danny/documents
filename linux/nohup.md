# Nohup（no hang up）

用于在系统后台不挂断地运行命令，退出终端不会影响程序的运行。

```bash
nohup serve -s dist -l 3000 >/dev/null 2>&1 & exit
```

## Detail

1. Command `nohup`
   不挂断地运行命令

   ```bash
   nohup Command [ Arg … ] [　& ]
   ```

   > 无论是否将 nohup 命令的输出重定向到终端，输出都将附加到当前目录的 nohup.out 文件中
   > 如果当前目录的 nohup.out 文件不可写，输出重定向到 $HOME/nohup.out 文件中
   > 如果没有文件能创建或打开以用于追加，那么 Command 参数指定的命令不可调用

   退出状态，该命令返回下列出口值：

   > 126 可以查找但不能调用 Command 参数指定的命令
   > 127 nohup 命令发生错误或不能查找由 Command 参数指定的命令
   > 否则，nohup 命令的退出状态是 Command 参数指定命令的退出状态

2. Flag `&`
   用途：在后台运行

   ```bash
   nohup command &

   ```

   **2>&1 解释**
   将标准错误 2 重定向到标准输出 &1 ，标准输出 &1 再被重定向输入到 runoob.log 文件中。

   > 0 – stdin (standard input，标准输入)
   > 1 – stdout (standard output，标准输出)
   > 2 – stderr (standard error，标准错误输出)
