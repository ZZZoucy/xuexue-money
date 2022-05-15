import clone from "@/lib/clone";
import createId from "@/lib/createId";
import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [] as RecordItem[],
        createRecordError: null,
        createTagError: null,
        tagList: [] as Tag[],
        currentTag: undefined,
    } as RootState,
    mutations: {
        setCurrentTag(state, id: string) {
            state.currentTag = state.tagList.filter((t) => t.id === id)[0];
        },
        // 编辑标签 更新标签
        updateTag(state, payload: { id: string; name: string }) {
            const { id, name } = payload;
            const idList = state.tagList.map((item) => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map((item) => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert("标签名重复了");
                } else {
                    // filter 过滤器 一定会返回一个数组
                    const tag = state.tagList.filter((item) => item.id === id)[0];
                    tag.name = name;
                    store.commit("saveTags");
                }
            }
        },
        removeTag(state, id: string) {
            // 根据 id 找到该标签在标签列表中的 index下标
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                state.tagList.splice(index, 1);
                store.commit("saveTags");
                router.back();
            } else {
                window.alert("删除失败");
            }
        },
        // 获取记录
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[];
        },
        createRecord(state, record: RecordItem) {
            // 深拷贝之前的记录
            const record2 = clone(record);
            // 再给记录创建时间
            record2.createdAt = record2.createdAt || new Date().toISOString();
            // 将创建好时间的记录再添加到记录列表中
            state.recordList.push(record2);
            // 触发保存记录函数
            store.commit("saveRecords");
        },
        saveRecords(state) {
            window.localStorage.setItem("recordList", JSON.stringify(state.recordList));
        },
        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem("tagList") || "[]");
            if (!state.tagList || state.tagList.length === 0) {
                store.commit("createTag", "衣");
                store.commit("createTag", "食");
                store.commit("createTag", "住");
                store.commit("createTag", "行");
            }
        },
        // 新建标签
        createTag(state, name: string) {
            state.createTagError = null;
            const names = state.tagList.map((item) => item.name);
            if (names.indexOf(name) >= 0) {
                state.createTagError = new Error("tag name duplicated");
                return;
            }
            const id = createId().toString();
            state.tagList.push({ id, name: name });
            store.commit("saveTags");
        },
        saveTags(state) {
            window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
        },
    },
});

export default store;
