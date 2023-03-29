# Linux Command

## 查找

1. 查找进程

   ```bash
   ps -aux | grep xxx
   ```

   > a : 显示所有程序
   > u : 以用户为主的格式来显示
   > x : 显示所有程序，不区分终端机

2. 根据端口查找进程

   ```bash
   lsof -i:3000
   ```

   ```bash
   netstat -ap | grep 3000
   ```

## 提取词语|输出

```bash
ps -aux | awk '{print $1,$2}'
```

> 必须单引号
> `$2` 每行按空格或 TAB 分割，输出文本中的 1，2 项

```bash
ps -aux | awk '{if (NR>1){print $1,$2}}'
```

> 从第二行输出，通常用来过滤表头
