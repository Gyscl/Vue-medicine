//搜索历史相关数据
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { searchApi } from "@/apis/search";
import { ElMessage } from "element-plus";
import { useSerachDataStore } from "@/stores/searchData";

export default function () {
  const router = useRouter();
  const title = ref("一体式药店销售管理系统");
  const searchInfo = ref("");
  let isShow = ref(false);
  let searchHistory: any[] = reactive([]);
  let searchData = useSerachDataStore();
  //点击查询
  function search() {
    searchApi({ name: searchInfo.value }).then((res: any) => {
      console.log(res);
      if(res.data.code==0){
        ElMessage({
          message: res.data.message,
          type: "warning",
        });
      } else if (res.data.data.code == 200) {
        searchData.searchlist = res.data.data.res;
        ElMessage({
          message: res.data.data.msg,
          type: "success",
        });
        router.push({
          path: "/searchList",
        });
      } else {
        ElMessage({
          message: res.data.data.msg,
          type: "warning",
        });
      }
    });
    searchHistory.unshift(searchInfo.value);
  }
  //获取单个搜索元素
  function searchItem(item: any) {
    console.log('item',item)
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
