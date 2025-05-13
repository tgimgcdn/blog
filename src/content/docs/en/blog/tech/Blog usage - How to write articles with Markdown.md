---
title: "How to Write Articles with Markdown"
excerpt: "This article explains how Markdown code is rendered in `.md` files."
giscus: true
date: 2025-05-01
lastUpdated: 2025-05-12
thumbnail: https://cdn.canjie.org/AgAD5xcAAgf-GFU.webp
tags:
  - "Markdown"
  - "md"
  - "mdx"
  - "Rendering"
---

## Bold Text

```md
This is a **bold text** example
```

This is a **bold text** example

## Italic Text

```md
This is an _italic text_ example
```

This is an _italic text_ example

## Strikethrough Text

```md
This is a ~~strikethrough text~~ example
```

This is a ~~strikethrough text~~ example

## Inline Code

```md
`php` is the best programming language in the universe
```

`php` is the best programming language in the universe

## Blockquote

```md
> This is a blockquote
```

> This is a blockquote

## Ordered List

Web development process:
```md
1. Requirement Analysis  
2. Architecture Design  
3. UI Prototype Design  
4. Frontend Development  
5. Backend Development  
6. API Integration  
7. Functional Testing  
8. Deployment  
9. Monitoring & Maintenance
```
Web development process:
1. Requirement Analysis  
2. Architecture Design  
3. UI Prototype Design  
4. Frontend Development  
5. Backend Development  
6. API Integration  
7. Functional Testing  
8. Deployment  
9. Monitoring & Maintenance

## Unordered List

```md
- Requirement Analysis  
- Architecture Design  
- UI Prototype Design  
- Frontend Development  
- Backend Development  
- API Integration  
- Functional Testing  
- Deployment  
- Monitoring & Maintenance
```

- Requirement Analysis  
- Architecture Design  
- UI Prototype Design  
- Frontend Development  
- Backend Development  
- API Integration  
- Functional Testing  
- Deployment  
- Monitoring & Maintenance

## Hyperlink

```md
[Google is the best search engine in the world](https://www.google.com)
```

[Google is the best search engine in the world](https://www.google.com)

## 3x3 Table

```md
| Step One    | Step Two    | Step Three    |
|-------------|-------------|---------------|
| Requirements| Architecture| UI Design     |
| Frontend    | Backend     | API Integration |
| Testing     | Deployment  | Maintenance   |
```

| Step One    | Step Two    | Step Three    |
|-------------|-------------|---------------|
| Requirements| Architecture| UI Design     |
| Frontend    | Backend     | API Integration |
| Testing     | Deployment  | Maintenance   |

## Code Block

```js
const table = [
  ["Requirements", "Architecture", "UI Design"],
  ["Frontend", "Backend", "API Integration"],
  ["Testing", "Deployment", "Maintenance"]
];

// Output the table
table.forEach(row => {
  console.log(row.join(" | "));
});
```

## Header Tags

```md
<!-- Header tags, the page title is h1, so h1 should be avoided inside the article -->
## H2
### H3
#### H4
##### H5
```

<!-- Header tags, the page title is h1, so h1 should be avoided inside the article -->

## H2

### H3

#### H4

##### H5

## Video Playback

### iframe

- *Heaven Sword and Dragon Slaying Saber* 16:9
<div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe src="https://cdn.0163.eu.org/player?id=6"
    frameborder="0"
    allowfullscreen
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
  </iframe>
</div>
  
- *After Becoming a Tyrant I Read Officials' Minds* 9:16
<iframe src="https://cdn.0163.eu.org/player?id=527" class="responsive-iframe" frameborder="0" allowfullscreen></iframe>

<style>
.responsive-iframe {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: auto;
  aspect-ratio: 9 / 16;
}

@media (min-width: 768px) {
  .responsive-iframe {
    width: 300px;
  }
}

@media (min-width: 1024px) {
  .responsive-iframe {
    width: 400px;
  }
}
</style>

### Direct Embedding

- *Fair-skinned Beauty with Long Legs*

<video controls class="responsive-video">
  <source src="https://cdn.0163.eu.org/%E8%82%A4%E7%99%BD%E8%B2%8C%E7%BE%8E%E5%A4%A7%E9%95%BF%E8%85%BF.mp4" type="video/mp4">
</video>

<style>
.responsive-video {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
}

@media (min-width: 768px) {
  .responsive-video {
    max-width: 300px;
  }
}
</style>

- *A Mortal's Journey to Immortality: Immortal World - Episode 1*

<video controls style="display: block; margin: 0 auto; max-width: 100%; height: auto;">
  <source src="https://cdn.0163.eu.org/%E5%87%A1%E4%BA%BA%E4%BF%AE%E4%BB%99%E4%BC%A0%E4%BB%99%E7%95%8C%E7%AF%87-%E7%AC%AC1%E9%9B%86_%E9%A3%9E%E5%8D%87%E4%BB%99%E7%95%8C.ogg" type="video/ogg">
</video>
