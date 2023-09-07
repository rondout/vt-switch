<template>
  <Table
    :row-key="rowKey"
    :row-selection="rowSelection"
    :pagination="pagination"
    :scroll="{ x: 'auto', y: scrollY }"
    :columns="columns"
    :loading="loading"
    :data-source="dataSource"
  >
    <template v-slot:headerCell="{ column }">
      <span
        class="title2"
        :style="{ whiteSpace: 'nowrap', fontWeight: 'normal' }"
        >{{ $t(column.title as string) }}</span
      >
    </template>

    <template v-slot:bodyCell="{ column, record }">
      <template v-for="slotName of slots">
        <slot
          v-if="slotName === column.dataIndex"
          :name="slotName"
          :column="column"
          :record="record"
        ></slot>
      </template>
      <span v-if="!slots.includes(column.dataIndex as string)">{{
        parseDefaultValue(record, column.dataIndex as string)
      }}</span>
    </template>
  </Table>
</template>

<script lang="ts" setup>
import { Table, TablePaginationConfig, TableProps } from "ant-design-vue";
import { TableColumns } from "@/models/base.model";
import { isNull } from "@/util";

const {
  columns,
  dataSource,
  slots = [],
  pagination = false,
  scrollY,
  rowSelection = undefined,
  rowKey,
  loading,
} = defineProps<{
  columns: TableColumns[];
  pagination?: false | TablePaginationConfig;
  dataSource: any[];
  slots?: string[];
  scrollY?: number;
  rowSelection?: TableProps["rowSelection"];
  rowKey?: string;
  loading?: boolean;
}>();

const parseDefaultValue = (record: Record<string, any>, dataIndex: string) => {
  const dataIndexs = dataIndex.split(".");
  let result = record;
  dataIndexs.forEach((element) => {
    if (result) {
      result = result[element];
    }
  });
  if (isNull(result)) {
    return "-";
  }
  return result;
};
</script>
