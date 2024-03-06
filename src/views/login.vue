<template>
  <div class="header">
    <span class="logo"></span>
    <span class="title">药店销售系统</span>
  </div>
  <div class="log_container">
    <div class="form">
      <h3>账户登录</h3>
      <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="100px">
        <el-form-item label="账户" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password @keyup.enter="login" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login(ruleFormRef)">登录</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <div class="footer">版权所有 ©2024. All rights reserved.</div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { Md5 } from "ts-md5";
import { loginApi } from "@/apis/login";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { type RuleForm } from "@/types/index";
import type { FormInstance, FormRules } from "element-plus";
import autofit from "autofit.js"; //引入自适应大屏插件autofit

onMounted(() => {
  autofit.init({
    dh: 1080,
    dw: 1920,
    el: "#app",
    resize: true
  },
    false)
})
onBeforeUnmount(() => {
  autofit.off()
})

const router = useRouter();

const ruleFormRef = ref<FormInstance>();
const form = reactive<RuleForm>({
  username: "",
  password: "",
});
//表单校验规则
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 10, message: "长度限制在3-10", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

function login(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        form.password = Md5.hashAsciiStr(form.password); //md5加密密码
        const res = await loginApi(form);
        if (res.data.data.code == 200) {
          let boolValue: boolean = true
          let boolString: string = String(boolValue)
          localStorage.setItem("isAuth", boolString)
          localStorage.setItem("userInfo", JSON.stringify(res.data.data.userinfo))
          router.push({
            name: 'home'
          })
          ElMessage({
            message: res.data.data.msg,
            type: "success",
          });
        } else {
          ElMessage({
            message: res.data.data.msg,
            type: "warning",
          });
        }
      } catch (error: any) {
        ElMessage({
          message: error,
          type: "warning",
        });
      }
    }
  })
}

const register = () => {
  router.replace("./register");
};
</script>

<style scoped>
a {
  color: #cacaca;
  font-size: 14px;
  padding-left: 50px;
}

.header {
  position: relative;
  /* height: 110px; */
  height: 10%;
  background-color: #fff;

  .logo {
    position: absolute;
    left: 150px;
    display: inline-block;
    width: 120px;
    height: 100px;
    background: url("public/images/logo.png") no-repeat;
    background-size: cover;
  }

  .title {
    position: absolute;
    left: 260px;
    top: 10px;
    color: rosybrown;
    line-height: 110px;
    text-align: center;
    font-size: 36px;
    font-weight: 600;
    font-style: italic;
  }
}

.log_container {
  position: relative;
  height: 80%;
  background: url("public/images/bg2.jpg") no-repeat;
  /* background-size: contain; */
  background-size: 1250px auto;
  background-attachment: fixed;
  border: 1px #cacaca solid;
  border-radius: 10px;
}

.form {
  position: absolute;
  top: 200px;
  right: 250px;
  width: 400px;
  height: 300px;
  background-color: #fff;
  border: 1px #cacaca solid;
  border-radius: 20px;

  h3 {
    height: 50px;
    line-height: 50px;
    text-align: center;
    align-items: center;
    border-bottom: #cacaca 1px solid;
  }

  .el-form {
    margin-top: 20px;
  }

  .el-form-item {
    margin: 20px auto;
  }

  .el-input {
    width: 250px;
  }

  .el-button {
    width: 100px;
  }
}

.footer {
  height: 10%;
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-top: 20px;
}
</style>
