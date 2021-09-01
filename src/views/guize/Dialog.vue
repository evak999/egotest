<template>
  <div>
    <p>当前选择的商品： {{treeData.name}} </p>
    <el-button @click="addDomain">新增规格列表</el-button>
    <hr />
    <el-form
      :model="dynamicForm"
      ref="dynamicForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <!-- 第一层 -->
      <el-form-item
        v-for="(item, index) in dynamicForm.groups"
        :label="index+''"
        :key="index"
      >
        <div class="wai-box">
          <el-input v-model="item.title"></el-input>
          <el-button @click.prevent="addChildDomain(index)">添加子组</el-button>
          <el-button @click.prevent="removeDomain(item)">删除</el-button>
        </div>
        <!-- 第二层 -->
         <el-form-item
            v-for="(ele, n) in item.children"
            :label="n+''"
            :key="n"
         >
            <div class="wai-box">
                <el-input v-model="ele.title"></el-input>
                <el-button @click.prevent="removeChildDomain(index,n)">删除</el-button>
            </div>
        </el-form-item>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('dynamicForm')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  props: {
      treeData:{
          type:Object,
          defalut:{
              function() {
                  return {}          
              }
          }
      }
  },
  data() {
    return {
      dynamicForm: {
        groups: [],
      },
    };
  },
  methods: {
    //   提交
    submitForm(formName) {
      console.log('提交',this.treeData);
      let specsName = this.treeData.formName
      let itemCatId = this.treeData.cid
      let content = JSON.stringify(this.dynamicForm.groups) 
      this.$api.addParams({
          specsName,
          itemCatId,
          content
      }).then(res=>{
          console.log(res);
          if (res.status === 200) {
            this.$message.success('添加成功')
            // 关闭弹窗
            this.$emit('hasDone')
            // 清空表单
            this.dynamicForm.groups=[]
        }else {
            this.$message.error("添加失败");
          }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 删除
    removeDomain(item) {
      var index = this.dynamicForm.groups.indexOf(item);
      if (index !== -1) {
        this.dynamicForm.groups.splice(index, 1);
      }
    },
    // 添加新的第一层
    addDomain() {
      this.dynamicForm.groups.push({
        value: "",
        title: "",
        children: [],
      });
    },
    // 添加子组
    addChildDomain(i) {
        this.dynamicForm.groups[i].children.push({
            value:"",
            title:"",
        })
    },
    // 删除子组
    removeChildDomain(index,n){
       this.dynamicForm.groups[index].children.splice(n,1)
    }

  },
};
</script>

<style lang="scss" scoped>
.wai-box{
    display: flex;
}
</style>