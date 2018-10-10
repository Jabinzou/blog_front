<template>
  <div>
    <h1>123123</h1>
  </div>
</template>
<script>
import { getArticle } from '@api';
export default {
  data () {
    return {
      list: {
        count: 0,
        list: []
      }
    };
  },
  created () {
    this.getList();
  },
  mounted () {
  },
  methods: {
    async getList () {
      const res = await getArticle(null);
      this.list = res.data.data;
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@asset/css/common.scss';
</style>
