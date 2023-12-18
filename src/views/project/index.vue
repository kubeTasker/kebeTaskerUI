<template>
  <div>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleCreate">新建工程</a-button>
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
        <a-button type="primary" ghost  @click="editProcess">编辑</a-button>
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.key)"
        >
          <a-button type="primary" ghost>删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <div>
    <projectDrawer @register="register" />
  </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, Ref, ref, UnwrapRef } from 'vue';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';
import { useDrawer } from '../../components/Drawer';
import projectDrawer from './projectDrawer.vue';
import { Recordable } from '../../../packages/types/src';

interface DataItem {
  key: string;
  name: string;
  time: string;
}

export default defineComponent({
  components: {
    CheckOutlined,
    EditOutlined,
    projectDrawer,
  },
  setup() {
     const [register, { openDrawer }] = useDrawer();
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }
    const columns = [
      {
        title: '工程名称',
        dataIndex: 'name',
        width: '30%',
        slots: { customRender: 'name' },
      },
        {
        title: '开始时间',
        dataIndex: 'time',
      },
      {
        title: '查看',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
      },
    ];
    const dataSource: Ref<DataItem[]> = ref([
      {
        key: '0',
        name: '工程1',
        time: '2023-10-24',
      },
      {
       key: '0',
        name: '工程2',
        time: '2023-10-24',
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
    // const handleAdd = () => {
    //   const newData = {
    //     key: `${count.value}`,
    //     name: `Edward King ${count.value}`,
    //     time:'2023-10-11',
    //     state: '未执行'
    //   };
    //   dataSource.value.push(newData);
    // };

    const editProcess = () => {

    }

    return {
      columns,
      onDelete,
      dataSource,
      editableData,
      count,
      edit,
      save,
      editProcess,
      handleCreate,
      handleEdit,
      register,
      openDrawer,
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
