# Grid
**Grid Container 全部属性**
* display
* grid-template-columns
* grid-template-rows
* grid-template-areas
* grid-template
* grid-column-gap
* grid-row-gap
* grid-gap
* align-items
* justify-items
* align-content
* grid-auto-columns
* grid-auto-rows
* grid
* grid-auto-flow
  
**Grid Items 全部属性**
* grid-column-start
* grid-column-end
* grid-row-start
* grid-row-end
* grid-column
* grid-row
* grid-area
* justify-self
* align-self
## 容器属性
```
  .container {
   display: grid | inline-grid | subgrid;
   }
```
```

    .container {
      display: grid;
      grid-template-columns: 100px 100px ;
      grid-template-rows: 100px 100px ;
    }

```
----
>有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用repeat()函数，简化重复的值。上面的代码用repeat() repeat()接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值。
```
grid-template-columns: repeat(2, 100px 20px);
```
----
>有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充
```
    .container {
      display: grid;
      grid-template-columns: repeat(auto-fill, 100px);
    }
```
----
>为了方便表示比例关系，网格布局提供了fr关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。
```
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-columns: 150px 1fr 2fr;
    }
```
----
>minmax()函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。auto关键字表示由浏览器自己决定长度。
```
.container{
    grid-template-columns: 1fr 1fr minmax(100px, 1fr);
    
    grid-template-columns: 100px auto 100px;

}
```
----
>grid-template-columns属性和grid-template-rows属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。
```
    .container {
      display: grid;
      grid-template-columns: [a1] 100px [a2] 100px ;
      grid-template-rows: [r1] 100px [r2] 100px;
    }
```
----
```
传统的十二网格布局
grid-template-columns: repeat(12, 1fr);
```
----
>grid-row-gap属性设置行与行的间隔（行间距），grid-column-gap属性设置列与列的间隔（列间距）

`grid-gap: <grid-row-gap> <grid-column-gap>;`
```
    .container {
      grid-row-gap: 20px;
      grid-column-gap: 20px;
    }
```
----
>网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。grid-template-areas属性用于定义区域。
```
grid-template-areas: 'a a a'
                     'b b b'
```
```
grid-template-areas: "header hader header"
                     "main main sidebar"
                     "footer footer footer";
```
如果某些区域不需要利用，则使用"点"（.）表示。
   ```
    grid-template-areas: 'a . .'
                         'd . f'
   ```
**注意，区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start，终止网格线自动命名为区域名-end。**

----
grid-auto-flow 属性
>划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行 .这个顺序由grid-auto-flow属性决定，默认值是row，即"先行后列"。也可以将它设成column，变成"先列后行"
```
demo
#container{
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-auto-flow: row;
}
.item-1 {
  background-color: #ef342a;
  grid-column-start: 1;
  grid-column-end: 4;  
}
```
>现在修改设置，设为row dense，表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。
```
demo
#container{
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-auto-flow: row dense;
}
.item-1 {
  background-color: #ef342a;
  grid-column-start: 1;
  grid-column-end: 4;  
}
```
>justify-items属性设置单元格内容的水平位置（左中右），align-items属性设置单元格内容的垂直位置（上中下）。
```
    .container {
      justify-items: start | end | center | stretch;
      align-items: start | end | center | stretch;
    }
```
**`place-items: <align-items> <justify-items>`**
----
>justify-content属性是整个内容区域在容器里面的水平位置（左中右），align-content属性是整个内容区域的垂直位置（上中下）。
```
    .container {
      justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
      align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
    }
```

**`place-content: <align-content> justify-content>`**

----
>grid-auto-columns属性和grid-auto-rows属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与grid-template-columns和grid-template-rows完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。
```
#container{
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-auto-rows: 50px; 
}
.item-1 {
  background-color: #d0e4a9;
  grid-row-start: 4;
  grid-column-start: 2;
}
 .item-2 {
  background-color: #4dc7ec;
  grid-row-start: 4;
  grid-column-start: 2;
}
```
# 项目属性
* grid-column-start属性：左边框所在* 的垂直网格线
* grid-column-end属性：右边框所在的垂直网格线
* grid-row-start属性：上边框所在的水平网格线
* grid-row-end属性：下边框所在的水平网格线

```
    .item-1 {
      grid-column-start: 1;
      grid-column-end: 5;
      grid-row-start: 2;
      grid-row-end: 4;
    }
```
>这四个属性的值，除了指定为第几个网格线，还可以指定为网格线的名字
```
    .item-1 {
      grid-column-start: header-start;
      grid-column-end: header-end;
    }
```
>这四个属性的值还可以使用span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。
```
    .item-1 {
      grid-column-start: span 2;
    }
```
>grid-column属性是grid-column-start和grid-column-end的合并简写形式，grid-row属性是grid-row-start属性和grid-row-end的合并简写形式。
```
.item-1 {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}
```
```
.item-1 {
  background: #b03532;
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}
```
>grid-area属性指定项目放在哪一个区域
```
   .item-1 {
      grid-area: a;
    }
```
----
>justify-self属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目。

align-self属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目。
```
    .item {
      justify-self: start | end | center | stretch;
      align-self: start | end | center | stretch;
    }
    
```
**`place-self: <align-self> <justify-self>;`**

