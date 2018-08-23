<template>
  <h1>123</h1>
</template>
<script>
import { getList } from '@api';
export default {
  data() {
    return{

    }
  },
  async created() {
    await getList();
  }
}
</script>
<style lang="scss" scoped>

</style>


