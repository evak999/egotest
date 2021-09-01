<template>
  <div>
    <el-dialog title="合同内容" :visible.sync="dialogVisible" width="70%">
      <!-- <pdf src='./sxt.pdf' /> -->

      <!-- <p>{{ currentPage }} / {{ pageCount }}</p>
      <pdf
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
        :src="src"
      /> -->

      <!-- 遍历展示所有的 -->
      <!-- <pdf
        :src="src"
        v-for="i in numPages"
        :key="i"
        :page="i"
        style="display: inline-block; width: 25%"
      /> -->

      <el-button @click="printPdf">打印合同</el-button>

      <!-- page属性是当前展示第几页 -->
      <pdf :src="src" :page="currentPage"  ref="mypdf" />

      <!-- 分页器 -->
      <Pagination
        :pageSize="pageSize"
        :total="total"
        @changeCur="changeCur"
      />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 分页
import Pagination from "./../../components/Pagination.vue";
// 引入--当组件使用(三方组件)
import pdf from "vue-pdf";
var loadingTask = pdf.createLoadingTask("./sxt.pdf");

export default {
  components: {
    pdf,
    Pagination,
  },
  data() {
    return {
      dialogVisible: false,
      src: loadingTask, //pdf路径
      currentPage: 1, //当前
      pageCount: 0, //总
      numPages: undefined,
      pageSize: 1, //每页显示几个
      total: 10, //总页数
    };
  },
  methods: {
    // 分页器改变
    changeCur(val) {
      this.currentPage = val;
      // 可以加一个滚到上边的事件
      // 没生效？
      // document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    // 打印
    printPdf() {
      this.$refs.mypdf.print(); //自动调用电脑上的打印操作
      //打开界面后：1. 黑白色 2. 彩色 3. 页码  
      // 问题：查看打印的图的时候  pdf乱码--解决：按GitHub的方法改nodemudule的文件
    },
  },

  mounted() {
    // pdf获取
    this.src.promise.then((pdf) => {
      //   this.numPages = pdf.numPages;
      this.total = pdf.numPages;
    });
  },
};
</script>

<style>
</style>