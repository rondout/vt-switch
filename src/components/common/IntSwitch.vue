<script lang="ts" setup>
import { Switch } from "ant-design-vue";
import { IntBool } from "@/models/base.model";

const { checked = IntBool.FALSE } = defineProps<{
  checked: IntBool;
}>();

const emits = defineEmits<{
  (e: "update:checked", value: IntBool): void;
}>();

const booleanChecked = $computed(() => checked === IntBool.TRUE);

const handleChange = (checkedValue: boolean | number | string) => {
  emits("update:checked", checkedValue ? IntBool.TRUE : IntBool.FALSE);
};
</script>

<template>
  <Switch v-model:checked="booleanChecked" @change="handleChange">
    <slot></slot>
  </Switch>
</template>

<style scoped lang="scss"></style>
