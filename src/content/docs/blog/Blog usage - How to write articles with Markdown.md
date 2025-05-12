---
title: "如何使用Markdown写文章"
excerpt: "本文将对Markdown代码在mdx文件里面的渲染进行讲解。"
giscus: true
date: 2024-05-01
lastUpdated: 2025-04-30
thumbnail: https://cdn.canjie.org/AgAD4BgAAmga2VQ.webp
tags:
  - "Markdown"
  - "md"
  - "mdx"
  - "渲染"
---

## 文本加粗

```md
这是一个 **文本加粗** 的展示
```

这是一个 **文本加粗** 的展示

## 文本倾斜

```md
这是一个 _文本倾斜_ 的展示
```

这是一个 _文本倾斜_ 的展示

## 文本删除

```md
这是一个 ~~文本删除~~ 的展示
```

这是一个 ~~文本删除~~ 的展示

## 行内代码

```md
`php` 是全宇宙最好的编程语言
```

`php` 是全宇宙最好的编程语言

## 引用

```md
> 这是一个引用
```

> 这是一个引用

## 有序列表

网页开发流程：
```md
1. 需求分析  
2. 架构设计  
3. UI 原型设计  
4. 前端开发  
5. 后端开发  
6. 接口联调  
7. 功能测试  
8. 上线部署  
9. 监控与维护
```
网页开发流程：
1. 需求分析  
2. 架构设计  
3. UI 原型设计  
4. 前端开发  
5. 后端开发  
6. 接口联调  
7. 功能测试  
8. 上线部署  
9. 监控与维护

## 无序列表

```md
- 需求分析  
- 架构设计  
- UI 原型设计  
- 前端开发  
- 后端开发  
- 接口联调  
- 功能测试  
- 上线部署  
- 监控与维护
```

- 需求分析  
- 架构设计  
- UI 原型设计  
- 前端开发  
- 后端开发  
- 接口联调  
- 功能测试  
- 上线部署  
- 监控与维护

## 超链接

```md
[Google是全世界最好的搜索引擎](https://www.google.com)
```

[Google是全世界最好的搜索引擎](https://www.google.com)

## 3 行 3 列的表格

```md
| 步骤一     | 步骤二     | 步骤三     |
|------------|------------|------------|
| 需求分析   | 架构设计   | UI 原型设计 |
| 前端开发   | 后端开发   | 接口联调   |
| 功能测试   | 上线部署   | 监控与维护 |
```

| 步骤一     | 步骤二     | 步骤三     |
|------------|------------|------------|
| 需求分析   | 架构设计   | UI 原型设计 |
| 前端开发   | 后端开发   | 接口联调   |
| 功能测试   | 上线部署   | 监控与维护 |

## 代码块

```js
const table = [
  ["需求分析", "架构设计", "UI 原型设计"],
  ["前端开发", "后端开发", "接口联调"],
  ["功能测试", "上线部署", "监控与维护"]
];

// 输出表格
table.forEach(row => {
  console.log(row.join(" | "));
});
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
<iframe src="https://cdn3.0163.eu.org/player?id=1248" class="responsive-iframe" frameborder="0" allowfullscreen></iframe>

<style>
.responsive-iframe {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: auto;
  aspect-ratio: 9 / 16; /* 保证 9:16 比例 */
}

@media (min-width: 768px) {
  .responsive-iframe {
    width: 300px; /* 电脑上宽度限制为 300px */
  }
}

@media (min-width: 1024px) {
  .responsive-iframe {
    width: 400px; /* 大屏电脑限制为 400px */
  }
}
</style>


### 直接引用

- Mp4 고양이귀하고%20뚜뚜뚜뚜%20아웃송%20이예빈%20치어리더%20Lee%20Yebin%20Cheerleader

<video controls class="responsive-video">
  <source src="https://cdn3.0163.eu.org/958?%EA%B3%A0%EC%96%91%EC%9D%B4%EA%B7%80%ED%95%98%EA%B3%A0%20%EB%9A%9C%EB%9A%9C%EB%9A%9C%EB%9A%9C%20%EC%95%84%EC%9B%83%EC%86%A1%20%EC%9D%B4%EC%98%88%EB%B9%88%20%EC%B9%98%EC%96%B4%EB%A6%AC%EB%8D%94%20Lee%20Yebin%20Cheerleader.mp4" type="video/mp4">
</video>

<style>
.responsive-video {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
}

@media (min-width: 768px) {
  /* 电脑端（大于768px）缩小宽度 */
  .responsive-video {
    max-width: 300px; /* 你可以调成400px或500px看效果 */
  }
}
</style>


  
- Ogg-第1集_飞升仙界-桑梓讲故事-216451217-100

<video controls style="display: block; margin: 0 auto; max-width: 100%; height: auto;">
  <source src="https://cdn3.0163.eu.org/1251?%E7%AC%AC1%E9%9B%86_%E9%A3%9E%E5%8D%87%E4%BB%99%E7%95%8C-%E6%A1%91%E6%A2%93%E8%AE%B2%E6%95%85%E4%BA%8B-216451217-100.ogg" type="video/ogg">
</video>

