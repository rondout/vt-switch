# switch-web

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Vue3 补充

### 响应式 API 重新学习

#### toRef

可以将值、refs 或者 getters 规范化微 refs，也可以基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变原属性的值将更新 ref 的值，房子依然：

```html
<script lang="ts" setup>
  import { Button } from "ant-design-vue";
  import { ref, toRef } from "vue";

  let a = ref(10);
  let b = toRef(a);

  const handleAdd = () => {
    a.value++;
    console.log({ a, b });
  };
</script>

<template>
  <p>a:{{ a }}</p>
  <p>b:{{ b }}</p>
  <button @click="handleAdd">+</button>
</template>

<style></style>
```

```html
<script lang="ts" setup>
  import { Button } from "ant-design-vue";
  import { reactive, ref, toRef } from "vue";

  const obj = reactive({ count: 0, label: "count" });

  const copyObj = toRef(obj);
  let count = toRef(obj.count);

  const handleAddObj = () => obj.count++;
  const handleAddCopyObj = () => copyObj.value.count++;
</script>

<template>
  <p>{{ obj.label }}:{{ obj.count }}</p>
  <p>{{ copyObj.label }}:{{ copyObj.count }}</p>
  <p>{{ count }}</p>
  <button @click="handleAddObj"></button>
  <button @click="handleAddCopyObj"></button>
</template>

<style></style>
```

因此在上面这两个例子中，我们改变 a 的值 b 也会跟着改变，反之亦然，并且这种改变是响应式的。但是在第二个例子中，我们用 toRef 将 obj 中的 count 取出来，这样我们再去操作更改 obj 或者 copyObj，count 的值不会再随着更改，因为 count 这个 ref 接受到的是一个纯数值数据。但是如果我们像下面这样子去写就能得到响应式的值：

```js
let count = toRef(obj, "count");
```

#### toValue

将值、refs 或者 getters 规范化为值。这与 unref 类似，不同的是**此函数会规范化 getter 函数，如果参数是一个 getters，他将会被调用并且返回他的返回值。**但是注意，toValue 之后响应性会丢失

```js
const refCount = ref(10);
const obj = reactive({ count: 0, label: "count" });
const tenTimesRefCount = computed(() => refCount.value * 10);

let refcountToValue = toValue(refCount); // 10;
let reactiveObjToValue = toValue(obj); // { count: 0, label: "count" }
let computedCountToValue = toValue(tenTimesRefCount); // 100
```

### setup 函数

setup 函数的执行发生在组件生命周期`onBeforeMount`之前，这里组件是还没有挂载到 dom 树上的。

### 定义 props

建议使用解构赋值的方式定义 props 的默认值，但是要注意，结构赋值会导致 props 丢失响应性，需要在 vite.config.ts 中进行响应性语法糖配置：

```ts
const props = withDefaults(defineProps<{ icon: string }>(), {
  icon: "ic_edit",
});
// const { icon } = defineProps<{ icon: string }>()
const { icon } = props;
// 或者下面这样
const { icon } = withDefaults(defineProps<{ icon: string }>(), {
  icon: "ic_edit",
});
// 上线两种对props的解构都会导致props的响应性丢失, 当然我们也可以通过toRef这个api将其变为响应式的
const icon = toRef(() => props.icon);
// 但是注意不能这样写，这样子写是没法保持响应性的，这个问题在上面的toRef的介绍中已经提到过
const icon = toRef(props.icon);
// 或者直接在定义props的之后直接解构
const { icon } = defineProps<{ icon: string }>();
// 这样是可以保持响应性的
```

```ts
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
  ],
});
```

还可以通过`withDefaults`来给 props 赋默认值，但是不能结构，结构后会丢失响应性（实际上 vue 会直接报错告诉你如果你使用了解构就不必要再使用 withDefaults 了：withDefaults() is unnecessary when using destructure with defineProps()）。

### 状态管理 pinia 的使用

pinia 的 store 定义有两种方式，一种是类似于 vuex 以及 redux 的 option store 定义方式：

```ts
import { defineStore } from "pinia";
import { Languages, TenantInfo, UserInfo } from "../models/base.model";
import { Authority } from "../models/user.model";

const initLanguage = (
  localStorage.getItem("language") || navigator.language
).includes("zh")
  ? Languages.zh
  : Languages.en;

export const useMainStore = defineStore("main", {
  state: () => ({
    language: initLanguage,
  }),
  getters: {
    auth(state) {
      return state.authority;
    },
  },
  actions: {
    changeLanguage(language?: Languages) {
      if (!language) {
        language = this.language === Languages.zh ? Languages.en : Languages.zh;
      }
      this.language = language;
      localStorage.language = language;
    },
  },
});
```

另一种是类似于 vue 组合式 API 的 setup store 定义方式：

```ts
import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import { Languages } from "@/models/base.model";
import i18n from "@/i18n";

export const useMainStore = defineStore("main", () => {
  const state = reactive({
    language: i18n.global.locale.value,
  });

  const changeLanguage = (lang?: Languages) => {
    if (!lang) {
      lang = state.language === Languages.en ? Languages.zh : Languages.en;
    }
    state.language = lang;
    window.localStorage.setItem("language", lang);
    i18n.global.locale.value = lang;
  };
  // 注：这里如果我们结构state需要使用toRefs
  return { ...toRefs(state), changeLanguage };
});
```

这种方式我们在组件中使用 store 的时候可以这样使用：

```ts
const { language, changeLanguage } = useMainStore();
```

但是这样使用有个问题就是我们在组建中获取到的 language 是丢失了响应性的，我们需要用到`storeToRefs`这个 API，它将为每一个响应式属性创建引用。当你只使用 store 的状态而不调用任何 action 时，它会非常有用。请注意，你可以直接从 store 中解构 action，因为它们也被绑定到 store 上：

```ts
const store = useMainStore();
const { language } = storeToRefs(store);
```

但是这里面只能结构 state，不能解构出操作 state 的方法（action）。

### 渲染函数使用

```ts
const test = h(Button, { type: "primary", onClick: () => alert() }, "ssss");
// 第三个参数是children
const test1 = h("h1", {}, "sddddd");
```
