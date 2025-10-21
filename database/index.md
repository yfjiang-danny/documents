## Database

1. mysql 与 redis 有何区别？

   - mysql 是关系型数据库，redis 是非关系型数据库（键值对）
   - mysql 是持久化存储，redis 是内存存储，所以 redis 的读写速度更快，通常用来做缓存
   - mysql 是结构化存储，redis 是非结构化存储
   - mysql 是事务型数据库，redis 是非事务型数据库
   - mysql 是支持复杂查询的，redis 是不支持复杂查询的
   - redis 可以设置过期时间，mysql 是永久存储的

2. Mysql 可以存储的数据类型有哪些？

   - 整型：int、tinyint、smallint、bigint
   - 浮点型：float、double、decimal
   - 字符型：char、varchar、text、blob
   - 日期时间型：date、time、datetime、timestamp
   - 二进制型：binary、varbinary、blob、bit
   - 枚举型：enum
   - 集合型：set
   - json 型：json\array
   - 其他：geometry、point、line、polygon、multipoint、multiline、multipolygon、geometrycollection

3. Mysql 中的索引有哪些？

   - 主键索引：primary key
   - 唯一索引：unique
   - 普通索引：index
   - 全文索引：fulltext
   - 组合索引：组合多个字段创建的索引

4. Mysql 中的事务有哪些特性？

   - 原子性：事务中的操作要么全部成功，要么全部失败
