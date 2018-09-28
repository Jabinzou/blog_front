<template>
  <div class="publish-admin">
    <mu-container>
      <mu-dialog
        title="请添加需要的内容"
        width="600"
        max-width="80%"
        :esc-press-close="false"
        :overlay-close="false"
        :open.sync="openAlert">
        <mu-form
          ref="form"
          :model="contentInput"
          class="mu-demo-form">
          <mu-form-item
            label="content"
            help-text=""
            prop="name"
            :rules="rules">
            <mu-text-field
              v-model="contentInput.name"
              prop="name"/>
          </mu-form-item>
        </mu-form>
        <mu-button
          slot="actions"
          color="primary"
          @click="openAlert=false">cancel</mu-button>
        <mu-button
          slot="actions"
          color="success"
          @click="addContent"
          :disabled="!contentInput.name">confirm</mu-button>
      </mu-dialog>
      <mu-dialog
        title="确定此操作？"
        width="600"
        max-width="80%"
        :esc-press-close="false"
        :overlay-close="false"
        :open.sync="operateAlert">
        <mu-icon
          right
          size="36"
          color="#fbc02d"
          value="error"/>
        确认此操作?
        <mu-button
          slot="actions"
          flat
          color="#aa00ff"
          @click="operateAlert=false">取消</mu-button>
        <mu-button
          slot="actions"
          flat
          color="#aa00ff"
          @click="deleteConfirm('tag')">确定</mu-button>
      </mu-dialog>
      <mu-tabs
        :value.sync="active"
        inverse
        color="secondary"
        text-color="rgba(0, 0, 0, .8)"
        center>
        <mu-tab>Tag(标签)</mu-tab>
        <mu-tab>Category(分类)</mu-tab>
      </mu-tabs>
      <div class="publish-tool">
        <mu-button
          color="rgb(244, 67, 54)"
          :disabled="!selects.length"
          @click="operateAlert=true">
          delete
          <mu-icon
            right
            value="delete"/>
        </mu-button>
        <mu-button
          color="primary"
          @click="openAlert=true">
          add
          <mu-icon
            right
            value="add"/>
        </mu-button>
      </div>
      <template v-if="active === 0">
        <mu-data-table
          max-height="700"
          selectable
          select-all
          :selects.sync="selects"
          checkbox
          stripe
          :columns="tagColumns"
          :data="tags">
          <template slot-scope="scope">
            <td class="is-center">{{ scope.row.id }}</td>
            <td class="is-center">{{ scope.row.name }}</td>
            <td class="is-center">{{ moment(scope.row.createAt).format('YYYY-MM-DD HH:mm') }}</td>
          </template>
        </mu-data-table>
      </template>
      <template v-if="active === 1">
        <mu-data-table
          max-height="700"
          selectable
          select-all
          :selects.sync="selects"
          checkbox
          stripe
          :columns="cateColumns"
          :data="cateData">
          <template slot-scope="scope">
            <td class="is-center">{{ scope.row.id }}</td>
            <td class="is-center">{{ scope.row.name }}</td>
            <td class="is-center">{{ moment(scope.row.createAt).format('YYYY-MM-DD HH:mm') }}</td>
          </template>
        </mu-data-table>
      </template>
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
      selects: [],
      moment,
      openAlert: false, // 添加操作弹窗
      operateAlert: false, // 删除操作确认弹窗
      active: 0,
      contentInput: {
        name: ''
      },
      rules: [
        { validate: (val) => !!val, message: '请输入内容' }
      ],
      tagColumns: [
        { title: 'id', name: 'id', width: 140, align: 'center' },
        { title: 'name', name: 'name', width: 140, align: 'center' },
        { title: 'time', name: 'time', width: 140, align: 'center' }
      ],
      cateColumns: [
        { title: 'id', name: 'id', width: 140, align: 'center' },
        { title: 'name', name: 'name', width: 140, align: 'center' },
        { title: 'time', name: 'time', width: 140, align: 'center' }
      ],
      tags: [],
      cateData: []
    };
  },
  watch: {
    active (val) {
      this.selects = [];
    }
  },
  methods: {
    /**
     * @description 添加标签或者分类
     */
    addContent () {

    },
    /**
     * @description 删除确认
     */
    deleteConfirm (val) {

    },
    /**
     * @description 获取标签列表
     */
    async getTag () {
      const res = await getAllTags();
      this.tags = res.data.data.list || [];
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
  .publish-tool {
    margin: 16px;
  }
  table {
    width: 100% !important;
  }
}
</style>
