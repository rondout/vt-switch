<script setup lang="ts">
import { themeColor } from "@/util";
import { Button } from "ant-design-vue";
import { reactive, nextTick } from "vue";

const props = defineProps<{ accept?: string }>();

const emits = defineEmits<{ (e: "fileChange", value: File): void }>();

const data = reactive({
  borderColor: null,
  file: null as File,
  fileName: "",
  show: true,
});

const handleFile = (file: File) => {
  data.file = file;
  data.fileName = file.name;
  emits("fileChange", file);
};

const preventDefaultEvent = (e: DragEvent) => {
  e.preventDefault();
  data.borderColor = null;
};

const onDragOver = (e: DragEvent) => {
  e.preventDefault();
  data.borderColor = themeColor;
};

const onDrop = (e: DragEvent) => {
  data.borderColor = null;
  e.stopPropagation();
  e.preventDefault();
  const files = e.dataTransfer.files;
  const file = files[0];
  if (!file) {
    return;
  }
  handleFile(file);
};

const onFileChange = (e: Event) => {
  data.show = false;
  handleFile((e.target as HTMLInputElement).files[0]);
  nextTick(() => {
    setTimeout(() => {
      data.show = true;
    }, 500);
  });
};

const handleClear = () => {
  setTimeout(() => {
    data.file = null;
    data.fileName = "";
  }, 100);
};

defineExpose({
  handleClear,
});
</script>

<template>
  <label for="upload-id">
    <div
      class="upload-container flex"
      :style="{ borderColor: data.borderColor }"
      @dragleave="preventDefaultEvent"
      @dragenter="preventDefaultEvent"
      @dragover="onDragOver"
      @drop="onDrop"
      ref="select_frame"
    >
      <slot>
        <div style="width: 100%; height: 100%" v-if="data.fileName">
          <slot name="hasFile">
            <p class="title1">
              {{ data.fileName }}
            </p>
          </slot>
        </div>
        <div class="flex flex-column" v-else>
          <img :width="64" :height="64" src="@/assets/img/upload.png" alt="" />
          <div class="body1" :style="{ margin: '14px 16px', width: '210px' }">
            {{ $t("dragUploadTip") }}
          </div>
          <Button v-show="false"></Button>
          <span class="custom-ant-btn-primary">
            <slot name="title">
              {{ $t("upload") }}
            </slot>
          </span>
        </div>
      </slot>
    </div>
    <input
      v-if="data.show && !data?.fileName"
      @change="onFileChange"
      :accept="props.accept"
      style="display: none"
      type="file"
      name=""
      id="upload-id"
    />
  </label>
</template>

<style scoped lang="scss">
@import "../../assets/base.scss";
.upload-container {
  width: 560px;
  height: 236px;
  background-color: #fafafa;
  border-radius: 6px;
  border: 1px dashed #00000026;
}
.upload-container:hover {
  border-color: $primary !important;
}
</style>
