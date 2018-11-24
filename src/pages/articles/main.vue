<template>
  <div class="main-body">
    <top-bar
      class="fixed"/>
    <div class="art-body">
      <div class="body-content">
        <transition-group
          tag="div"
          name="article-container"
          enter-active-class="animated bounceInLeft"
          leave-active-class="animated fadeOut">
          <Article-card
            v-if="list.list.length"
            :style-lint="{'animation-delay': index * 300 + 'ms'}"
            v-for="(item, index) in list.list"
            :article="item"
            :key="JSON.stringify(item)"/>
        </transition-group>
      </div>
      <bot-bar/>
    </div>
  </div>
</template>
<script>
import { getArticle } from '@api';
import topBar from '@/components/topBar';
import botBar from '@/components/bottomBar';
import ArticleCard from './components/card';
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
  },
  components: {
    topBar,
    botBar,
    ArticleCard
  }
};
</script>
<style lang="scss">
@import '@asset/css/common.scss';
.main-body {
  height: 100%;
  .fixed {
    position: fixed;
    width: 100%;
    top: 0;
  }
  .article-container-move {
    transition: transform 500ms 1s;
  }
  .body-content {
    min-height: calc(100% - 150px);
  }
  .art-body {
    box-sizing: border-box;
    padding-top: 64px;
    height: 100%;
    overflow: auto;
  }
}

</style>
