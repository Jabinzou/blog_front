<template>
  <div class="menu">
    <mu-appbar
      style="width: 100%;"
      color="#ff4081">
      <mu-avatar>
        <img src="@asset/img/avatar.jpeg">
      </mu-avatar>
      小可爱的星系
      <div
        slot="right"
        class="btn-group">
        <mu-button
          flat
          color="secondary">首页</mu-button>
        <mu-button
          flat
          color="secondary">总览</mu-button>
      </div>

    </mu-appbar>
  </div>
</template>
<script>
export default {
  name: 'TopBar'
};
</script>
<style lang="scss">
.menu {
  .btn-group {
    height: 100%;;
  }
  .mu-appbar-title {
    font-size: 20px;
  }
  .mu-avatar {
    vertical-align: middle;
    margin-right: 6px;
  }
}
</style>
