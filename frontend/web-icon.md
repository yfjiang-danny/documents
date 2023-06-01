---
author: yfjiang.danny
date: 2023-05-30
title: Web Icon Organization
---

## Web Icon Organization

### Tech

1. Web font
2. SVG

   1. SVG as img: `<img src="xxx.svg" />`
   2. SVG as sprite: Iconfont

      ```css
      @font-face {
        font-family: "iconfont"; /* Project id 4097297 */
        src: url("iconfont.woff2?t=1685520020060") format("woff2"), url("iconfont.woff?t=1685520020060")
            format("woff"),
          url("iconfont.ttf?t=1685520020060") format("truetype");
      }

      .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .icon-shanghua:before {
        content: "\e62f";
      }

      .icon-fanhui:before {
        content: "\e630";
      }
      ```

      ```jsx
      <span class="icon iconfont icon-fanhui"></span>
      ```

   3. SVG as element: insert into dom directly or in react use `svg-inline-loader` to load as inline element: `import { ReactComponent as XXX} from 'xxx.svg'`, and use as component `<XXX />`.
   4. Convert to component with svgr. [github](https://github.com/gregberge/svgr/tree/main) [react-svgr.com](https://react-svgr.com/)

   ***

   **Web fonts vs SVG**

   1. svg is more flexible for edit while web fonts require specialized tool.
   2. svg more html while web fonts more css.

### The best practice

1. SVG In JS: svgr [ts-web-icon](https://github.com/yfjiang-danny/ts-web-icon.git)

### Reference

【[SVG 图标看我就够了](https://juejin.cn/post/6875901124931977229#heading-10)】
【[Complete guide to SVG sprites](https://medium.com/@hayavuk/complete-guide-to-svg-sprites-7e202e215d34)】
