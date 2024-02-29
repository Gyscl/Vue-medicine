<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { RouterView } from "vue-router";
import autofit from "autofit.js"; //引入自适应大屏插件autofit

onMounted(() => {
  autofit.init({
    dh: 1080,
    dw: 1920,
    el: "#app",
    resize: true
  },
    false)
})
onBeforeUnmount(() => {
  autofit.off()
})
</script>

<style scoped></style>
