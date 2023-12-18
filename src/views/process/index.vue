<template>
  <div>
    <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tab-change="onTabChange"
  >
  <VisitAnalysisBar/>
  </Card>
 <a-card style="width: 100%">
  <a-button class="editable-add-btn" @click="editalgorithm" style="margin-bottom: 8px" type="primary">编辑算法</a-button>
  <a-table bordered :data-source="dataSource" :columns="columns">
    <template #name="{ text, record }">
      <div class="editable-cell">
        <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
          <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
          <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ text || ' ' }}
          <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
        </div>
      </div>
    </template>
    <template #operation="{ record }">
      <a-popconfirm
        v-if="dataSource.length"
        title="Sure to stop?"
        @confirm="onDelete(record.key)"
      >
        <a>停止</a>
      </a-popconfirm>
    </template>
  </a-table>
     </a-card>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, Ref, ref, UnwrapRef } from 'vue';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';
import { Card } from 'ant-design-vue'; // 添加 Card 组件引用
import VisitAnalysisBar from '../dashboard/workbench/components/VisitAnalysisBar.vue';

  const activeKey = ref('tab2');

  const tabListTitle = [
    {
      key: 'tab2',
      tab: '资源消耗情况',
    },
  ];

  function onTabChange(key) {
    activeKey.value = key;
  }

interface DataItem {
  key: string;
  number: string;
  type: string;
  name: string;
}
export default defineComponent({
  components: {
    CheckOutlined,
    EditOutlined,
    Card,
    VisitAnalysisBar,
},
  setup() {
     const columns = [
      {
        title: '算法顺序',
        dataIndex: 'number',
        width: '30%',
        slots: { customRender: 'name' },
      },
        {
        title: '算法类型',
        dataIndex: 'type',
      },
      {
        title: '算法名称',
        dataIndex: 'name',
      },
      {
        title: '查看结果',
        dataIndex: 'check',
        slots: { customRender: 'operation' },
      },
    ];
    const dataSource: Ref<DataItem[]> = ref([
      {
        key: '0',
        number: '1',
        type: '预处理算法',
        name: '数据流算法',
      },
      {
        key: '0',
        number: '2',
        type: '预处理算法',
        name: '聚类分析',
      },
    ]);
    const count = computed(() => dataSource.value.length + 1);
    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

    const edit = (key: string) => {
      editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
    };
    const save = (key: string) => {
      Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
      delete editableData[key];
    };

    const onDelete = (key: string) => {
      dataSource.value = dataSource.value.filter(item => item.key !== key);
    };
    const handleAdd = () => {
      const newData = {
        key: `${count.value}`,
        number: `Edward King ${count.value}`,
        type:'2023-10-11',
        name: '未执行'
      };
      dataSource.value.push(newData);
    };

    const editalgorithm = () => {

    }

    return {
      columns,
      onDelete,
      handleAdd,
      dataSource,
      editableData,
      count,
      edit,
      save,
      editalgorithm,
      activeKey,
      tabListTitle,
      onTabChange
    };
  },
});
</script>
<style lang="less">
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
