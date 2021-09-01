<template>
  <div id="main"></div>
</template>

<script>
import E from "wangeditor";

export default {
  data() {
    return {
      editor: "",
    };
  },
  mounted() {
    //操作dom的生命周期
    this.editor = new E("#main");
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      //   "indent",
      //   "lineHeight",
      "foreColor",
      "backColor",
      "link",
      "list",
      //   "todo",
      "justify",
      "quote",
      "emoticon",
      "image",
      "video",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo",
    ];
    // 配置 onchange 回调函数
    this.editor.config.onchange = (newHtml) => {
       console.log("change 之后最新的 html", newHtml);
       //传递输入的内容
       this.$emit("getWangData", newHtml);
    };
    // 配置触发 onchange 的时间频率，默认为 200ms
    this.editor.config.onchangeTimeout = 500; // 修改为 500ms
    
    // 先配置再创建不然不生效
    this.editor.create();
  },
};
</script>

<style>
</style>