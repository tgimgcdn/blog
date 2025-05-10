---
title: "测试Markdown之md版"
excerpt: "本文将对Markdown代码在md文件里面的渲染进行测试。"
giscus: true
date: 2024-05-01
lastUpdated: 2025-04-30
category: tech
thumbnail: https://cdn.canjie.org/AgAD4BgAAmga2VQ.webp
tags:
  - "Markdown"
  - "md"
  - "测试"
  - "渲染"
---

## 文本加粗

```md
那个女孩子 **气喘吁吁** 的打电话和你说：我在跑步
```

那个女孩子 **气喘吁吁** 的打电话和你说：我在跑步

## 文本倾斜

```md
你问她为什么有 _啪啪啪_ 的声音，她和你说：我是穿拖鞋跑步的
```

你问她为什么有 _啪啪啪_ 的声音，她和你说：我是穿拖鞋跑步的

## 文本删除

```md
你说，好的那你继续 ~~跑步~~ 吧
```

你说，好的那你继续 ~~跑步~~ 吧

## 行内代码

```md
`php` 是全宇宙最好的语言
```

`php` 是全宇宙最好的语言

## 引用

```md
> 这是一个引用
```

> 这是一个引用

## 有序列表

```md
牛肉的的营养如下：

1. 能量 (kcal)
2. 脂类 (fat)
3. 蛋白质 (protein)
4. 碳水化合物 (carbohydrate)
```

牛肉的的营养如下：

1. 能量 (kcal)
2. 脂类 (fat)
3. 蛋白质 (protein)
4. 碳水化合物 (carbohydrate)

## 无序列表

```md
- 一个女朋友
- 二个女朋友
- 三个女朋友
- ...
- N 个女朋友
```

- 一个女朋友
- 二个女朋友
- 三个女朋友
- ...
- N 个女朋友

## 超链接

```md
[Google是全世界最好的搜索引擎](https://www.google.com)
```

[Google是全世界最好的搜索引擎](https://www.google.com)

## 3 行 3 列的表格

```md
| 表头 | 表头 | 表头 |
| :--: | :--: | :--: |
| 鸡头 | 鸭头 | 狗头 |
| 鸡头 | 鸭头 | 狗头 |
| 鸡头 | 鸭头 | 狗头 |
```

| 表头 | 表头 | 表头 |
| :--: | :--: | :--: |
| 鸡头 | 鸭头 | 狗头 |
| 鸡头 | 鸭头 | 狗头 |
| 鸡头 | 鸭头 | 狗头 |

## 代码块

```js
const obj = {
	name: "hi",
	age: 18
};
// 判断某个属性是否在对象里
console.log("name" in obj);
// 删除对象某个属性
console.log(delete obj.name);
// 将对象的属性名提取成数组
console.log(Object.keys(obj));
```

## H 标签

```md
<!-- H标签，页面标题即h1，不建议文章内使用h1标签 -->
## H2
### H3
#### H4
##### H5
```

<!-- H标签，页面标题即h1，不建议文章内使用h1标签 -->

## H2

### H3

#### H4

##### H5

## 视频播放

### iframe

- 倚天屠龙记 16:9
<div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe src="https://cdn3.0163.eu.org/player?id=129"
    frameborder="0"
    allowfullscreen
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
  </iframe>
</div>
  
- 成为昏君后我读心百官 9:16
<div style="position: relative; width: 100%; padding-bottom: 177.78%; height: 0; overflow: hidden;">
  <iframe src="https://cdn3.0163.eu.org/player?id=1248"
    frameborder="0"
    allowfullscreen
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
  </iframe>
</div>


### 直接引用

- Mp4 고양이귀하고%20뚜뚜뚜뚜%20아웃송%20이예빈%20치어리더%20Lee%20Yebin%20Cheerleader
<video controls>
  <source src="https://cdn3.0163.eu.org/958?%EA%B3%A0%EC%96%91%EC%9D%B4%EA%B7%80%ED%95%98%EA%B3%A0%20%EB%9A%9C%EB%9A%9C%EB%9A%9C%EB%9A%9C%20%EC%95%84%EC%9B%83%EC%86%A1%20%EC%9D%B4%EC%98%88%EB%B9%88%20%EC%B9%98%EC%96%B4%EB%A6%AC%EB%8D%94%20Lee%20Yebin%20Cheerleader.mp4" type="video/mp4">
</video>

完全居中-用块级包裹 + text-align center
<div style="text-align: center;">
  <video controls style="max-width: 100%; height: auto;">
    <source src="https://cdn3.0163.eu.org/958?%EA%B3%A0%EC%96%91%EC%9D%B4%EA%B7%80%ED%95%98%EA%B3%A0%20%EB%9A%9C%EB%9A%9C%EB%9A%9C%EB%9A%9C%20%EC%95%84%EC%9B%83%EC%86%A1%20%EC%9D%B4%EC%98%88%EB%B9%88%20%EC%B9%98%EC%96%B4%EB%A6%AC%EB%8D%94%20Lee%20Yebin%20Cheerleader.mp4" type="video/mp4">
  </video>
</div>
  
- Ogg-第1集_飞升仙界-桑梓讲故事-216451217-100
<video controls>
  <source src="https://cdn3.0163.eu.org/1251?%E7%AC%AC1%E9%9B%86_%E9%A3%9E%E5%8D%87%E4%BB%99%E7%95%8C-%E6%A1%91%E6%A2%93%E8%AE%B2%E6%95%85%E4%BA%8B-216451217-100.ogg" type="video/ogg">
</video>

完全居中-强制块级 + 居中
<video controls style="display: block; margin: 0 auto; max-width: 100%; height: auto;">
  <source src="https://cdn3.0163.eu.org/1251?%E7%AC%AC1%E9%9B%86_%E9%A3%9E%E5%8D%87%E4%BB%99%E7%95%8C-%E6%A1%91%E6%A2%93%E8%AE%B2%E6%95%85%E4%BA%8B-216451217-100.ogg" type="video/ogg">
</video>

