---
title: 认识Spring ioC和DI
date: 2025-11-29
tag:
  - 后端
categories:
  - 后端
cover:
article: true
star: false
---

## Spring IoC

**Spring IoC**（（Inversion of Control）控制反转）​是 Spring 框架的核心机制（理解为设计模式），用于​**​解耦组件依赖关系​**​，将对象的创建、依赖管理和生命周期交**由 Spring 容器统一控制**

可以理解为**类与类之间的依赖通过容器来控制、配置实现**；

传统编程中，对象自己创建依赖的其他对象（比如A类里直接new B类）。如果代码中直接写`A a = new A();`，然后`a.setB(new B());`，会导致A和B强绑定。修改B的代码时，必须同步修改A的代码，维护成本极高。

而在Spring IOC中，对象的创建和依赖关系由Spring容器统一管理，通过配置文件或注解（如`@Autowired`）自动完成注入。

例:
想写一个类，UserServicelmpl，写该类时要创建 UserDaolmpl对象，传统方法是
```java
UserDaol userDao = new UserDaolmpl()
```
使用spring框架管理的话：
```java
UserDaol userDao = spring客户端.getBean(id标识)
```
这里的id标识表示UserDaolmpl（在配置文件中告诉spring客户端，id标识=UserDaolmpl）


## DI

​**​DI（Dependency Injection，依赖注入）​**​ 是一种通过外部传递对象依赖关系，而非在代码内部直接创建依赖对象的技术。它是实现 ​**​控制反转（IoC）​**​ 的核心**手段**之一，目的是降低代码耦合度，提高灵活性和可维护性。

| ​**​场景​**​          | ​**​正确方法（DI）​**​                       | ​**​错误方法（硬编码依赖）​**​              |
| ------------------- | -------------------------------------- | -------------------------------- |
| 用户注册功能              | `UserService`通过`@Autowired`注入`UserDao` | `UserService`内部直接`new UserDao()` |
| 数据库切换（如MySQL→Redis） | 只需修改容器配置，注入新的`RedisDao`                | 需逐行修改所有`new UserDao()`代码         |
看不懂没关系，后续的学习中将慢慢了解
## spring ioc 容器

普通容器：只能用于存放。
复杂容器：不只用于存储对象，还能用于管理存储的对象的生命周期

我们即将要学习的 SpringIoC 容器也是一个复杂容器。它们不仅要负责创建组件的对象、存储组件的对象，还要负责调用组件的方法让它们工作，最终在特定情况下销毁组件。

Spring IoC 容器管理的java对象成为spring bean

Spring IoC 容器，负责实例化、配置和组装 bean（组件）。容器通过读取配置元数据来获取有关要实例化、配置和组装组件的指令。配置元数据以 XML、Java 注解或 Java 代码形式表现。


## 容器接口
本小节内容了解即可

Spring 提供了两种 IOC 容器接口：
1. ​**​`BeanFactory`​**​（基础容器）：
    - 最小化功能，仅支持 Bean 的加载和依赖注入。
    - 示例：`DefaultListableBeanFactory`。
2. ​**​`ApplicationContext`​**​（增强容器）：
    - 继承自 `BeanFactory`，提供高级功能（如 AOP、事件传播、国际化等）。
    - 常用实现类：`ClassPathXmlApplicationContext`（XML 配置）、`AnnotationConfigApplicationContext`（注解配置）。

**ApplicationContext容器的实现类**：

| 类型名                                | 简介                                                            |
| ---------------------------------- | ------------------------------------------------------------- |
| ClassPathXmlApplicationContext     | 通过读取类路径下的 XML 格式的配置文件创建 IOC 容器对象                              |
| FileSystemXmlApplicationContext    | 通过文件系统路径读取 XML 格式的配置文件创建 IOC 容器对象。比如当配置文件在当前项目之外时             |
| AnnotationConfigApplicationContext | 通过读取Java配置类创建 IOC 容器对象                                        |
| WebApplicationContext              | 专门为 Web 应用准备，基于 Web 环境创建 IOC 容器对象，并将对象引入存入 ServletContext 域中。 |
下面为`ClassPathXmlApplicationContext`容器的创建
```java
package com.example.demo;  
  
import com.example.dao.UserDao;  
import org.springframework.context.ApplicationContext;  
import org.springframework.context.support.ClassPathXmlApplicationContext;  
  
public class UserDaoDemo {  
    public static void main(String[] args) {  
        ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");    
    }  
}
```

## Spring DI

**DI (Dependency Injection) 依赖注入**

```java
// 传统方式：UserService 直接依赖 MySQLUserRepository
public class UserService {
    private UserRepository userRepo = new MySQLUserRepository(); // 硬编码
}
```

DI 是指在组件之间传递依赖关系的过程中，将依赖关系在容器内部进行处理，这样就不必在应用程序代码中硬编码对象之间的依赖关系，实现了对象之间的解耦合。在 Spring 中，DI 是通过 XML 配置文件或注解的方式实现的。它提供了三种形式的依赖注入：构造函数注入、Setter 方法注入和接口注入。