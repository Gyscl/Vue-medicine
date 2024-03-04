<template>
  <div class="res_container">
    <div class="form">
      <div class="header">
        <span class="title">账号注册</span>
        <span class="login"
          >已有账号,<RouterLink to="/login">去登录></RouterLink>
        </span>
      </div>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleFormRef"
        label-width="100px"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="comfirm">
          <el-input v-model="form.comfirm" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";
import { type RuleForm } from "@/types/index";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { Md5 } from "ts-md5";
import { addUserApi } from "@/apis/register";
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


const ruleFormRef = ref<FormInstance>();
const form = reactive<RuleForm>({
  username: "",
  password: "",
  comfirm: "",
});

//设置自定义校验规则，用于校验【确认密码】
const validatePass = (rule: any, value: any, callback: any) => {
  if (value != form.password) {
    callback(new Error("两次输入不一致!"));
  } else {
    callback();
  }
};
//表单校验规则
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 10, message: "长度限制在3-10", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  comfirm: [
    { required: true, message: "请确认密码", trigger: "blur" },
    { validator: validatePass, trigger: "blur" },
  ],
});

async function addUser() {
  try {
    form.password = Md5.hashAsciiStr(form.password);
    const res = await addUserApi(form);
    if (res.data.data.code == 200) {
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
</script>

<style scoped>
.res_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(to right, #a8edea 0%, #fed6e3 100%);
}
.form {
  width: 600px;
  height: 500px;
  background-color: #fff;
  border: 1px #cacaca solid;
  border-radius: 10px;
  .header {
    position: relative;
    height: 50px;
    border-bottom: 1px #cacaca solid;
    .title {
      position: absolute;
      left: 10px;
      line-height: 50px;
    }
    .login {
      position: absolute;
      right: 10px;
      line-height: 50px;
    }
  }
  .el-form-item {
    margin: 30px auto;
  }
  .el-input {
    width: 450px;
  }
  .el-button {
    width: 400px;
  }
}
</style>
