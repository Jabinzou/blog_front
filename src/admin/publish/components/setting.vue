<template>
  <div class="publish-admin">
    <mu-container>
      <mu-data-table
        max-height="500"
        stripe
        :columns="tagColumns"
        :data="tags">
        <template slot-scope="scope">
          <td class="is-center">{{ scope.row.id }}</td>
          <td class="is-center">{{ scope.row.name }}</td>
          <td class="is-center">{{ moment(scope.row.createAt).format('YYYY-MM-DD HH:mm') }}</td>
        </template>
      </mu-data-table>
    </mu-container>
  </div>
</template>
<script>
import moment from 'moment';
import { getAllTags } from '@api';
export default {
  name: 'Setting',
  data () {
    return {
      moment,
      tagColumns: [
        { title: 'id', name: 'id', width: 140, align: 'center' },
        { title: 'name', name: 'name', width: 140, align: 'center' },
        { title: 'time', name: 'time', width: 140, align: 'center' }
      ],
      tags: [],
      cate: []
    };
  },
  methods: {
    async getTag () {
      const res = await getAllTags();
      this.tags = res.data.data.list;
    }
  },
  created () {
    // this.tags = getAllTags();
    this.getTag();
  }
};
</script>
<style lang="scss">
.publish-admin {
  table {
    width: 100% !important;
  }
}
</style>
