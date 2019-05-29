<template>
  <div class="publish-wrap clearfix">
    <mu-appbar
      style="width: 100%;"
      color="#e91e63">
      <mu-button
        icon
        @click="menuBar=true"
        slot="left">
        <mu-icon value="menu"/>
      </mu-button>
      小可爱的奏折
    </mu-appbar>
    <mu-drawer
      :open.sync="menuBar"
      :docked="false"
      :right="false"
      style="background:#f8f8f8">
      <mu-list>
        <mu-list-item
          button
          @click="changeView(item)"
          v-for="(item, index) in menuData"
          :key="index">
          <mu-icon
            size="22"
            :value="item.icon"
            :color="item.color"/>
          <mu-list-item-title>{{ item.value }}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <div class="publish__content">
      <component :is="viewport"/>
    </div>
  </div>
</template>
<script>
import Setting from './components/setting';
import Publish from './components/publish';
import ArticleManager from './components/articleManage';

export default {
  data () {
    return {
      menuData: [
        {
          icon: 'settings', // icon
          view: 'setting',
          value: '管理页面',
          color: '#673ab7'
        },
        {
          icon: 'send', // icon
          value: '发布',
          view: 'publish',
          color: '#536dfe'
        }, {
          icon: 'build', // icon
          value: '文章管理',
          view: 'articleManager',
          color: '#009688'
        }
      ],
      menuBar: false, // menu list toggle
      viewSet: 'publish'
    };
  },
  computed: {
    viewport () {
      return this.viewSet;
    }
  },
  methods: {
    changeView (item) {
      this.viewSet = item.view;
      this.menuBar = false;
    }
  },
  components: {
    Setting,
    Publish,
    ArticleManager
  }
};
</script>
<style lang="scss">
@import '@asset/css/common.scss';
.publish-wrap{
  .mu-item-title {
    padding-left: 10px;
  }
  .mu-chip {
    background: $color-pink;
    color: #fff;
    svg {
      color: #fff;
    }
  }
  .publish__content {
    margin: 20px;
  }
  .publish-form {
    padding: 30px;
    box-sizing: border-box;
    box-shadow: 4px 4px 20px $color-pink;
    margin-bottom: 10px;
  }
  .publish__footer{
    margin: 20px 0;
    text-align: center;
  }
}

</style>
