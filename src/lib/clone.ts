// 克隆函数，深拷贝
// <X> X X 泛型 输入是什么类型 输出就是什么类型
function clone<X>(data: X): X {
    return JSON.parse(JSON.stringify(data));
}

export default clone;
