<template>
    <div>
        <div class="container">
            <div class="search-box">
                <el-input v-model="query.name" placeholder="请输入用户名" class="search-input mr10" clearable></el-input>
                <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
                <el-button type="" :icon="RefreshRight" @click="handleReset">重置</el-button>
                <!-- <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button> -->
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="id" label="用户id" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名" align="center"></el-table-column>
                <el-table-column prop="address" label="地址" align="center"></el-table-column>
                <el-table-column prop="isroot" label="是否管理员" align="center">
                    <template #default="scope">
                        <span v-if="scope.row.isroot == 1">是</span>
                        <span v-else>否</span>
                    </template>

                </el-table-column>
                <el-table-column label="操作" width="280" align="center">
                    <template #default="scope">
                        <el-button type="primary" size="small" :icon="Edit"
                            @click="handleEdit(scope.$index, scope.row)">
                            编辑
                        </el-button>
                        <el-button type="danger" size="small" :icon="Delete" @click="handleDelete(scope.row.id)">
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
        <el-dialog :title="idEdit ? '编辑用户' : '新增用户'" v-model="visible" width="500px" destroy-on-close
            :close-on-click-modal="false" @close="closeDialog">
            <usersPage :data="rowData" :edit="idEdit" :update="updateData" />
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, RefreshRight, Edit, Search } from '@element-plus/icons-vue';
import { usersListApi } from '@/apis/usersList';
import { deleteUserApi } from '@/apis/deleteUser';
import { updateUserApi } from '@/apis/updateUser';

import usersPage from '../components/usersPage.vue';

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
    const res = await usersListApi({ pageSize, currentPage, name })
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
            const res = await deleteUserApi({ id: index })
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
        .catch((err: any) => {
            ElMessage({
                type: 'warning',
                message: err
            })
        });
};

const visible = ref(false);
let idx: number = -1;
const idEdit = ref(false);
const rowData = ref({});
const handleEdit = (index: number, row: any) => {
    idx = index;
    rowData.value = row;
    idEdit.value = true;
    visible.value = true;
};
const updateData = (row: any) => {
    if (idEdit.value) {
        updateUserApi(row)
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
                visible.value = false;
                idEdit.value = false;
            })
    }
    closeDialog();
};

const closeDialog = () => {
    visible.value = false;
    idEdit.value = false;
};

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
