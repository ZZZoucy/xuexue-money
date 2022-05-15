// id生成器
// 获取最后一个 id，如果没有则从 0 开始
let id: number = parseInt(window.localStorage.getItem("_idMax") || "0") || 0;

function createId() {
    id++;
    window.localStorage.setItem("_idMax", id.toString());
    return id;
}

export default createId;
