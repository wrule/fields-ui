import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './table.module.scss'
import testJson from './test.json';
import { IJsObj } from '@wrule/shuji/dist/struct/IJsObj';
import { StructType } from '@wrule/shuji/dist/struct/type';
import { Struct } from '@wrule/shuji/dist/struct/index';
import * as FromJS from '@wrule/shuji/dist/struct/fromJs';
import { StructObject } from '@wrule/shuji/dist/struct/object';
import { StructArray } from '@wrule/shuji/dist/struct/array';
import { StructTuple } from '@wrule/shuji/dist/struct/tuple';
import { StructUnion } from '@wrule/shuji/dist/struct/union';

@Component
export default class XFuck extends Vue {
  @Prop({ default: 'id' }) private readonly rowKey!: string;
  @Prop({
    default() {
      return FromJS.FromJsHub(testJson as any)
    }
  }) private readonly struct!: Struct;
  @Prop({ default: true }) private readonly showHeader!: boolean;

  private get autoColumns() {
    return [
      {
        title: '字段名称',
        key: 'name',
        dataIndex: 'name',
        width: 150,
        customCell: (record: any) => {
          return {
            class: style.editable_td,
          };
        },
        scopedSlots: { customRender: "name" }
      },
      {
        title: '类型',
        key: 'type',
        dataIndex: 'type',
        width: 150,
        // customCell: (record: any) => {
        //   return {
        //     class: style.editable_td,
        //   };
        // },
        scopedSlots: { customRender: "type" }
      },
      {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark',
        customCell: (record: any) => {
          return {
            class: style.editable_td,
          };
        },
        scopedSlots: { customRender: "remark" },
      },
      {
        title: '操作',
        key: 'opts',
        dataIndex: 'opts',
        width: 100,
        scopedSlots: { customRender: "opts" },
      },
    ];
  }

  /**
   * 对象结构的字段列表
   */
  public get autoListObject() {
    const object = this.struct as StructObject;
    return Array.from(object.Fields).map(([name, struct]) => ({
      name: struct.Desc,
      type: struct.TsName,
      struct,
    }));
  }

  /**
   * 数组结构的元素列表
   */
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

  /**
   * 元组结构的元素列表
   */
  public get autoListTuple() {
    const tuple = this.struct as StructTuple;
    return tuple.ElementsStruct.map((struct) => ({
      name: struct.Desc,
      type: struct.TsName,
      struct,
    }));
  }

  /**
   * 联合结构的成员列表
   */
  public get autoListUnion() {
    const union = this.struct as StructUnion;
    return union.Members.map((struct) => ({
      name: struct.Desc,
      type: struct.TsName,
      struct,
    }));
  }

  /**
   * 列表数据
   */
  public get autoList() {
    let result: any[] = [];
    switch (this.struct.Type) {
      case StructType.Object: result = this.autoListObject; break;
      case StructType.Array: result = this.autoListArray; break;
      case StructType.Tuple: result = this.autoListTuple; break;
      case StructType.Union: result = this.autoListUnion; break;
      default: result = []; break;
    }
    return result.map((item, index) => ({
      id: index,
      ...item,
    }));
  }


  private getRowExpandIcon(data: any) {
    return <div
      class={style.expand_inner}
      onClick={() => this.handleExpandClick(data)}>
      <a-icon
        slot="expandIcon"
        class={[style.expand_icon, data.expanded ? style.expanded : '']}
        type="right"
      />
    </div>
  }

  private handleExpandClick(data: any) {
    const record = data.record;
    const key = record[this.rowKey];
    const index = this.expandedRowKeys.findIndex((item) => item === key);
    if (data.expanded) {
      if (index > -1) {
        this.expandedRowKeys.splice(index, 1);
      }
    } else {
      if (index < 0) {
        this.expandedRowKeys.push(key);
      }
    }
  }

  private expandedRowKeys: any[] = [];

  public render(): VNode {
    return (
      <div>
        <a-descriptions title={`${this.struct.Type}${this.struct.IsBasic ? ' (基本类型)' : '(构造类型)'}`}>
          <a-descriptions-item label="字段名称">
            {this.struct.Desc}
          </a-descriptions-item>
          <a-descriptions-item label="字段类型">
            {this.struct.TsName}
          </a-descriptions-item>
          <a-descriptions-item label="结构Hash">
            {this.struct.Hash}
          </a-descriptions-item>
        </a-descriptions>
        <a-table
          rowKey={this.rowKey}
          showHeader={this.showHeader}
          class={style.table}
          size="small"
          bordered={true}
          pagination={false}
          columns={this.autoColumns}
          dataSource={this.autoList}
          expandIcon={this.getRowExpandIcon}
          expandedRowKeys={this.expandedRowKeys}
          scopedSlots={{
            name: (value: any, row: any) => {
              return <a-input v-model={row.name} />;
            },
            type: (value: any, row: any) => {
              return value;
            },
            remark: (value: any, row: any) => {
              return <a-input v-model={row.remark} />;
            },
            expandedRowRender: (row: any) => {
              return <XFuck
                struct={row.struct}
              />;
            },
          }}>
        </a-table>
      </div>
    );
  }
}
