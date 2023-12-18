<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'id'">
        <span> 工程编号 </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === '已完成' ? 'volcano' : tag.length > 2 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-button>查看</a-button>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
  import axios from 'axios';
  import { ref } from 'vue';

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '工程名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '资源消耗',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: 'CPU核数',
      dataIndex: 'cpuNum',
      key: 'cpuNum',
    },
    {
      title: '工程状态',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: '查看详情',
      key: 'action',
    },
  ];
   const data = ref([
      {
        key: '0',
        id:'1',
        name:'工程1',
        cost: '150',
        cpuNum:'6',
        tags:'进行中',
      },
      {
        key: '0',
        id:'2',
        name:'工程2',
        cost: '180',
        cpuNum:'8',
        tags:'已完成',
      },
    ]);

  const load = async () => {
    try {
      let response = await axios('http://localhost:3003/posts');
      data.value = response.data;
      console.log(data.value);
    } catch (error) {
      console.log(error);
    }
  };
  load();
</script>
