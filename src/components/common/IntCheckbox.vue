<script lang="ts" setup>
import { Checkbox } from "ant-design-vue";
import { IntBool } from "@/models/base.model";
import { CheckboxChangeEvent } from "ant-design-vue/es/checkbox/interface";

const { checked = IntBool.FALSE } = defineProps<{
  checked: IntBool;
}>();

const emits = defineEmits<{
  (e: "update:checked", value: IntBool): void;
}>();

const booleanChecked = $computed(() => checked === IntBool.TRUE);

const handleChange = (e: CheckboxChangeEvent) => {
  emits("update:checked", e.target.checked ? IntBool.TRUE : IntBool.FALSE);
};
</script>

<template>
  <Checkbox :checked="booleanChecked" @change="handleChange">
    <slot></slot>
  </Checkbox>
</template>

<style scoped lang="scss"></style>
