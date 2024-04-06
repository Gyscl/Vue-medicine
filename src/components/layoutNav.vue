<template>
  <div class="layoutNav">
    <div class="nav_container">
      <span class="navLeft" v-if="loginState">
        <li>
          <router-link to="" @click="logOut">退出登录</router-link>
        </li>
      </span>
      <span class="navLeft" v-else>
        <li>
          <router-link to="/login">请登录</router-link>
        </li>
        <li>
          <router-link to="/register">注册</router-link>
        </li>
      </span>
      <span class="navRight">
        <li>
          <router-link to="/myOwn"><i class="iconfont icon-shouye"></i>我的</router-link>
        </li>
        <li>
          <router-link to="/messageBoard"><i class="iconfont icon-liuyan"></i>留言板</router-link>
        </li>
        <li>
          <router-link to="/orderList"><i class="iconfont icon-dingdan"></i>我的订单</router-link>
        </li>
        <li>
          <router-link to="/cartList"><i class="iconfont icon-gouwuche"></i> 购物车</router-link>
        </li>
        <li>
          <router-link to="/backend"><i class="iconfont icon-houtaiguanli"></i> 后台管理</router-link>
        </li>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { RouterLink ,useRouter} from "vue-router";
import { ref } from 'vue'

const router=useRouter()
//获取登录状态
let isAuth = JSON.parse(localStorage.getItem('isAuth') as string) 
let loginState=ref(isAuth)
//退出登录逻辑
function logOut(){
  localStorage.removeItem('isAuth')
  localStorage.removeItem('userInfo')
  router.push({
    name:'login'
  })
  ElMessage({
    message: '操作成功！',
    type: "success",
  });
}


</script>

<style scoped>
a {
  color: gray;
}

a:hover {
  color: #fff;
}

.layoutNav {
  height: 36px;
  background-color: #333333;
}

.nav_container {
  width: 980px;
  margin: 0px auto;

  .navLeft {
    height: 36px;
    float: left;
    margin: 0px -14px;
  }

  .navRight {
    height: 36px;
    float: right;
    margin: 0px -14px;
  }
}

li {
  display: inline-block;
  padding: 0px 15px;
  line-height: 36px;
}
</style>
