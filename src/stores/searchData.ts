import { defineStore } from "pinia";

export const useSerachDataStore = defineStore("serachDate", {
  state: () => {
    return {
      searchlist: [],
    };
  },
  getters: {},
  actions: {},
});
