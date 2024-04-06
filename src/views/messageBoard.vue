<template>
    <div class="messageContainer">
        <div class="search-box">
            <el-input v-model="query.name" placeholder="搜索留言" class="search-input mr10" clearable></el-input>
            <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
            <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
            <el-dialog title="留言" width="500px" v-model="visible">
                <el-input v-model="input" type="textarea" style="width: 450px; margin-right: 30px;"
                    placeholder="Please input" />
                <el-button type="primary" plain @click="addMessage" style="margin: 20px 5px; ">确认</el-button>
            </el-dialog>
        </div>
        <ul>
            <li v-for='item in messageData' :key="item.id">
                <el-avatar :icon="UserFilled" /> 用户名：{{ item.name }} <br>
                <el-input v-model="item.message" type="textarea"
                    style="width: 800px; display: block; margin: 2px auto;" disabled />
                <p style="float: right; ">时间：{{ item.datetime }}</p>
            </li>
        </ul>
        <div class="pagination">
            <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';
import { Search, CirclePlusFilled, UserFilled } from '@element-plus/icons-vue';
import { messageListApi } from '@/apis/messageList';
import { addMessageApi } from '@/apis/addMessage';

const uid=JSON.parse(localStorage.getItem('userInfo') as string ).id
const query = reactive({
    name: '',
    pageIndex: 1,
    pageSize: 5
});
const pageTotal = ref(0);
const visible = ref(false);
const input = ref('')
const messageData: any = ref([])

//获取数据
const getData = async () => {
    const pageSize = query.pageSize
    const currentPage = query.pageIndex
    const message = query.name
    const res = await messageListApi({ pageSize, currentPage, message })
    messageData.value = res.data.data.list
    pageTotal.value = res.data.data.total
}
getData()
// 分页导航
const handlePageChange = (val: number) => {
    query.pageIndex = val;
    getData();
};
//搜索
const handleSearch = () => {
    query.pageIndex = 1;
    getData();
};

//新增留言
const addMessage =async() => {
    let res = await addMessageApi({message:input.value,uid:uid})
    if(res.data.data.code==200){
        getData()
        ElMessage({
            type: 'success',
            message: res.data.data.msg
        })
        visible.value = false;
    }else{
        ElMessage({
            type: 'warning',
            message: res.data.data.msg
        })
    }
};
</script>

<style scoped>
.messageContainer {
    width: 980px;
    margin: 0px auto;
}

.search-box {
    margin-bottom: 20px;
}

.search-input {
    width: 200px;
}

.mr10 {
    margin-right: 10px;
}

ul {
    width: 980px;
    margin: 0px auto;
    height: 650px;

    li {
        height: 120px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
    }
}
</style>