<script lang="ts" setup>
import { themeColor } from "@/util";

// const { icon } = withDefaults(defineProps<{ icon: string }>(), { icon: "ic_edit" })
const {
  icon = "ic_edit",
  size = 24,
  pointer = true,
  mr = 1,
  ml = 0,
  color = "#000000A6",
  primary = false,
  disabled = false,
} = defineProps<{
  icon: string;
  size?: number;
  mr?: number;
  ml?: number;
  pointer?: boolean;
  primary?: boolean;
  disabled?: boolean;
  color?: string;
}>();
// const { icon } = props
const iconStyle = $computed(() => {
  const sizePx = size + "px";
  const cursor = pointer ? "pointer" : undefined;
  const marginRight = mr * 8 + "px";
  const marginLeft = ml * 8 + "px";
  const result = {
    width: sizePx,
    height: sizePx,
    fontSize: sizePx,
    cursor,
    marginRight,
    marginLeft,
    color: primary ? themeColor : color,
  };
  if (disabled) {
    result.color = "rgba(0, 0, 0, 0.25)";
  }
  return result;
});

// const icon = toRef(props.icon)
</script>

<template>
  <i :style="iconStyle" :class="'iconfont icon-' + icon"></i>
</template>

<style>
.iconfont {
  line-height: 1;
}
</style>
