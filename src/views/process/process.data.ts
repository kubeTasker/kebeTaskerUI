import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
  import  Icon  from '@/components/Icon/Icon.vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { getprocessList } from '/@/api/sys/process';
import { ColumnType } from 'ant-design-vue/lib/table';
import { ParentIdEnum } from '/@/enums/appEnum';

const { t } = useI18n();

export const processColumns: ColumnType[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 200,
    align: 'left',
  },
  {
    title: t('sys.process.name'),
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: t('sys.process.settime'),
    dataIndex: 'settime',
    width: 200,
    align: 'left',
  },
];

export const columns: BasicColumn[] = [
  {
    title: t('sys.process.id'),
    dataIndex: 'id',
    width: 100,
    align: 'left',
  },
  // {
  //   title: t('sys.menu.icon'),
  //   width: 50,
  //   customRender: ({ record }) => {
  //     return h(Icon, { icon: record.icon });
  //   },
  // },
  // {
  //   title: t('sys.menu.component'),
  //   dataIndex: 'component',
  //   width: 200,
  // },
  {
    title: t('sys.process.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('sys.process.settime'),
    dataIndex: 'settime',
    width: 100,
    customRender: ({ record }) => {
      const status = record.disabled;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.on') : t('common.off');
      return h(Tag, { color: color }, () => text);
    },
  },
  // {
  //   title: t('sys.menu.isHidden'),
  //   dataIndex: 'hideMenu',
  //   width: 80,
  //   customRender: ({ record }) => {
  //     const status = record.hideMenu;
  //     const enable = ~~status === 1;
  //     const color = enable ? 'green' : 'red';
  //     const text = enable ? t('common.yes') : t('common.no');
  //     return h(Tag, { color: color }, () => text);
  //   },
  // },
  // {
  //   title: t('common.createTime'),
  //   dataIndex: 'createdAt',
  //   width: 180,
  //   customRender: ({ record }) => {
  //     return formatToDateTime(record.createdAt);
  //   },
  // },
];

const isMenu = (type: Number) => type === 1;

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    required: true,
    rules: [{ max: 50 }],
  },
  {
    field: 'name',
    label: t('sys.process.name'),
    component: 'Input',
    required: true,
    rules: [{ max: 50 }],
  },
  {
    field: 'title',
    label: t('sys.menu.menuTitle'),
    component: 'Input',
    required: true,
    rules: [{ max: 50 }],
  },
  {
    field: 'icon',
    label: t('sys.menu.icon'),
    component: 'IconPicker',
    required: true,
  },
  {
    field: 'component',
    label: t('sys.menu.componentPath'),
    component: 'Input',
    required: true,
    rules: [{ max: 100 }],
    helpMessage: t('sys.menu.componentHelp'),
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'redirect',
    label: t('sys.menu.redirectPath'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.menuType),
    rules: [{ max: 300 }],
  },
  {
    field: 'frameSrc',
    label: t('sys.menu.frameSrc'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.menuType),
    rules: [{ max: 300 }],
  },
];
