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
    getters:{
        // 获取 支出的标签
        expenses: (state) => {
            return state.recordList.filter(item => item.type === '-');
        },
        // 获取 本月支出的金额
        expensesMoney: () => (today: string) => {
            const mouthExpenses = (store.getters.expenses as RecordItem[])
                .filter(item => day(item.createdAt).format('DD') === today);
            return mouthExpenses.map(item => item.amount);
        },
        // 获取当日的总收入或总支出
        dayTotalList: (state) => (type: string) => {
        // 日期从大到小排
        const newList = [...state.recordList]
                .filter(r => r.category === type)
                .sort((a, b) => day(b.createdAt).valueOf() - day(a.createdAt).valueOf());
        if (newList.length === 0) {return [];}

        type Result = { title: string; total?: number; items: RecordItem[] }[]
        const result: Result = [{title: day(newList[0].createdAt).format('MM/DD'), items: [newList[0]]}];
        for (let i = 1; i < newList.length; i++) {
            const current = newList[i];
            const last = result[result.length - 1];
            if (day(last.title).isSame(day(current.createdAt), 'day')) {
            last.items.push(current);
            } else {
            result.push({title: day(current.createdAt).format('MM/DD'), items: [current]});
            }
        }
        // 将金额相加
        result.map(group =>
                group.total = group.items.reduce((sum, item) => {
                    return sum + item.amount;
                }, 0));
        return result;
        }
    },
    mutations: {
        setCurrentTag(state, id: string) {
            state.currentTag = state.tagList.filter((t) => t.id === id)[0];
        },
        updateTag(state, payload: { id: string; name: string }) {
            const { id, name } = payload;
            const idList = state.tagList.map((item) => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map((item) => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert("标签名重复了");
                } else {
                    const tag = state.tagList.filter((item) => item.id === id)[0];
                    tag.name = name;
                    store.commit("saveTags");
                }
            }
        },
        removeTag(state, id: string) {
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
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[];
        },
        createRecord(state, record: RecordItem) {
            const record2 = clone(record);
            record2.createdAt = record2.createdAt || new Date().toISOString();
            state.recordList.push(record2);
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
