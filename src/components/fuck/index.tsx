import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './table.module.scss'

@Component
export default class XFuck extends Vue {
  @Prop({ default: 'id' }) private readonly rowKey!: string;

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
        customCell: (record: any) => {
          return {
            class: style.editable_td,
          };
        },
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
        scopedSlots: { customRender: "opts" },
      },
    ];
  }

  private get autoList() {
    return [
      { id: '1', name: '1', type: '1', remark: '1' },
      { id: '2', name: '2', type: '2', remark: '2' },
      { id: '3', name: '3', type: '3', remark: '3' },
    ];
  }

  private getRowExpandIcon(row: any) {
    return <div
      class={style.expand_inner}
      onClick={() => this.handleExpandClick(row)}>
      <a-icon
        slot="expandIcon"
        class={style.expand_icon}
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
      <a-table
        rowKey={this.rowKey}
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
            return <a-input v-model={row.name} />
          },
          type: (value: any, row: any) => {
            return <a-select>
              <a-select-option key="1">1</a-select-option>
              <a-select-option key="2">2</a-select-option>
            </a-select>
          },
          remark: (value: any, row: any) => {
            return <a-input-number v-model={row.remark} />
          },
          expandedRowRender: (row: any) => {
            return <span>{row.name}</span>
          },
        }}>
      </a-table>
    );
  }
}
