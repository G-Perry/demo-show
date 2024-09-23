// 用于jobManager页面的数据处理
export function findObjectById(array, id, keyName = "id") {
  // 使用 Array.prototype.find() 方法查找匹配的对象
  return array.find((obj) => obj[keyName] === id);
}

// 创建UUID
export function UUID(sign) {
  if (sign) {
    const randomBytes = new Uint8Array(12); // 生成12字节的随机数据
    window.crypto.getRandomValues(randomBytes); // 填充随机数据
    const base64String = btoa(String.fromCharCode.apply(null, randomBytes)); // 转换为Base64字符串
    let uuid = base64String.substring(0, 9);
    return sign + "_" + uuid;
  } else {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
