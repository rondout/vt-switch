<script lang="ts" setup>
import { Input, Button } from "ant-design-vue";
import { ChangeEvent } from "ant-design-vue/es/_util/EventInterface";
import { nanoid } from "nanoid";
import { onUnmounted } from "vue";

let isMounted = true;
let show = $ref(true);

const htmlId = nanoid();

interface UploadButtonProps {
  loading?: boolean;
  title?: string;
  accept?: string;
  onFileChange(e: FileList): void;
}

onUnmounted(() => {
  isMounted = false;
});

const props = defineProps<UploadButtonProps>();

const onChange = (e: ChangeEvent) => {
  show = false;
  // @ts-ignore
  props.onFileChange(e.target.files);
  Promise.resolve().then(() => {
    if (isMounted) {
      show = true;
    }
  });
};
</script>

<template>
  <label :for="'contained-button-file' + htmlId">
    <input
      style="display: none"
      v-if="show"
      multiple
      :disabled="props.loading"
      :accept="props.accept || '*'"
      :id="'contained-button-file' + htmlId"
      @change="onChange"
      type="file"
    />
    <span class="custom-ant-btn-primary" v-if="!props.loading">
      <slot>
        {{ $t("upload") }}
      </slot>
    </span>
    <Button v-else disabled type="primary" loading>
      <slot>
        {{ $t("upload") }}
      </slot>
    </Button>
  </label>
</template>

<style scoped lang="scss"></style>
