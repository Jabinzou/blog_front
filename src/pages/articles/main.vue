<template>
  <div class="main-body">
    <top-bar
      class="fixed"/>
    <div class="art-body">
      <h1>
        Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Magnam minima perferendis neque
        nostrum ipsum ea obcaecati accusamus aut, vero, quisquam harum consequatur,
        magni blanditiis. Deleniti architecto eum amet illo magni?
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis fuga numquam assumenda inventore optio quibusdam quaerat odio maxime dolores quia. Mollitia totam nostrum ipsum nemo eum non expedita sapiente laboriosam.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad mollitia ex pariatur error quam. Sit architecto officiis esse, iusto voluptates sequi dolorum rem perferendis magni voluptatum consequuntur. Dignissimos, illum maiores!
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur minima esse perferendis, totam repellendus placeat illo natus, iste ullam quos omnis dolorem nam sit quam nobis aspernatur inventore facere. Non.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, reprehenderit quia tempore libero veritatis, quas ullam, pariatur placeat cumque eius assumenda dicta aliquid doloribus ducimus iusto nam. Nihil, quisquam eum.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aperiam assumenda libero dolorem, quo quas animi nemo nulla ullam unde rerum cupiditate excepturi eligendi quae quidem, odio laudantium iusto cumque.
      </h1>
    </div>
    <bot-bar/>
  </div>
</template>
<script>
import { getArticle } from '@api';
import topBar from '@/components/topBar';
import botBar from '@/components/bottomBar';
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
    botBar
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
  .art-body {
    box-sizing: border-box;
    margin-top: 64px;
    min-height: calc(100% - 214px);
    overflow: auto;
  }
}

</style>
