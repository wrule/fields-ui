<template>
  <div class="com">
    <a-table
      bordered
      size="small"
      :pagination="false"
      :showHeader="showHeader"
      :columns="autoColumns"
      :dataSource="autoList">
      <p slot="expandedRowRender" slot-scope="record">
        <Field :showHeader="false" :field="record.struct" />
      </p>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IJsObj } from './IJsObj';
import testJson from './test.json';
import { StructType } from './type';

@Component({
  name: 'Field',
})
export default class Field extends Vue {
  @Prop({ default() { return testJson; }}) private readonly field!: IJsObj;
  @Prop({ default: true }) private readonly showHeader!: boolean;


  public get autoListObject() {
    return this.field.fields?.map(([name, struct]) => ({
      name,
      type: struct.type.toLowerCase(),
      struct,
    }));
  }

  public get autoListArray() {
    return this.field.element ? [this.field.element] : [];
  }

  public get autoListTuple() {
    return this.field.elements?.map((struct, index) => ({
      name: (index + 1).toString(),
      type: struct.type.toLowerCase(),
      struct,
    }));
  }

  public get autoListUnoin() {
    return this.field.members?.map((struct, index) => ({
      name: (index + 1).toString(),
      type: struct.type.toLowerCase(),
      struct,
    }));
  }

  public get autoList() {
    switch (this.field.type) {
      case StructType.Object: return this.autoListObject;
      case StructType.Array: return this.autoListArray;
      case StructType.Tuple: return this.autoListTuple;
      case StructType.Undefined: return this.autoListUnoin;
      default: return [];
    }
  }

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
      {
        title: '操作',
        key: 'opts',
        dataIndex: 'opts',
        align: 'center',
        width: 80,
      },
    ];
  }
}
</script>

<style lang="scss" scoped>
.com {

}
</style>