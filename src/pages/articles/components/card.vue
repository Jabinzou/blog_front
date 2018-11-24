<template>
  <div
    class="card-wrap"
    :style="styleLint">
    <h2>{{ article.title }}</h2>
  </div>
</template>
<script>
export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      default: () => {
        return {
          createdAt: '',
          title: '',
          category: {},
          desc: '',
          id: null,
          tag: [],
          views: 0
        };
      }
    },
    styleLint: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.card-wrap{
  width: 200px;
  height: 20px;
  background: pink;
  &:not(:first-of-type) {
    margin-top: 20px;
  }
}
</style>
