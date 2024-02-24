//搜索历史相关数据
import { ref, reactive } from "vue";

export default function () {
  const title = ref("一体式药店销售管理系统");
  const searchInfo = ref("");
  let isShow = ref(false);
  let searchHistory: any[] = reactive([]);
  //点击查询 
  function search() {
    searchHistory.unshift(searchInfo.value);
  }
  //获取单个搜索元素
  function searchItem(item: any) {
    searchInfo.value = item;
  }
  //清除单个
  function deleteItem(i: number) {
    searchHistory.splice(i, 1);
  }
  //清空
  function deleteAll() {
    searchHistory.splice(0);
  }

  return {
    title,
    searchInfo,
    isShow,
    search,
    searchHistory,
    searchItem,
    deleteItem,
    deleteAll,
  };
}
