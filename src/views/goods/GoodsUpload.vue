<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="serverUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :on-success="uploadSuccess"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
import base from "./../../api/base";
export default {
  data() {
    return {
      serverUrl: base.baseUrl + base.upload, //要上传到的服务器地址
      fileList: [], //上传的图片，数组对象，name，url
    };
  },
  methods: {
    // 上传到服务器
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 上传成功
    uploadSuccess(response, file, fileList) {
      this.$message.success("图片上传成功");
      console.log(response, file, fileList);
      // response里的name是自己传时候图片的名，但是存到服务器他会自己生成名字，response里的url\\后边才是服务器生成的图片名字（服务器里存的是这个名字，得用这个获取）  截取一下
      let imgUrl = base.baseUrl + "/" + response.url.slice(7);
      console.log(imgUrl);
      this.$emit('showImg',imgUrl)
    },
  },
};
</script>

<style>
</style>