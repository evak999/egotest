<template>
  <div class="tab-box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录" name="login">
        <div>
          <el-form
            :model="loginInfo"
            status-icon
            :rules="rules"
            ref="loginInfo"
            label-width="60px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="user">
              <el-input v-model="loginInfo.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="loginInfo.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('loginInfo')"
                >提交</el-button
              >
              <el-button @click="resetForm('loginInfo')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <el-tab-pane label="注册" name="register">
        <div>注册</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 引解析token的方法
import jwt from 'jwt-decode'
import {mapMutations} from 'vuex'
export default {
  data() {
    var validate1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("输入内容不能为空"));
      } else {
        callback();
      }
    };
    var validate2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("输入内容不能为空"));
      } else {
        callback();
      }
    };
    return {
      activeName: "login",
      loginInfo: {
        user: "",
        pass: "",
      },
      rules: {
        user: [{ validator: validate1, trigger: "blur" }],
        pass: [{ validator: validate2, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations('LoginModule',['setUser']),
    // 切换选项卡
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验通过
          console.log("输入的值====", this.loginInfo);
          // 请求服务器
          this.$api.getLogin({
            username: this.loginInfo.user,
            password: this.loginInfo.pass,
          }).then(res=>{
            console.log(res);
            if(res.status==200){         
              let token=res.data;          
              let obj={
                token,
                user:jwt(token).username    // 解析token字段
              }
              // 存储vuex
              this.setUser(obj)
              // 存储本地
              localStorage.setItem('userinfo',JSON.stringify(obj))
              // 跳首页
              this.$router.push('/')
            }else{
              console.log('登陆失败');
              this.$message.error('登录失败，账号或密码错误');
            }
          })

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.tab-box {
  width: 500px;
  padding: 30px;
  margin: 100px auto;
  border: 1px solid rgb(40, 66, 41);
  height: 260px;
}
</style>