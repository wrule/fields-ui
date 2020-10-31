import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './table.module.scss'

@Component
export default class XFuck extends Vue {

  private get autoColumns() {
    return [
      {
        title: '字段名称',
        key: 'name',
        dataIndex: 'name',
        width: 150,
        scopedSlots: { customRender: "name" }
      },
      {
        title: '类型',
        key: 'type',
        dataIndex: 'type',
        scopedSlots: { customRender: "type" }
      },
      { title: '备注', key: 'remark', dataIndex: 'remark' },
      { title: '操作', key: 'opts', dataIndex: 'opts' },
    ];
  }

  private get autoList() {
    return [
      { name: '1', type: '1', remark: '1' },
      { name: '2', type: '2', remark: '2' },
      { name: '3', type: '3', remark: '3' },
    ];
  }

  private expandIcon(row: any) {
    return <a-icon slot="expandIcon" type="right" />;
  }

  public render(): VNode {
    return (
      <a-table
        class={style.table}
        size="small"
        bordered={true}
        pagination={false}
        columns={this.autoColumns}
        dataSource={this.autoList}
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
          expandedRowRender: (row: any) => {
            return <span>{row.name}</span>
          },
          // expandIcon: (row: any) => {
          //   return <a-icon type="right" />
          // },
        }}>
        {/* <a-icon slot="expandIcon" type="right" /> */}
      </a-table>
    );
  }
}
