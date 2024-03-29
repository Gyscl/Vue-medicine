<template>
    <div class="search_container">
        <h3>查询结果</h3>
        <div class="empty" v-if="searchlist.length == 0">
            <el-empty description="noData" />
        </div>
        <div class="search_content" v-else>
            <ul>
                <li v-for="(item, index) in searchlist" :key="index" @click="toDetail(item.mid)">
                    <img :src="getImageUrl(item.msrc)" alt="">
                    <div class="title">{{ item.mname }}</div>
                    <div class="dotted"></div>
                    <div class="price">￥{{ item.mprice }}</div>
                </li>
            </ul>
        </div>
        <!-- <div class="pagination">
            <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
        </div> -->
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSerachDataStore } from "@/stores/searchData";
import { storeToRefs } from 'pinia'

const router = useRouter()
const searchData = useSerachDataStore();
let { searchlist }: any = storeToRefs(searchData)

// const query = reactive({
//     name: '',
//     pageIndex: 1,
//     pageSize: 12
// });
// let pageTotal = ref(0);
// let list: any = ref([])
// function getData() {
//     const pageSize = query.pageSize
//     const currentPage = query.pageIndex
//     // list = searchlist.slice(currentPage == 1 ? 0 : currentPage * pageSize - 1, pageSize)
//     list = searchlist
//     console.log('data',list);
// }
// getData()
// const handlePageChange = (val: number) => {
//     query.pageIndex = val;
//     getData();
// };

//vue3去除了require，改为import.meta.url
function getImageUrl(name: string) {
    return new URL(`/public/images/${name}`, import.meta.url).href;
}
function toDetail(id: any) {
    router.push({
        name: 'detail',
        params: { id: id }
    })
}
</script>

<style scoped>
.search_container {
    width: 980px;
    margin: 10px auto;
}

.empty {
    text-align: center;
    margin-top: 100px;
}

.search_content {
    height: 1000px;
}

img {
    width: 220px;
}

.title {
    font-size: 18px;
    text-align: center;
}

.dotted {
    width: 100%;
    text-align: center;
    border-bottom: 1px dashed #ccc;
    margin: 5px auto;
}

.price {
    font-size: 20px;
    text-align: center;
    color: #ff6637;
}

li {
    width: 220px;
    height: 300px;
    float: left;
    border: 1px solid #000;
    margin-right: 20px;
    margin-top: 12px;
}
</style>