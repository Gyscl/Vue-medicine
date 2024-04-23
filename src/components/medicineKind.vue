<template>
    <div class="container">
        <div class="top">
            <p>{{ mItem.kname }}</p>
        </div>
        <div class="bottom">
            <ul>
                <li v-for="(item, index) in mItem.mList" :key="index" @click="toDetail(item.mid)">
                    <img :src="getImageUrl(item.msrc)" alt="">
                    <div class="title">{{ item.mname }}</div>
                    <div class="dotted"></div>
                    <div class="price">￥{{ item.mprice }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

//vue3去除了require，改为import.meta.url
function getImageUrl(name: string) {
    return new URL(`/public/images/${name}`, import.meta.url).href;
}
function toDetail(mid: any) {
    router.push({
        name: 'detail',
        params: { id: mid }
    })
}

defineProps(['mItem'])
</script>

<style scoped>
.container {
    width: 980px;
    margin: 30px auto;

    .top {
        height: 50px;
        background-color: rgb(255, 255, 255);
        line-height: 50px;
        padding-bottom: 10px;
        font-size: 30px;
    }

    .bottom {
        height: 350px;

        li {
            width: 220px;
            height: 300px;
            float: left;
            border: 1px solid #000;
            margin-right: 20px;
            margin-top: 12px;
        }
    }
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
</style>