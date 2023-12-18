<template>
  <BasicDrawer v-bind="$attrs"  @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
import { computed, defineComponent, ref, unref } from "vue";
import { BasicDrawer, useDrawerInner } from "/@/components/Drawer";
import { useI18n } from "vue-i18n";
import { updateRole, createRole } from "/@/api/sys/role";
import { BasicForm, useForm } from '/@/components/Form/index';
import { formSchema } from './project.data';

export default defineComponent({
  components: { BasicDrawer,BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }){
    const isUpdate = ref(true);
    const { t } = useI18n();

     const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

    async function handleSubmit() {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        values['id'] = unref(isUpdate) ? Number(values['id']) : 0;
        let result = unref(isUpdate) ? await updateRole(values) : await createRole(values);
        if (result.code === 0) {
          childrenDrawer.value = false;
          closeDrawer();
          emit('success');
        }
        setDrawerProps({ confirmLoading: false });
    }

    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

    const getTitle = computed(() =>
      !unref(isUpdate) ? t('sys.project.addproject') : t('sys.project.editproject'),
    );
    return{
      handleSubmit,
      t,
      getTitle,
      registerDrawer,
      isUpdate,
      registerForm,
    }
  }
});
</script>
