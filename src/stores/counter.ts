import { ref, computed } from "vue";
import { defineStore } from "pinia";

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

export const useCounterStore = defineStore("counter", {
  //专门存放数据的
  state() {
    return {
      count: ref(0),
    };
  },
  //专门存放方法的
  actions: {
    doubleCount() {
      //this是当前的store ==> useCounterStore
      this.count *= 2;
    },
  },
});
