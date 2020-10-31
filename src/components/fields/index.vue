<template>
  <div class="com">
    <div style="margin-left: 40px;width: 600px">
      <XFuck />
    </div>
    <a-table
      bordered
      size="small"
      :pagination="false"
      :showHeader="showHeader"
      :columns="autoColumns"
      :dataSource="autoList">
      <p slot="expandedRowRender" slot-scope="row">
        <Field :showHeader="false" :struct="row.struct" />
      </p>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IJsObj } from './IJsObj';
import testJson from './test.json';
import { StructType } from './type';
import { Struct } from '@wrule/shuji/dist/struct/index';
import * as FromJS from '@wrule/shuji/dist/struct/fromJs';
import { StructObject } from '@wrule/shuji/dist/struct/object';
import { StructArray } from '@wrule/shuji/dist/struct/array';
import { StructTuple } from '@wrule/shuji/dist/struct/tuple';
import { StructUnion } from '@wrule/shuji/dist/struct/union';

import XFuck from '@/components/fuck'

@Component({
  name: 'Field',
  components: {
    XFuck,
  },
})
export default class Field extends Vue {
  @Prop({
    default() {
      return FromJS.FromJsHub(testJson as any)
    }
  }) private readonly struct!: Struct;
  @Prop({ default: true }) private readonly showHeader!: boolean;

  public get autoListObject() {
    const object = this.struct as StructObject;
    return Array.from(object.Fields).map(([name, struct]) => ({
      name: struct.Desc,
      type: struct.TsName,
      struct,
    }));
  }

  public get autoListArray() {
    const array = this.struct as StructArray;
    return [
      {
        name: array.ElementStruct.Desc,
        type: array.ElementStruct.TsName,
        struct: array.ElementStruct,
      },
    ];
  }

  public get autoListTuple() {
    const tuple = this.struct as StructTuple;
    return tuple.ElementsStruct.map((struct) => ({
      name: struct.Desc,
      type: struct.TsName,
      struct,
    }));
  }

  public get autoListUnion() {
    const union = this.struct as StructUnion;
    return union.Members.map((struct) => ({
      name: struct.Desc,
      type: struct.TsName,
      struct,
    }));
  }

  public get autoList() {
    switch (this.struct.Type) {
      case StructType.Object: return this.autoListObject;
      case StructType.Array: return this.autoListArray;
      case StructType.Tuple: return this.autoListTuple;
      case StructType.Union: return this.autoListUnion;
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
        title: '备注',
        key: 'remark',
        dataIndex: 'remark',
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
  :global(.ant-table-body) {
    margin: 0px 0px;
  }
}
</style>