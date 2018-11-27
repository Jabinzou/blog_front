<template>
  <li
    class="card-wrap"
    :style="styleLint">
    <h2
      class="title pointer"
      @click="showDetail">{{ article.title }}</h2>
    <div class="timeline">
      <span class="time pointer">
        <i class="iconfont icon-time"/>
        {{ moment(article.createdAt).format('YYYY-MM-DD') }}
      </span>
      <span class="cate pointer">
        <i class="iconfont icon-category"/>
        {{ article.category.name }}
      </span>
      <span class="view pointer">
        <i class="iconfont icon-eye"/>
        {{ article.views }}
      </span>
    </div>
    <p class="abstract">
      {{ article.desc }}
    </p>
    <div class="meta">
      <mu-tooltip content="标签">
        <i class="iconfont icon-tag"/>
      </mu-tooltip>
      <mu-chip
        class="chip"
        v-for="(chip, index) in article.tag"
        :key="index"
        color="#f48fb1">{{ chip.name }}</mu-chip>
    </div>
  </li>
</template>
<script>
import moment from 'moment';
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
  },
  data () {
    return {
      moment
    };
  },
  methods: {
    /**
     * @description 跳转文章详情
     */
    showDetail () {
      this.$router.push({name: 'detail',
        params: {
          id: this.article.id
        }});
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@asset/css/common.scss';
.mu-chip {
  line-height: 26px;
}
.card-wrap{
  width: 100%;
  height: auto;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px 2px 20px 10px;
  &:hover {
    box-shadow: 0px 4px 6px $color-pink-light;
  }
  &:not(:first-of-type) {
    margin-top: 20px;
  }
  .title {
    margin: -7px 0 4px;
    display: inherit;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    &:hover {
      color: $color-pink;
    }
  }
  .timeline {
    span:not(:first-of-type) {
      margin-left: 10px;
    }
    .view:hover {
      color: $color-green;
    }
    .cate:hover {
      color: #448aff;
    }
    span:hover {
      color: $color-purple;
    }
    color: $color-g;
  }
  .abstract {
    color: $color-gray;
    font-size: 13px;
    line-height: 1.5;
    margin: 4px 0 8px;
  }
  .chip {
    margin-left: 4px;
  }
}
</style>
