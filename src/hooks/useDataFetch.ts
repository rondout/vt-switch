import { deepClone } from "@/util";
import { reactive, toRefs } from "vue";
import { nanoid } from "nanoid";

export type useDataFetchFn<T = any> = () => //   ...rest: any
Promise<{ [propName: string]: T[] }>;

export default function useDataFetch<T = any>(
  fetchFn: useDataFetchFn<T>,
  withNanoid?: boolean
) {
  const data = reactive<{ data: T[]; clonedData: T[]; loading: boolean }>({
    data: [],
    clonedData: [],
    loading: false,
  });

  const getData = (setLoading = true) => {
    if (setLoading) {
      data.loading = true;
    }
    const result = fetchFn();
    result
      .then((res) => {
        const list: T[] = res[Object.keys(res)[0]] as T[];
        if (withNanoid) {
          // @ts-ignore
          list.forEach((item) => (item.nanoid = nanoid()));
        }
        data.loading = false;
        // @ts-ignore
        data.data = list;
        // @ts-ignore
        data.clonedData = deepClone(res[Object.keys(res)[0]] as T[]);
      })
      .catch((err) => {
        data.loading = false;
      });
    return result;
  };

  getData();

  const resetData = () => {
    data.clonedData = deepClone(data.data);
  };

  const setEditDataToOriginData = (newData = data.clonedData) => {
    data.data = deepClone(newData);
  };

  return {
    ...toRefs(data),
    refresh: getData,
    resetData,
    setEditDataToOriginData,
  };
}
