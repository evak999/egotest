<template>
  <div class="box">
    <h2 class="title">用户中心</h2>
    <el-button @click="showPdf">查看合同</el-button>
    <userPDF ref="pdfRef" />
  </div>
</template>

<script>
import userPDF from "./userPDF.vue";
export default {
  components: {
    userPDF,
  },
  data() {
    return {};
  },
  methods: {
    showPdf() {
      // console.log(this.$refs.pdfRef);
      this.$refs.pdfRef.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  margin-left: 30px;
  margin-top: 20px;
  .title {
    font-size: 20px;
    margin-bottom: 20px;
  }
}
</style>