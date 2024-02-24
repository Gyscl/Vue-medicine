<template>
    <div class="cartContainer">
        <table>
            <thead>
                <tr>
                    <th>
                        <el-checkbox @change="allCheck" />
                    </th>
                    <th width="436">商品信息</th>
                    <th width="136">单价</th>
                    <th width="136">数量</th>
                    <th width="136">小计</th>
                    <th width="136">操作</th>
                </tr>
            </thead>
            <tbody>
                <div v-if="cart.length==0" class="empty">
                    <el-empty :image-size="200" description="购物车列表为空"/>
                </div>
                <tr v-else v-for="c in cart" :key="c.cid">
                    <td>
                        <el-checkbox @change="singleCheck" />
                    </td>
                    <td width="436">
                        <div>
                            <RouterLink :to="`/detail/:${c.mid}`"><img width="100" :src="`/public/images/${c.msrc}`"></RouterLink>
                            <div>
                                <p>{{ c.mname }}</p>
                            </div>
                        </div>
                    </td>
                    <td width="136">
                        <p>&yen; {{ c.mprice }}</p>
                    </td>
                    <td width="136">
                        <p>
                            <el-input-number v-model="c.cnum" :min="1" :max="10" />
                        </p>
                    </td>
                    <td width="136">
                        <p>
                            &yen; {{ c.cnum * c.mprice }}
                        </p>
                    </td>
                    <td width="136">
                        <p>
                            <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消">
                                <template #reference>
                                    <a href="javascript:;">删除</a>
                                </template>
                            </el-popconfirm>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="example-pagination-block">
            <el-pagination layout="prev, pager, next" :default-page-size="5" :total="cart.length" />
        </div>
        <!-- <div class="cart-footer">
            <p>总计：&yen; {{ cart.reduce((total, c) => total + c.cnum * c.mprice, 0) }}</p>
            <el-button type="primary" @click="submitOrder">提交订单</el-button>
        </div> -->
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { userCartApi } from '@/apis/userCart'

let cart = ref([])
//从localStorage中获取用户id
let uid = JSON.parse(localStorage.getItem('userInfo')).id

//用户购物车药品Api
const userCart = async () => {
    let res = await userCartApi(uid)
    cart.value = res.data.data.res
}
//获取用户购物车信息
onMounted(() => {
    userCart()
})
//全选函数
function allCheck() {
}
//单选函数
function singleCheck() {
}

</script>

<style scoped>
.cartContainer {
    width: 980px;
    margin: 0px auto;
}

table {
    border-spacing: 0;
    border-collapse: collapse;
    line-height: 24px;

    th,
    td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
    }

    th {
        font-style: 16px;
        font-weight: normal;
        line-height: 50px;
    }

    td {
        height: 80px;
        text-align: center;
    }
}
.empty{
    position: relative;
    left: 450px;
}
.example-pagination-block {
    display: flex;
    margin: 15px auto;
}
</style>