<template>
  <div
    class="main-body"
    ref="contentBody"
  >
    <top-bar
      class="fixed"/>
    <div
      class="art-body">
      <ul class="body-content">
        <transition-group
          tag="div"
          name="article-container"
          enter-active-class="animated bounceInLeft"
          leave-active-class="animated fadeOut">
          <Article-card
            v-if="list.list.length"
            :style-lint="{'animation-delay': index * 200 + 'ms'}"
            v-for="(item, index) in list.list"
            :article="item"
            :key="JSON.stringify(item)"/>
        </transition-group>
      </ul>
      <transition
        enter-active-class="animated zoomInRight"
        leave-active-class="animated zoomOutRight">
        <mu-button
          fab
          class="back-top"
          v-if="show"
          @click="backToTop"
          color="red">
          <mu-icon value="arrow_upward"/>
        </mu-button>
      </transition>
      <bot-bar/>
    </div>
  </div>
</template>
<script>
import { getArticle } from '@api';
import topBar from '@/components/topBar';
import botBar from '@/components/bottomBar';
import ArticleCard from './components/card';
import {addEvent} from '@/utils/normal';
export default {
  data () {
    return {
      list: {
        count: 0,
        list: []
      },
      show: false,
      backTop: 0, // 滚动高度
      showTopHeight: 200 // 显示回到顶部的距离
    };
  },
  watch: {
    backTop (val) {
      if (this.showTopHeight <= val) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  created () {
    this.getList();
  },
  mounted () {
    this.$nextTick(() => {
      const el = this.$refs.contentBody;
      const self = this;
      addEvent(el, 'scroll', function () {
        self.backTop = self.$refs.contentBody.scrollTop;
      });
    });
  },
  methods: {
    async getList () {
      const res = await getArticle(null);
      this.list = res.data.data;
    },
    /**
     * @description 回到顶部
     */
    backToTop () {
      this.$refs.contentBody.scrollTop = 0;
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
  width: 100%;
  overflow: auto;
  .fixed {
    position: fixed;
    width: 100%;
    top: 0;
  }
  .back-top {
    position: absolute;
    right: 16px;
    bottom: 20px;
  }
  .body-content {
    box-sizing: border-box;
    min-height: calc(100% - 151px);
    height: auto;
    margin: 0 auto;
    padding: 14px 14px;
  }
  @media (min-width: 768px) {
    .body-content {
      width: 750px;
    }
  }
  .art-body {
    box-sizing: border-box;
    height: calc(100% - 64px);
    width: 100%;
    margin-top: 64px;
  }
}

</style>
