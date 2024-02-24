<template>
    <div class="orderContainer">
        <table>
            <thead>
                <tr>
                    <th width="">商品信息</th>
                    <th width="">单价</th>
                    <th width="">数量</th>
                    <th width="">小计</th>
                    <th width="">操作</th>
                </tr>
            </thead>
            <tbody>
                <div v-if="orderList.length == 0" class="empty">
                    <el-empty :image-size="200" description="订单列表为空" />
                </div>
                <tr v-else v-for="o in orderList" :key="o.cid">
                    <td width="436">
                        <div>
                            <RouterLink :to="`/detail/:${o.mid}`"><img width="100" :src="`/public/images/${o.msrc}`">
                            </RouterLink>
                            <div>
                                <p>{{ o.mname }}</p>
                            </div>
                        </div>
                    </td>
                    <td width="136">
                        <p>&yen; {{ o.mprice }}</p>
                    </td>
                    <td width="136">
                        <p>
                            <el-input-number :disabled="true" v-model="o.onum" :min="1" :max="10" />
                        </p>
                    </td>
                    <td width="136">
                        <p>
                            &yen; {{ o.onum * o.mprice }}
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
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { userOrderApi } from '@/apis/userOrder';

const orderList = ref([])
const uid = JSON.parse(localStorage.getItem('userInfo')).id

onMounted(async () => {
    const res = await userOrderApi(uid);
    orderList.value = res.data.data.res;
    console.log('订单', orderList.value);
})
</script>

<style scoped>
.orderContainer {
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
</style>