<template>
    <div class="cartContainer">
        <table>
            <thead>
                <tr>
                    <th>
                        <el-checkbox v-model="allChecked" @change="allCheck" />
                    </th>
                    <th width="436">商品信息</th>
                    <th width="136">单价</th>
                    <th width="136">数量</th>
                    <th width="136">小计</th>
                    <th width="136">操作</th>
                </tr>
            </thead>
            <tbody>
                <div v-if="cart.length == 0" class="empty">
                    <el-empty :image-size="200" description="购物车列表为空" />
                </div>
                <tr v-else v-for="c in cart" :key="c.cid">
                    <td>
                        <el-checkbox @change="singleCheck" v-model="c.isChecked" />
                    </td>
                    <td width="436">
                        <div>
                            <RouterLink :to="`/detail/${c.mid}`"><img width="100" :src="`/public/images/${c.msrc}`">
                            </RouterLink>
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
                            <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                                @confirm="deleteCart(c)">
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
            <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
        </div>
        <div class="cart-footer">
            <p>总计：&yen; {{ totalPrice }}</p>
            <el-button color="#ff6537" @click="submitOrder">提交订单</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { userCartApi } from '@/apis/userCart'
import { singleBuyApi } from '@/apis/singleBuy'
import { ElMessage } from "element-plus";
import { deleteCartApi } from '@/apis/deleteCart';

let allChecked = ref(false)
let cart: any = ref([])
let uid = JSON.parse(localStorage.getItem('userInfo') as string).id  //从localStorage中获取用户id
const query = reactive({
    pageIndex: 1,
    pageSize: 5
})
const pageTotal = ref(0);

let totalPrice = computed(() => {
    let sum = 0
    cart.value.forEach((item: any) => {
        if (item.isChecked == true) {
            sum += item.cnum * item.mprice
        }
    });
    return sum
})

//获取数据
const getData = async () => {
    const pageSize = query.pageSize
    const currentPage = query.pageIndex
    const res = await userCartApi({ uid, pageSize, currentPage })
    cart.value = res.data.data.list
    pageTotal.value = res.data.data.total
}
getData()
// 分页导航
const handlePageChange = (val: number) => {
    query.pageIndex = val;
    allChecked.value = false
    getData();
};
//全选函数
function allCheck() {
    cart.value.forEach((item: any) => item.isChecked = allChecked.value)
}
//单选函数
function singleCheck() {
    allChecked.value = cart.value.every((item: any) => item.isChecked == true);
}
//提交订单
function submitOrder() {
    let selectArr: any = []
    cart.value.forEach((item: any) => {
        if (item.isChecked == true) {
            selectArr.push({ uid: item.uid, mid: item.mid, cnum: item.cnum })
        }
    });
    for (var item of selectArr) {
        singleBuyApi({ uid: item.uid, mid: item.mid, num: item.cnum }).then(res => {
            if (res.data.data.code == 200) {
                ElMessage({
                    type: 'success',
                    message: res.data.data.msg
                })
            } else {
                ElMessage({
                    type: 'error',
                    message: res.data.data.msg
                })
            }
        })
    }

}
//删除
function deleteCart(item: any) {
    deleteCartApi(item.cid).then((res: any) => {
        if (res.data.data.code == 200) {
            ElMessage({
                type: 'success',
                message: res.data.data.msg
            })
        } else {
            ElMessage({
                type: 'error',
                message: res.data.data.msg
            })
        }
        getData()
    })
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

.empty {
    position: relative;
    left: 450px;
}

.example-pagination-block {
    display: flex;
    margin: 15px auto;
}

.cart-footer {
    position: relative;
    width: 980px;
    height: 100px;
    margin: 50px auto;
    /* background-color: #f5f5f5; */

    p {
        position: absolute;
        left: 0px;
        top: 50%;
        transform: translateY(-50%);
        color: #ff6537;
        font-size: 26px;
        font-weight: 800;
    }

    .el-button {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
    }
}
</style>