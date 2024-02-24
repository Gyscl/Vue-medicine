<template>
    <div>
        <h3>个人信息</h3>
        <ul>
            <li>昵称：{{ userinfo.name }}</li>
            <li>收货地址：{{ userinfo.address }}</li>
            <li>是否为管理员：{{ userinfo.isroot }}</li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import {ref} from 'vue'
    const userinfo = ref({})
    userinfo.value=JSON.parse(localStorage.getItem('userInfo'))
</script>

<style scoped>
    div{
        width: 980px;
        margin: 0px auto;
    }
    h3{
        margin-bottom: 50px;
    }
    ul{
        list-style: none;
        padding: 0px;
    }
    li{
        margin-bottom: 15px;
    }
</style>