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
    let uuid = base64String.replace(/\//g, "").substring(0, 9);
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

// 存储数据到缓存
export function saveToStorage(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
  // sessionStorage.setItem(name, JSON.stringify(value));
}

// 从缓存中读取数据
export function readFromStorage(name) {
  return JSON.parse(localStorage.getItem(name));
  // return JSON.parse(sessionStorage.getItem(name));
}

// 清除缓存
export function clearStorage() {
  return localStorage.clear();
}

let itemObj, childrenName;
export function initObjAndName(type) {
  switch (type) {
    case "node_branch":
      itemObj = {
        id: UUID("condition"),
        joint: null,
        field: null,
        filters: "EQUALS",
        value: null,
        taskNodeId: null,
        conditions: [],
      };
      childrenName = "conditions";
      break;
    case "node_auto":
      itemObj = {
        id: UUID("condition"),
        joint: null,
        filters: "EQUALS",
        modelField: null,
        orderField: null,
        subConditions: [],
      };
      childrenName = "subConditions";
      break;

    default:
      break;
  }
  return { obj: itemObj, childrenName };
}

// 根据id删除树形数据节点
function deleteNodeById(tree, id) {
  // 遍历当前层级的节点
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    // 如果找到匹配的节点，从数组中移除
    if (node.id === id) {
      tree.splice(i, 1);
      return true; // 找到并移除节点
    }

    // 递归处理子节点
    if (node[childrenName] && node[childrenName].length > 0) {
      if (deleteNodeById(node[childrenName], id)) {
        return true; // 子节点中找到了并移除了节点
      }
    }
  }
  return false; // 没有找到匹配的节点
}
// 提升单个元素
function elevateSingleChildNodes(tree) {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    // 如果当前节点有子节点
    if (node[childrenName] && node[childrenName].length === 1) {
      // 提升唯一的子节点
      const child = node[childrenName][0];
      tree[i] = child;
      // 递归处理提升后的子节点
      elevateSingleChildNodes([child]);
    } else if (node[childrenName] && node[childrenName].length > 1) {
      // 递归处理多个子节点的情况
      elevateSingleChildNodes(node[childrenName]);
    }
  }
}

export function removeNodeById(root, id) {
  // 先删除后提升单个元素
  deleteNodeById([root], id);
  elevateSingleChildNodes([root]);
}

// 添加同级
export function addSiblingNodeById(root, targetId, newNode) {
  function findAndAddNode(tree, targetId, newNode) {
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      // 如果当前节点的ID匹配目标ID
      if (node.id === targetId) {
        // 在当前节点的父节点的子节点列表中插入新节点
        tree.splice(i + 1, 0, newNode);
        return true; // 找到并添加了新节点
      }

      // 如果当前节点有子节点，递归处理子节点
      if (node[childrenName] && node[childrenName].length > 0) {
        if (findAndAddNode(node[childrenName], targetId, newNode)) {
          return true; // 子节点中找到了并添加了新节点
        }
      }
    }
    return false; // 没有找到匹配的节点
  }
  // 从根节点开始处理
  return findAndAddNode(root[childrenName], targetId, newNode);
}

// 添加子级
export function addSonNodeById(root, targetId, newNode) {
  function findAndAddNode(tree, targetId, newNode) {
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      // 如果当前节点的ID匹配目标ID
      if (node.id === targetId) {
        // 创建一个新的数组，包含当前节点和新节点
        const newChildren = [node, newNode];
        // 将当前节点替换为一个新的节点，其子节点为新的数组
        let obj = { ...itemObj };
        obj.id = UUID("condition");
        obj.joint = "AND";
        obj.filters = null;
        obj[childrenName] = newChildren;
        tree.splice(i, 1);
        tree.splice(i, 0, obj);
        return true; // 找到并添加了新节点
      }
      // 如果当前节点有子节点，递归处理子节点
      if (node[childrenName] && node[childrenName].length > 0) {
        if (findAndAddNode(node[childrenName], targetId, newNode)) {
          return true; // 子节点中找到了并添加了新节点
        }
      }
    }
    return false; // 没有找到匹配的节点
  }
  // 从根节点开始处理
  return findAndAddNode(root[childrenName], targetId, newNode);
}
