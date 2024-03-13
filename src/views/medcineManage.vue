<template>
    <div>
        <div class="container">
            <div class="search-box">
                <el-input v-model="query.name" placeholder="请输入药品名称" class="search-input mr10" clearable></el-input>
                <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
                <el-button type="" :icon="RefreshRight" @click="handleReset">重置</el-button>
                <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="mname" label="药品名称" align="center"></el-table-column>
                <el-table-column label="价格" align="center">
                    <template #default="scope">￥{{ scope.row.mprice }}</template>
                </el-table-column>
                <el-table-column label="图片" align="center">
                    <template #default="scope">
                        <el-image class="table-td-thumb" :src="`/public/images/${scope.row.msrc}`" :z-index="10"
                            :preview-src-list="[`/public/images/${scope.row.msrc}`]" preview-teleported>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="minfo" label="功效" align="center"></el-table-column>
                <el-table-column label="库存数量" align="center">
                    <template #default="scope">
                        {{ scope.row.mnum }}
                    </template>
                </el-table-column>
                <el-table-column prop="mtype" label="药品类型" align="center"></el-table-column>
                <el-table-column label="操作" width="280" align="center">
                    <template #default="scope">
                        <el-button type="primary" size="small" :icon="Edit"
                            @click="handleEdit(scope.$index, scope.row)">
                            编辑
                        </el-button>
                        <el-button type="danger" size="small" :icon="Delete" @click="handleDelete(scope.row.mid)">
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
        <el-dialog :title="idEdit ? '编辑药品' : '新增药品'" v-model="visible" width="500px" destroy-on-close
            :close-on-click-modal="false" @close="closeDialog">
            <medicinePage :data="rowData" :edit="idEdit" :update="updateData" />
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, RefreshRight, Edit, Search, CirclePlusFilled } from '@element-plus/icons-vue';
import { medicineListApi } from '@/apis/medicineList';
import { deleteMedicineApi } from '@/apis/deleteMedicine';
import { addMedicineApi } from '@/apis/addMedicine';
import { updateMedicineApi } from '@/apis/updateMedicine';
import medicinePage from '../components/medicinePage.vue';

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
    const res = await medicineListApi({ pageSize, currentPage, name })
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
            const res = await deleteMedicineApi({id:index})
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
        updateMedicineApi(row)
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
    } else {
        addMedicineApi(row)
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
            })
    }
    // idEdit.value ? (tableData.value[idx] = row) : tableData.value.unshift(row);
    // console.log(tableData.value);
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
