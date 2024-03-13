<template>
    <div>
        <div class="container">
            <div class="search-box">
                <el-input v-model="query.name" placeholder="请输入名称" class="search-input mr10" clearable></el-input>
                <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
                <el-button type="" :icon="RefreshRight" @click="handleReset">重置</el-button>
            </div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="mname" label="药品名称" width="300" />
                <el-table-column fixed="right" prop="mnum" label="库存" width="300" />
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
import { Search, RefreshRight } from '@element-plus/icons-vue';
import { inventoryListApi } from '@/apis/inventoryList';

const tableData: any = ref([]);
const query = reactive({
    name: '',
    pageIndex: 1,
    pageSize: 10
});
const pageTotal = ref(0);

async function getdata() {
    const pageSize = query.pageSize
    const currentPage = query.pageIndex
    const name = query.name
    const res = await inventoryListApi({ pageSize, currentPage, name })
    tableData.value = res.data.data.list
    pageTotal.value = res.data.data.total
}
getdata()
//查询
function handleSearch() {
    getdata()
}
//重置
function handleReset() {
    query.name = '';
    query.pageIndex = 1;
    getdata()
}
//分页
function handlePageChange(val: number) {
    query.pageIndex = val;
    getdata()
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
