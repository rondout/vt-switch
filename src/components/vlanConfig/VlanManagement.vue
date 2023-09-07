<script lang="ts" setup>
import VlanConfig from "@/views/VlanConfig.vue";
import { Button, Input, InputNumber, message, Modal } from "ant-design-vue";
import { reactive, watch } from "vue";
import vlanonfigController from "@/controllers/vlanConfig.controller";
import useDataFetch from "@/hooks/useDataFetch";
import CommonTable from "../common/CommonTable.vue";
import { NoPaddingTableColumns, TableColumns } from "@/models/base.model";
import Iconfont from "../layouts/Iconfont.vue";
import { TableRowSelection } from "ant-design-vue/es/table/interface";
import { VlanInfo } from "@/models/vlanConfig.model";
import { $deleteConfirm } from "@/util";
import EditButtons from "../common/EditButtons.vue";
import { useI18n } from "vue-i18n";
import { number } from "@intlify/core-base";

enum OperationType {
  EDIT,
  DELETE,
}

const { t } = useI18n();

const data = useDataFetch(vlanonfigController.getVlanList, true);

const state = reactive({
  selectedVlanIds: [],
  onOperationVlan: undefined as VlanInfo,
  operationType: null as OperationType,
  addModalOpen: false,
  confirmLoading: false,
  editData: {
    vlan_id: undefined,
    vlan_name: undefined,
  },
});

const handleDelete = (vlan: VlanInfo) => {
  state.onOperationVlan = vlan;
  state.operationType = OperationType.DELETE;
  $deleteConfirm({
    title: t("vlan.deleteVlanTitle", { name: vlan.vlan_name }),
    // content: t("deleteContent"),
    onOk() {
      const result = vlanonfigController.deleteVlans([vlan.vlan_id]);
      result.then(() => {
        message.success(t("deleteSuccessed"));
        data.refresh();
        state.selectedVlanIds = [];
      });
      return result;
    },
  });
};

const restoreEditData = () => {
  state.editData = { vlan_id: undefined, vlan_name: undefined };
};

const handleEdit = (vlan: VlanInfo) => {
  state.operationType = OperationType.EDIT;
  restoreEditData();
  state.onOperationVlan = vlan;
};

const handleSelectChange: TableRowSelection["onSelect"] = (ids: number[]) => {
  state.selectedVlanIds = ids;
};

const columns = [
  new NoPaddingTableColumns("vlan.vlanId", "vlan_id"),
  new NoPaddingTableColumns("vlan.vlanName", "vlan_name"),
  new NoPaddingTableColumns("", "operation", undefined, 240),
];

const deleteDisabled = $computed(() => !state.selectedVlanIds.length);

const handleMultiDelete = (vlanIds?: number[]) => {
  let toBedeletedVlanIds: number[] = [];
  if (vlanIds) {
    toBedeletedVlanIds = vlanIds;
  } else {
    toBedeletedVlanIds = data.clonedData.value
      .filter((v) => state.selectedVlanIds.includes(v.nanoid))
      .map((v) => v.vlan_id);
  }
  $deleteConfirm({
    title: t("vlan.deleteTitle", { count: toBedeletedVlanIds.length }),
    onOk() {
      const result = vlanonfigController.deleteVlans(toBedeletedVlanIds);
      result.then(() => {
        message.success(t("deleteSuccess"));
        data.refresh();
        state.selectedVlanIds = [];
      });
      return result;
    },
  });
  // const vlanIds = (vlans || state.selectedVlanIds).map(v => v.)
};

const handleEditOk = (vlan: VlanInfo) => {
  // state.onOperationVlan = undefined;
  // data.setEditDataToOriginData();
  const { vlan_id, vlan_name } = vlan;
  vlanonfigController
    .modifyVlan({ vlan_id, vlan_name })
    .then((res) => {
      state.onOperationVlan = undefined;
      data.setEditDataToOriginData();
    })
    .catch((err) => {});
};

const handleEditCancel = (vlan: VlanInfo) => {
  state.onOperationVlan = undefined;
  data.resetData();
};

const checkOperationDisabled = (vlan: VlanInfo) => {
  return (
    vlan.vlan_id == 1 ||
    (state.onOperationVlan?.nanoid === vlan.nanoid &&
      state.operationType === OperationType.EDIT)
  );
};

const handleAddVlanClick = () => {
  state.addModalOpen = true;
};

const hanldeAddVlanCancel = () => {
  state.addModalOpen = false;
  restoreEditData();
};

const hanldeAddVlanOk = () => {
  const { vlan_id, vlan_name } = state.editData;
  if (!vlan_id || !vlan_name) {
    message.error(t("vlan.addError"));
    return;
  }
  state.confirmLoading = true;
  const result = vlanonfigController.addVlan({ vlan_id, vlan_name });
  result
    .then((res) => {
      if (parseInt(res.errCode) !== 0) {
        message.error(t('vlan.addFailed'))
      }else {
        hanldeAddVlanCancel();
        data.refresh();

      }
      state.confirmLoading = false;
    })
    .catch(() => {
      state.confirmLoading = false;
    });
  return result;
};

const isEdit = $computed(() => state.operationType === OperationType.EDIT);
</script>

<template>
  <VlanConfig>
    <template #rightExtra>
      <div style="bottom: 12px" class="flex-start relative-position">
        <Button
          :disabled="deleteDisabled"
          @click="handleMultiDelete()"
          danger
          type="primary"
          >{{ $t("vlan.deleteVlan") }}</Button
        >
        <Button
          @click="handleAddVlanClick"
          :style="{ marginLeft: '16px' }"
          type="primary"
          >{{ $t("vlan.addVlan") }}</Button
        >
      </div>
    </template>
    <CommonTable
      :row-key="'nanoid'"
      :rowSelection="{
        selectedRowKeys: state.selectedVlanIds,
        onChange: handleSelectChange,
      }"
      :slots="['operation', 'vlan_name']"
      :dataSource="data.clonedData.value"
      :columns="columns"
    >
      <template #vlan_name="{ record }">
        <div
          v-if="isEdit && record.nanoid === state.onOperationVlan?.nanoid"
          class="flex-start flex-nowrap"
        >
          <Input
            style="width: 200px; margin-right: 8px"
            v-model:value="record.vlan_name"
          ></Input>
          <EditButtons
            @ok="handleEditOk(record as VlanInfo)"
            @cancel="handleEditCancel(record as VlanInfo)"
          />
        </div>
      </template>
      <template #operation="{ record }">
        <div class="flex-start flex-nowrap">
          <Button
            type="text"
            :disabled="checkOperationDisabled(record as VlanInfo)"
            @click="() => handleEdit(record as VlanInfo)"
            class="flex"
          >
            <Iconfont
              icon="ic_edit"
              :disabled="checkOperationDisabled(record as VlanInfo)"
              :primary="!checkOperationDisabled(record as VlanInfo)"
            ></Iconfont>
            <span
              :class="{
                'primary-color': !checkOperationDisabled(record as VlanInfo),
              }"
              >{{ $t("edit") }}</span
            >
          </Button>
          <Button
            type="text"
            @click="() => handleDelete(record as VlanInfo)"
            class="flex"
          >
            <Iconfont icon="ic_delete" primary></Iconfont>
            <span class="primary-color">{{ $t("delete") }}</span>
          </Button>
        </div>
      </template>
    </CommonTable>
  </VlanConfig>
  <!-- 添加vlan对话框 -->
  <Modal
    :width="400"
    @cancel="hanldeAddVlanCancel"
    @ok="hanldeAddVlanOk"
    centered
    :title="$t('vlan.addVlan')"
    :confirmLoading="state.confirmLoading"
    :open="state.addModalOpen"
  >
    <div style="padding: 24px 0 16px">
      <div class="flex-btw flex-nowrap" :style="{ marginBottom: '24px' }">
        <span class="title1 white-s-nowrap">{{ $t("vlan.vlanId") }}</span>
        <InputNumber
          :min="1"
          :max="4093"
          v-model:value="state.editData.vlan_id"
          style="width: 264px"
        ></InputNumber>
      </div>
      <div class="flex-btw flex-nowrap">
        <span class="title1 white-s-nowrap">{{ $t("vlan.vlanName") }}</span>
        <Input
          v-model:value="state.editData.vlan_name"
          style="width: 264px"
        ></Input>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss"></style>
