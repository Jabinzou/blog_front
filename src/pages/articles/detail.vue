<template>
  <div
    class="detail-wraper">
    <div
      class="loading-mask"
      v-if="loading">
      <p class="text">客官稍等~</p>
    </div>
    <div
      v-html="content"
      class="article-detail"/>
    <bot-bar/>
    <transition
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown">
      <mu-bottom-nav
        class="fixed-bto visible-bar__bto"
        :value.sync="shift"
        color="#f06292"
        v-if="scrollTop"
      >
        <mu-bottom-nav-item
          value="movies"
          title="首页"
          :to="{name: 'articles'}"
          icon="home"/>
        <mu-bottom-nav-item
          value="cluster"
          title="专栏"
          @click.native="changeView('conclude')"
          icon=":iconfont icon-pencil"/>
        <mu-bottom-nav-item
          value="contact"
          title="联系"
          @click.native="changeView('open', 'https://github.com/Jabinzou')"
          icon=":iconfont icon-contactus"/>
        <mu-bottom-nav-item
          value="share"
          @click.native="changeView('share')"
          title="分享"
          icon=":iconfont icon-share"/>
      </mu-bottom-nav>
    </transition>
  </div>
</template>
<script>
import { getDetail } from '@api';
import 'nprogress/nprogress.css';
import 'highlight.js/styles/atom-one-dark.css';
import '@asset/css/highlight.scss';
import '@asset/css/markdown.scss';
import 'quill-emoji/dist/quill-emoji.css';
import hljs from 'highlight.js';
import botBar from '../../components/bottomBar';
import {addEvent, removeEvent} from '@/utils/normal';
import Toast from 'muse-ui-toast';
import imgLazy from '@/mixin/imgLazy';
import NProgress from 'nprogress';
const highlightCode = () => {
  const preEl = document.querySelectorAll('pre');
  preEl.forEach((el) => {
    hljs.highlightBlock(el);
  });
};
export default {
  mixins: [imgLazy],
  data () {
    return {
      content: null,
      shift: null, // 展开底部导航
      scrollTop: false, // 上滚动显示底部菜单
      scrollAction: {x: undefined, y: undefined},
      scrollDirection: null, // 滚动方向
      loading: false
    };
  },
  watch: {
    scrollDirection (val) {
      if (val > 0) {
        this.scrollTop = true;
      } else {
        this.scrollTop = false;
      }
    }
  },
  created () {
    NProgress.configure({ easing: 'ease', speed: 100, minimum: 0.2, trickleSpeed: 30 });
    NProgress.start();
    this.loading = true;
  },
  mounted () {
    this.getDetail();
    this.$nextTick(() => {
      addEvent(window, 'scroll', this.scrollFunc);
      setTimeout(() => {
        NProgress.done();
        NProgress.remove();
        this.loading = false;
      }, 300);
    });
  },
  updated () {
    highlightCode();
  },
  beforeDestroy () {
    removeEvent(window, 'scroll', this.scrollFunc);
  },
  methods: {
    /**
     * @description 滚动方向
     */
    scrollFunc () {
      if (!this.scrollAction.y) {
        this.scrollAction.y = 0;
      }
      const diff = this.scrollAction.y - window.pageYOffset;
      this.scrollDirection = diff;
      this.scrollAction.y = window.pageYOffset;
    },
    async getDetail () {
      const param = this.$route.params;
      const result = await getDetail(param);
      this.content = result.content || '';
    },
    changeView (type, arg) {
      if (type === 'open') {
        window.open(arg);
      } else {
        Toast.message('客官别闹~开发中!');
      }
    }
  },
  components: {
    botBar
  }
};
</script>
<style lang="scss" scoped>
@import '@asset/css/common.scss';
.detail-wraper {
  box-sizing: border-box;
  height: 100%;
}
.loading-mask {
  position: absolute;
  z-index: 100;
  background-color: hsla(0,0%,100%,.9);
  top: 0;
  right: 0;width: 100%;
  height: 100%;
  & > .text {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    font-size: 1.2em;
    text-align:center;
    color: rgb(255, 64, 129);
  }
}
.fixed-bto {
  box-shadow: 0px -2px 10px 1px $color-gray;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: none;
}
@media (max-width: 991px){
  .visible-bar__bto {
      display: block !important;
  }
}
.article-detail {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 10px 16px;
  width: 100%;
  min-height: calc(100% - 150px);
}
@media (min-width: 992px) {
  .article-detail {
    width: 75%;
  }
}
</style>
