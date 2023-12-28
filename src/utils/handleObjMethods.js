// 用于jobManager页面的数据处理
export function findObjectById(array, id, keyName = "id") {
    // 使用 Array.prototype.find() 方法查找匹配的对象
    return array.find((obj) => obj[keyName] === id);
}