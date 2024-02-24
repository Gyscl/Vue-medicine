<template>
  <div class="layoutHeader">
    <div class="headerLeft">
      <div class="headerTitle">
        <RouterLink to="/">
          {{ title }}
        </RouterLink>
      </div>
    </div>
    <div class="headerRight">
      <div class="search">
        <el-input type="text" v-model="searchInfo" placeholder="请输入你要搜索的商品" clearable @focus="isShow = true"
          @blur="isShow = false" />
        <button class="searchBtn" @click.prevent="search">
          <i class="iconfont icon-sousuo"></i>
        </button>
      </div>
      <div v-show="isShow" class="historyContainer">
        <div class="header">
          <p class="title">搜索历史</p>
          <button class="btnAll" @mousedown.prevent="deleteAll">
            <i class="iconfont icon-delete"></i>清空
          </button>
        </div>
        <ul>
          <li v-for="(item, index) in searchHistory" :key="index" @click="searchItem(item)">
            {{ item }}
            <button class="btnOne" @mousedown="deleteItem(index)">
              <i class="iconfont icon-shanchu1"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useSearch from "../hooks/useSearch";
import { RouterLink } from 'vue-router'

let {
  title,
  searchInfo,
  isShow,
  searchHistory,
  search,
  searchItem,
  deleteItem,
  deleteAll,
} = useSearch();
</script>

<style scoped>
a{
    color: #ff6537;
}
.layoutHeader {
  width: 980px;
  height: 120px;
  margin: 0px auto;
}

.headerLeft {
  float: left;

  .headerTitle {
    font-size: 26px;
    font-weight: bold;
    line-height: 120px;
  }
}

.headerRight {
  float: right;
  margin-top: 35px;

  .el-input {
    width: 400px;
    height: 40px;
    font-size: 14px;
  }

  .searchBtn {
    width: 75px;
    height: 40px;
    border: none;
    background-color: #ff6537;
  }
}

.historyContainer {
  position: absolute;
  z-index: 999;
  width: 400px;
  border: 1px solid #ccc;
  overflow: auto;

  .header {
    height: 30px;
    overflow: auto;

    .title {
      float: left;
      color: red;
    }

    .btnAll {
      float: right;
      border: none;
      background-color: #fff;
    }
  }
}

li {
  padding: 5px;
  background-color: rgb(240, 240, 245);
}

li:hover {
  background-color: rgb(212, 211, 211);

  .btnOne {
    background-color: rgb(212, 211, 211);
  }
}

.btnOne {
  float: right;
  background-color: rgb(240, 240, 245);
  border: none;
}
</style>
