<template>
  <div class="com">
    <a-table
      bordered
      size="small"
      :columns="autoColumns">
    </a-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({

})
export default class XXX extends Vue {
  public get autoColumns() {
    return [
      {
        title: '名称',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '类型',
        key: 'type',
        dataIndex: 'type',
      },
    ];
  }
}
</script>

<style lang="scss" scoped>
.com {

}
</style>