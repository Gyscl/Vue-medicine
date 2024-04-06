<template>
    <div class="orderContainer">
        <table>
            <thead>
                <tr>
                    <th width="436">商品信息</th>
                    <th width="136">单价</th>
                    <th width="136">数量</th>
                    <th width="136">小计</th>
                    <th width="136">订单状态</th>
                    <th width="136">操作</th>
                </tr>
            </thead>
            <tbody>
                <div v-if="orderList.length == 0" class="empty">
                    <el-empty :image-size="200" description="订单列表为空" />
                </div>
                <tr v-else v-for="o in orderList" :key="o.cid">
                    <td width="436">
                        <div>
                            <RouterLink :to="`/detail/${o.mid}`"><img width="100" :src="`/public/images/${o.msrc}`">
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
                            <span v-if="o.ostate == 1"><el-button type="success" disabled
                                    style="cursor: default">已发货</el-button></span>
                            <span v-else><el-button type="warning" disabled
                                    style="cursor: default">未发货</el-button></span>
                        </p>
                    </td>
                    <td width="136">
                        <p>
                            <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                                @confirm="deleteOrder(o)">
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
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { userOrderApi } from '@/apis/userOrder';
import { ElMessage } from "element-plus";
import { deleteOrderApi } from '@/apis/deleteOrder';

const orderList: any = ref([])
const uid = JSON.parse(localStorage.getItem('userInfo') as string).id
const query = reactive({
    pageIndex: 1,
    pageSize: 5
})
const pageTotal = ref(0);
//获取数据
const getData = async () => {
    const pageSize = query.pageSize
    const currentPage = query.pageIndex
    const res = await userOrderApi({ uid, pageSize, currentPage })
    orderList.value = res.data.data.list
    pageTotal.value = res.data.data.total
}
getData()
// 分页导航
const handlePageChange = (val: number) => {
    query.pageIndex = val;
    getData();
};
//删除订单
function deleteOrder(item: any) {
    deleteOrderApi({ id: item.oid }).then((res: any) => {
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

.example-pagination-block {
    display: flex;
    margin: 15px auto;
}

.el-empty {
    position: relative;
    left: 450px;
}
</style>