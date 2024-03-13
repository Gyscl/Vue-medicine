<template>
    <div>
        <div class="container">
            <div class="search-box">
                <el-input v-model="query.name" placeholder="请输入药品名称" class="search-input mr10" clearable></el-input>
                <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
                <el-button type="" :icon="RefreshRight" @click="handleReset">重置</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="oid" label="订单号" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名" align="center"></el-table-column>
                <el-table-column prop="mname" label="药品名称" align="center"></el-table-column>
                <el-table-column prop="onum" label="药品数量" align="center"></el-table-column>
                <el-table-column prop="address" label="发货地址" align="center"></el-table-column>
                <el-table-column prop="odate" label="下单时间" align="center"></el-table-column>
                <el-table-column prop="ostate" label="发货状态" align="center">
                    <template #default="scope">
                        <span v-if="scope.row.ostate == 1"><el-button type="success" plain
                                disabled>已发货</el-button></span>
                        <span v-else><el-button type="warning" plain @click="send(scope.row.oid)">未发货</el-button></span>
                    </template>

                </el-table-column>
                <el-table-column label="操作" width="280" align="center">
                    <template #default="scope">
                        <el-button type="danger" size="small" :icon="Delete" @click="handleDelete(scope.row.oid)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, RefreshRight, Edit, Search } from '@element-plus/icons-vue';
import { orderListApi } from '@/apis/orderList';
import { deliveryApi } from '@/apis/delivery';
import { deleteOrderApi } from '@/apis/deleteOrder';

const query = reactive({
    name: '',
    pageIndex: 1,
    pageSize: 10
});
const tableData = ref([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = async () => {
    const pageSize = query.pageSize
    const currentPage = query.pageIndex
    const name = query.name
    const res = await orderListApi({ pageSize, currentPage, name })
    tableData.value = res.data.data.list
    pageTotal.value = res.data.data.total
};
getData();

// 查询操作
const handleSearch = () => {
    query.pageIndex = 1;
    getData();
};
//重置操作
function handleReset() {
    query.name = '';
    query.pageIndex = 1;
    getData()
}
// 分页导航
const handlePageChange = (val: number) => {
    query.pageIndex = val;
    getData();
};
// 删除操作
const handleDelete = (index: number) => {
    // 二次确认删除
    ElMessageBox.confirm('确定要删除吗？', '提示', {
        type: 'warning'
    })
        .then(async () => {
            const res = await deleteOrderApi({ id: index })
            if (res.data.data.code == 200) {
                getData()
                ElMessage({
                    type: 'success',
                    message: res.data.data.msg
                })
            } else {
                ElMessage({
                    type: 'warning',
                    message: res.data.data.msg
                })
            }
        })
        .catch(() => { });
};
//发货操作
const send = (index: number) => {
    deliveryApi({ id: index })
        .then(res => {
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
            getData();
        }
        )
}
</script>

<style scoped>
.search-box {
    margin-bottom: 20px;
}

.search-input {
    width: 200px;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
