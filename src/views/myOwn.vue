<template>
    <div>
        <table border="1" cellspacing="0">
            <thead>
                <tr>
                    <th colspan="2">个人信息</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>昵称：</td>
                    <td>{{ userinfo.name }}</td>
                </tr>
                <tr>
                    <td>地址：</td>
                    <td>{{ userinfo.address }}</td>
                </tr>
                <tr>
                    <td>身份：</td>
                    <td>{{ userinfo.isroot ? '管理员' : '普通用户' }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const userinfo: any = ref({})
userinfo.value = JSON.parse(localStorage.getItem('userInfo') as string)
</script>

<style scoped>
div {
    width: 980px;
    height: 370px;
    margin: 0px auto;
}

table {
    table-layout: fixed;
    border-collapse: collapse;
    width: 600px;
    margin: 10px auto;
    border-radius: 50px;

    th {
        height: 80px;
        font-size: 26px;
    }

    td {
        height: 60px;
        font-size: 20px;
        text-align: center;
    }
}
</style>