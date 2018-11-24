<template>
  <div class="menu-bot">
    <ul>
      <li>
        <p class="menu-bot--title">欢迎来到小可爱的星系！</p>
      </li>
      <li>
        <mu-badge color="transparent">
          JabinZou
          Copyright
          <span
            style="font-size: 20px; color: #e91e63;"
            slot="content">&copy;</span>
        </mu-badge>
      </li>
      <li>
        <p>Powered by
          <a
            href="https://cn.vuejs.org/"
            class="green">vue</a>
          and
          <a
            href="https://cn.vuejs.org/"
            class="red">nestjs</a>
        </p>
      </li>
      <li><mu-button
        v-for="(item, index) in iconList"
        :key="index"
        target="_blank"
        :href="item.link"
        icon>
        <mu-icon
          :value="item.icon"/>
    </mu-button></li></ul>
  </div>
</template>
<script>
export default {
  name: 'BotBar',
  data () {
    return {
      iconList: [
        {
          icon: ':iconfont icon-github',
          link: 'https://github.com/Jabinzou'
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@import '@asset/css/common.scss';
.menu-bot {
  text-align: center;
  background: $color-black;
  color: #fff;
  ul {
    padding: 10px;
  }
  li {
    line-height: 20px;
    min-height: 26px;
    text-align: center;
  }
  .mu-badge-float{
    right: -24px;
  }
  .green {
    color: $color-green;
  }
  .red {
    color: $color-nest;
  }
}
</style>
