<template>
    <div class="container">
        <h4>商品详情</h4>
        <hr>
        <div class="detailInfo">
            <div class="detailLeft">
                <img :src="`/public/images/${detailInfo.msrc}`">
            </div>
            <div class="detailRight">
                <ul>
                    <li>
                        通用名：{{ detailInfo.mname }}
                    </li>
                    <li>
                        类型：{{ detailInfo.mtype }}
                    </li>
                    <li>
                        生产厂家：{{ detailInfo.sname }}
                    </li>
                    <li>
                        功效：{{ detailInfo.minfo }}
                    </li>
                    <li>
                        单价：<span style="font-size: 26px; color: #ff6637; font-weight: 800;">&yen;{{
                            detailInfo.mprice }}</span>
                    </li>
                    <li>
                        数量：<el-input-number v-model="num" :min="1" :max="10" />
                    </li>
                </ul>
                <el-button :disabled="uid == undefined" type="primary" @click="singleBuy(id)">立即购买</el-button>
                <el-button :disabled="uid == undefined" :icon="ShoppingTrolley" @click="addCart(id)">加入购物车</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from "element-plus";
import { useRoute } from 'vue-router'
import { detailByIdApi } from '@/apis/detailById';
import { ShoppingTrolley } from '@element-plus/icons-vue' //引入element图标
import { addCartApi } from '@/apis/addCart';
import { singleBuyApi } from '@/apis/singleBuy';

const num = ref(1)
const route = useRoute()
const id = route.params.id //路由传参的药品id
const uid = JSON.parse(localStorage.getItem('userInfo') as string)?.id

const detailInfo: any = ref({})
//根据药品id查询药品信息
async function getDetailById() {
    let res = await detailByIdApi(id)
    detailInfo.value = res.data.data
}
//加入购物车
async function addCart(id: any) {
    const param = {
        uid: uid,
        mid: Number(id),
        num: num.value
    }
    const res = await addCartApi(param)
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
}
//单个购买
async function singleBuy(id: any) {
    const param = {
        uid: uid,
        mid: Number(id),
        num: num.value
    }
    const res = await singleBuyApi(param)
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
}

onMounted(() => {
    getDetailById()
})
</script>

<style scoped>
.container {
    width: 980px;
    height: 600px;
    margin: 0px auto;
}

h4 {
    font-size: 16px;
    color: #ff6637;
    padding: 10px 0px;
}

.detailInfo {
    position: relative;
}

.detailLeft {
    float: left;
    width: 380px;
    height: 380px;
    margin-top: 20px;

    img {
        width: 380px;
        height: 380px;
        border: 1px solid #d1d1d1;
    }
}

.detailRight {
    float: right;
    width: 580px;
    height: 380px;
    margin-top: 20px;
    margin-left: 20px;
}

li {
    font-size: 16px;
    margin-bottom: 20px;
}

.el-button {
    margin-top: 40px;
}
</style>