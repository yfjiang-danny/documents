## Window Update environment

_Use `set` work for current terminal. Use `setx` work for window permanent, but need to reopen terminal_

### Watch PATH

```cmd
echo %PATH%
```

### Add to PATH

```cmd
set PATH "%PATH%;C:\Your\New\Path"
```

### Update one of PATH

```cmd
set PATH "%PATH:C:\Path\To\Update\Old=C:\Path\To\Update\New%"
```

### Remove one of PATH

```cmd
set PATH "%PATH:;C:\Path\To\Update\Old=%"
```

## Reference

### `%PATH%` 和 `%PATH:` 的区别

`%PATH%` 和 `%PATH:` 的区别在于如何操作 Windows 环境变量中的 `PATH` 字符串。

1. `%PATH%`

   - `%PATH%` 表示引用环境变量 `PATH` 的值，其中 `PATH` 是一个特殊的环境变量，用于存储一组文件路径，指示操作系统在哪里查找可执行文件和命令。
   - 使用 `%PATH%` 时，它会被替换为当前系统的 `PATH` 环境变量的值，这个值是一串以分号分隔的路径字符串。例如，`C:\Windows\System32;C:\Program Files\SomeApp`。
   - 通常使用 `%PATH%` 来引用 `PATH` 变量的内容，以便在命令中执行在 `PATH` 中的程序或在脚本中操作 `PATH` 值。

2. `%PATH:`
   - 是一种操作 `PATH` 字符串的方式，它使用了冒号 `:` 这个分隔符。这种写法并不是标准的 Windows 环境变量操作方法，而是一种自定义的字符串操作方式。
   - 使用 `%PATH:` 时，它实际上并不引用 `PATH` 环境变量的值，而是将`:`之前的内容作为变量名，`:`之后的内容作为变量值。例如，`%PATH:abc=xyz%` 将查找 `PATH` 中的字符串"abc"并将其替换为"xyz"。
   - 这种写法通常不用于操作 `PATH` 环境变量，而是用于在批处理文件或脚本中进行字符串操作，例如，将某个字符串中的特定部分替换为其他内容。
