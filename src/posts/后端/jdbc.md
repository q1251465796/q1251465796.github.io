---
title: jdbc
date: 2025-11-29
tag:
  - 后端
categories:
  - 后端
  - java
cover:
article: true
star: false
---

# 介绍

JDBC（Java Database Connectivity）是 Java 语言中用于连接和操作数据库的标准 API。它提供了一套统一的接口和类，使开发者能够以一致的方式访问多种关系型数据库（如 MySQL、Oracle、PostgreSQL 等）

主要用到的包是`java.sql`
**`java.sql` 包**：这个包提供了Java应用程序与数据库进行交互的基本功能。它包含了用于处理SQL数据的类和接口，例如如何通过JDBC（Java Database Connectivity）连接到数据库、执行SQL语句、处理结果集等。一些关键的接口和类包括 `Connection`, `Statement`, `PreparedStatement`, `ResultSet` 等。简而言之，`java.sql` 提供了访问数据库的基础API。

人话：**jdbc就是java操作数据库用的规范**
**`java.sql`是java操作数据库的包**


后文若无特殊说明，操作的都是mysql数据库。

依赖要求​​：需要 MySQL JDBC 驱动（使用maven导包）：
```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.28</version>
</dependency>
```


使用流程：
- **连接数据库​**​：通过 `DriverManager.getConnection()` 建立连接
- ​**​执行查询​**​：使用 `Statement.executeQuery()` 执行 SQL
- ​**​处理结果​**​：通过 `ResultSet` 遍历查询结果
- ​**​关闭资源​**​：必须按 `ResultSet → Statement → Connection` 从里到外的顺序关闭


通过以下代码感受操作流程：
```java
import java.sql.*;

public class SimpleJdbcDemo {
    public static void main(String[] args) {
        // 数据库连接信息
        String url = "jdbc:mysql://localhost:3306/testdb?useSSL=false&serverTimezone=UTC";
        String user = "root";
        String password = "123456";
        
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            // 1. 加载数据库驱动（MySQL 8+ 可省略）
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // 2. 建立数据库连接
            conn = DriverManager.getConnection(url, user, password);
            
            // 3. 创建 Statement 对象
            stmt = conn.createStatement();
            
            // 4. 执行 SQL 查询
            String sql = "SELECT id, name FROM users";
            rs = stmt.executeQuery(sql);
            
            // 5. 处理查询结果
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                System.out.println("ID: " + id + ", Name: " + name);
            }
            
        } catch (ClassNotFoundException e) {
            System.out.println("找不到数据库驱动！");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("数据库操作异常！");
            e.printStackTrace();
        } finally {
            // 6. 关闭资源（反向顺序）
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```

# 使用
## 创建连接Connection

```java
Connection conn = DriverManager.getConnection(url, user, password);
```

向数据库发起连接请求，成功则返回一个 `Connection` 对象，后续所有数据库操作（如执行 SQL）都依赖此对象。

| 参数         | 说明                                                                                |
| ---------- | --------------------------------------------------------------------------------- |
| `url`      | 数据库连接字符串，格式为 `jdbc:子协议://主机:端口/数据库名`  <br>示例：`jdbc:mysql://localhost:3306/testdb` |
| `user`     | 数据库用户名                                                                            |
| `password` | 数据库密码                                                                             |

⚠️对于url参数，MySQL 8+ 需添加 `serverTimezone=UTC` 避免时区问题。
```
jdbc:mysql://localhost:3306/my_database?serverTimezone=UTC
```


建议使用`try-with-resourses`语法创建
```java
String url = "jdbc:mysql://localhost:3306/testdb?serverTimezone=UTC";
String user = "root";
String password = "123456";

try (Connection conn = DriverManager.getConnection(url, user, password)) {
    // 后续的各种操作
} catch (SQLException e) {
    e.printStackTrace();
}
```


## 创建会话Statement

前面我们已经创建了Connection对象，使用这个对象的createStatement方法创建一个会话

```java
Connection conn = ...; // 已获取的数据库连接
Statement stmt = conn.createStatement();
```


```java
import java.sql.*;


public class CreateStatementDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/testdb?useSSL=false&serverTimezone=UTC";
        String user = "root";
        String password = "123456";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement(); // 创建 Statement 对象
	         // 后续操作数据库的代码

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```


## 查询

### 获取ResultSet

1. 通过 `Connection.createStatement()`方法获取`Statement`对象
   (或用`Connection.prepareStatement()`获取`PreparedStatement`对象）
2. 使用 `executeQuery()`执行 SQL，返回`ResultSet`对象.

ResultSet包含查到的数据，用于后续的结果处理

#### 使用 Statement
```java
// 使用 Statement
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT * FROM users");
```

#### 使用PreparedStatement
```java
// 使用 PreparedStatement
PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
pstmt.setInt(1, 1);
ResultSet rs = pstmt.executeQuery();
```

`conn.prepareStatement`方法的参数表示**预编译的SQL语句**

Statement对象执行SQL语句的时候需要传入SQL语句，而PreparedStatement在创建对象的时候就已经绑定了SQL语句

预编译的SQL语句的大概是这个样子。“？”是占位符

```sql
SELECT * FROM users WHERE id = ? AND status = ?
```

```java
pstmt.setInt(1, 1);
```

`.setInt(1,1)`第一个参数表示找到第一个问号，第二个参数表示把这个问号的值设置为1

类似地，`pstmt.setString(2, "Alice");`第一个参数表示找到第2个问号，第二个参数表示把这个问号的值设置为"Alice"

| ​**​方法​**​                           | ​**​作用​**​         | ​**​示例​**​                                        |
| ------------------------------------ | ------------------ | ------------------------------------------------- |
| `setInt(int index, int value)`       | 设置整数类型参数（索引从 1 开始） | `pstmt.setInt(1, 100);`                           |
| `setString(int index, String value)` | 设置字符串类型参数          | `pstmt.setString(2, "Alice");`                    |
| `setDate(int index, Date value)`     | 设置日期类型参数           | `pstmt.setDate(3, new Date());`                   |
| `setBigDecimal(index, value)`        | 高精度数值（DECIMAL）     | `pstmt.setBigDecimal(4, new BigDecimal("19.99"))` |

注意，如果跳过某个索引（如未设置第一个 `?` 直接设置第二个），会抛出 `SQLException`。

例
```java
String sql = "INSERT INTO orders (user_id, product, quantity) VALUES (?, ?, ?)";
try (
    Connection conn = DriverManager.getConnection(url, user, password);
    PreparedStatement pstmt = conn.prepareStatement(sql)
) {
    // 设置第一个参数（user_id）
    pstmt.setInt(1, 1001);
    // 设置第二个参数（product）
    pstmt.setString(2, "Laptop");
    // 设置第三个参数（quantity）
    pstmt.setInt(3, 2);
    
    int rows = pstmt.executeUpdate();
    System.out.println("插入 " + rows + " 条数据");
} catch (SQLException e) {
    e.printStackTrace();
}
```

#### 查询

获取PreparedStatement或Statement后，执行以下方法，可以执行SQL语句

| ​**​方法​**​        | ​**​作用​**​                     | ​**​示例​**​                             |
| ----------------- | ------------------------------ | -------------------------------------- |
| `executeQuery()`  | **执行查询**，**返回 `ResultSet` 对象** | `ResultSet rs = pstmt.executeQuery();` |
| `executeUpdate()` | **执行增删改**，**返回受影响的行数**         | `int rows = pstmt.executeUpdate();`    |



### ResultSet常用方法

getXxx

| 方法                      | 适用数据类型         | 示例                                         |
| ----------------------- | -------------- | ------------------------------------------ |
| `getInt(columnName)`    | 整型（INT）        | `rs.getInt("age")`返回当前游标指向的行的age索引的数据      |
| `getString(columnName)` | 字符串（VARCHAR）   | `rs.getString("name")`返回当前游标指向的行的name索引的数据 |
| `getDate(columnName)`   | 日期（DATE）       | `rs.getDate("birthday")`                   |
| `getTimestamp(col)`     | 时间戳（TIMESTAMP） | `rs.getTimestamp("log_time")`              |
| `getBigDecimal(col)`    | 高精度数值（DECIMAL） | `rs.getBigDecimal("price")`                |
| `getObject(col)`        | 任意类型（通用方法）     | `Object obj = rs.getObject("data")`        |

如果不理解“当前行”，请往下看

记得手动关闭`ResultSet`，关闭顺序：`ResultSet → Statement(PreparedStatement) → Connection`。

### 遍历结果

```java
while (rs.next()) { // 移动到下一行
    int id = rs.getInt("id");       // 通过列名获取
    String name = rs.getString(2);  // 通过列索引获取（即第二个索引）（索引从1开始）
    System.out.println("ID: " + id + ", Name: " + name);
}
```

默认情况下，`ResultSet` 的游标位于第一行数据之前（索引 0）

`ResultSet`的next方法作用：将游标从当前位置向前移动一行。当前行有效则返回true，否则false

**游标的遍历方向：**
**​默认单向（TYPE_FORWARD_ONLY）​**​：只能向前移动（`next()`）。
```java
Statement stmt = conn.createStatement(
	ResultSet.TYPE_FORWARD_ONLY, // 默认类型
	ResultSet.CONCUR_READ_ONLY
);
    ```

​**​可滚动（TYPE_SCROLL_INSENSITIVE/TYPE_SCROLL_SENSITIVE）​**​：支持前后移动。
```java
Statement stmt = conn.createStatement(
	ResultSet.TYPE_SCROLL_INSENSITIVE, // 可滚动但不感知数据库变化
	ResultSet.CONCUR_READ_ONLY
);
ResultSet rs = stmt.executeQuery("SELECT * FROM users");

rs.last();       // 移动到最后一行
rs.absolute(3);  // 跳转到第3行
rs.relative(-1); // 向前移动1行
```

### 获取元数据

`ResultSet`对象调用`getMetaData`获取元数据对象`ResultSetMetaData`，`ResultSetMetaData`里面包含列（或者说索引）信息。如列的数量，列的名字，列的数据类型。

```java
metaData.getColumnName(1) // 获取第一列的名称
metaData.getColumnTypeName(5) // 获取第5列的数据类型
```

```java
ResultSetMetaData metaData = rs.getMetaData();
int columnCount = metaData.getColumnCount();

for (int i = 1; i <= columnCount; i++) {
    String columnName = metaData.getColumnName(i); // 列名
    String columnType = metaData.getColumnTypeName(i); // 数据类型（如 VARCHAR）
    System.out.println("列 " + i + ": " + columnName + " (" + columnType + ")");
}
```



