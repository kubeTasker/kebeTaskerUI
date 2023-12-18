<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ t('sys.process.addprocess') }} </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: t('common.deleteConfirm'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <processDrawer @register="registerDrawer"  />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';
import processDrawer from './processDrawer.vue';
import { useDrawer } from '/@/components/Drawer/src/useDrawer';
import { columns } from './process.data';
import { deleteprocess, getprocessList } from '/@/api/sys/process';
import { BasicTable, useTable, TableAction } from '/@/components/Table';

export default defineComponent({
  components: {
    CheckOutlined,
    EditOutlined,
    processDrawer,
    BasicTable,
    TableAction,
  },
  setup() {
    const { t } = useI18n();
    const [registerDrawer,{openDrawer}] = useDrawer();
    const [registerTable, { reload }] = useTable({
        title: t('sys.process.process'),
        api: getprocessList,
        columns,
        formConfig: {
          labelWidth: 120,
        },
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: false,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 80,
          title: t('common.action'),
          dataIndex: 'action',
          fixed: undefined,
        },
      });

    const handleCreate = () => {
       openDrawer(true, {
          isUpdate: false,
        });
    };

    const editProcess = () => {

    }

    function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        const result = await deleteprocess({ ids: record.id }, 'notice');
        if (result.code === 0) {
          await reload();
        }
      }

    return {
      t,
      columns,
      useI18n,
      handleCreate,
      editProcess,
      processDrawer,
      registerDrawer,
      registerTable,
      useTable,
      handleEdit,
      handleDelete,
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
