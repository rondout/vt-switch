import i18n from "@/i18n";
import { BaseResponse, BaseResponseError } from "@/models/base.model";
import { message, Modal } from "ant-design-vue";
import { LegacyButtonType } from "ant-design-vue/es/button/buttonTypes";
import { VueNode } from "ant-design-vue/es/_util/type";
import { title } from "process";
import * as yup from "yup";

export const auToRefreshTime = 10000;

export const Yup = yup;

export const isProd = process.env.NODE_ENV === "production";

export const themeColor = "#009CEB";

export function deepClone<T>(target: T, ignoreFields?: string[]): T {
  // 先判断是否为空
  if (target === null) {
    return target;
  }
  // 判断是否为时间对象
  if (target instanceof Date) {
    return new Date(target.getTime()) as any;
  }
  // 再判断是不是数组，如果是需要递归遍历克隆
  if (target instanceof Array) {
    const cp = [] as 5[];
    (target as any[]).forEach((v) => {
      cp.push(v);
    });
    return cp.map((n: any) => deepClone<any>(n)) as any;
  }
  // 判断是不是object 如果是就需要一层层递归遍历
  if (typeof target === "object") {
    const cp = { ...(target as { [key: string]: any }) } as {
      [key: string]: any;
    };
    Object.keys(cp).forEach((k) => {
      // 判断遍历的key是否为需要忽略的key 不是就继续递归调用
      if (!ignoreFields || ignoreFields.indexOf(k) === -1) {
        cp[k] = deepClone<any>(cp[k]);
      }
    });
    return cp as T;
  }
  return target;
}

export function shallowClone<T = any>(obj: T): T {
  var clone = Object.create(Object.getPrototypeOf(obj));

  var props = Object.getOwnPropertyNames(obj);
  props.forEach(function (key) {
    var desc = Object.getOwnPropertyDescriptor(obj, key);
    Object.defineProperty(clone, key, desc);
  });

  return clone;
}

export function isNull(param: any): boolean {
  return [null, undefined, "", NaN].includes(param);
}

export interface ConfirmOptions {
  title: string;
  content?: VueNode | (() => VueNode);
  onOk?(): void | Promise<any>;
  onCancel?(): void | Promise<any>;
  okType?: LegacyButtonType;
}

export const $confirm = (options: ConfirmOptions) =>
  Modal.confirm({
    ...options,
    okButtonProps: { type: "primary" },
    // okType
    centered: true,
    // okText: i18n.global.t("delete"),
  });

export const $deleteConfirm = (options: ConfirmOptions) => {
  const { t } = i18n.global;
  Modal.confirm({
    ...options,
    title: t(options.title),
    content: t((options.content as string) || "deleteContent"),
    okType: "danger",
    okText: t("delete"),
    okButtonProps: { type: "primary" },
    // okType
    centered: true,
    // okText: i18n.global.t("delete"),
  });
};

export function autoParseFileSize(value: number | string): string {
  try {
    if (isNull(value)) {
      return "";
    }
    // 大于1024k显示MB 否则显示 KB
    const kbSize = Number(value) / 1024 - 0;
    if (kbSize >= 1024) {
      return (kbSize / 1024).toFixed(2) + " MB";
    } else {
      return kbSize.toFixed(2) + " KB";
    }
  } catch (error) {
    return value?.toString();
  }
}

export function handleResponseError(err: BaseResponse) {
  const { t } = i18n.global;
  if (err?.errCode === BaseResponseError.ERROR_WITH_CANT_PARSE_JSON) {
    message.error(t("ERROR_WITH_CANT_PARSE_JSON"));
  } else if (err?.errCode === BaseResponseError.ERROR_WITH_NO_ARGS) {
    message.error(t("ERROR_WITH_NO_ARGS"));
  }
}

export function messageSaveSuccess() {
  const { t } = i18n.global;
  message.success(t("saveSuccess"));
}

export const ipRegExp =
  /(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}(?:\/(?:3[0-2]|[1-2]?\d|))?/;

export const domainRegExp =
  /^(([-\u4E00-\u9FA5a-z0-9]{1,63})\.)+([\u4E00-\u9FA5a-z]{2,63})\.?$/;

export const allowedVlanRegExp =
  /^(([1-9][0-9]{0,}\-[1-9][0-9]{0,}\,?)|([1-9]{1,}[0-9]{0,}\,?)){1,}$/;

/**
 * @export
 * @param {string} filename
 * @param {string} text
 */
export function download(filename: string, text: string) {
  var pom = document.createElement("a");
  pom.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  pom.setAttribute("download", filename);
  if (document.createEvent) {
    var event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}
