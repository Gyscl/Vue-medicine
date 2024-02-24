<template>
    <layoutNav/>
    <layoutHeader/>
    <RouterView/>
    <layoutFooter/>
</template>

<script lang="ts" setup>
    import layoutNav from '@/components/layoutNav.vue'
    import layoutHeader from '@/components/layoutHeader.vue'
    import layoutFooter from '@/components/layoutFooter.vue';
</script>

<style scoped>
</style>