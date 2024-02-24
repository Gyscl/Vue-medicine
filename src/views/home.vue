<template>
  <div>
    <el-carousel height="500px">
      <el-carousel-item v-for="item in pics" :key="item">
        <img :src="getImageUrl(item)" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <div v-for="(item,index) in medicineList" :key="index">
    <medicineKind :mItem="item" />
  </div>
</template>

<script lang="ts" setup>
import { ref,reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { medicineInfoApi } from '@/apis/medicineInfo'
import medicineKind from "@/components/medicineKind.vue";

const pics = reactive(["lb1.jpg", "lb2.jpg", "lb3.jpg", "lb4.jpg"])
//vue3去除了require，改为import.meta.url
function getImageUrl(name: string) {
  return new URL(`/public/images/${name}`, import.meta.url).href;
}

let medicineList=ref([])

//获取药品分类信息
const medicineInfo = async () => {
  try {
    let res = await medicineInfoApi()
    medicineList.value = res.data.data
  } catch (err: any) {
    ElMessage({
      message: err,
      type: "warning",  
    });
  }
}

onMounted(() =>
  medicineInfo()
);
</script>

<style scoped></style>
