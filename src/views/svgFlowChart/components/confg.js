import { UUID, readFromStorage } from "@/utils/handleObjMethods";
import { deepClone } from "@/utils/index";

export const branchOriginalConditionInfo = {
  id: UUID("condition"),
  joint: "AND",
  field: null,
  filters: null,
  value: null,
  taskNodeId: null,
  conditions: [
    {
      id: UUID("condition"),
      joint: null,
      field: null,
      filters: "EQUALS",
      value: null,
      taskNodeId: null,
      conditions: [],
    },
  ],
};
export const autoOriginalConditionInfo = {
  id: UUID("condition"),
  joint: "AND",
  filters: null,
  modelField: null,
  orderField: null,
  subConditions: [
    {
      id: UUID("condition"),
      joint: null,
      filters: "EQUALS",
      modelField: null,
      orderField: null,
      subConditions: [],
    },
  ],
};

export const treeSelectOptions = [
  {
    name: "发起时间",
    propName: "start_time",
  },
  {
    name: "当前时间",
    propName: "this_time",
  },
  {
    children: [
      { name: "工单标题", propName: "procExeclnfo_title" },
      { name: "工单编号", propName: "procExecInfo_exec_no" },
      { name: "工单分类", propName: "procExecInfo_category" },
      { name: "工单状态", propName: "procExecInfo_suspension" },
      { name: "开始时间", propName: "procExecInfo_start_time" },
      { name: "影响等级", propName: "procExecInfo_influence" },
      { name: "紧急程度", propName: "procExecInfo_urgency" },
      { name: "优先级", propName: "procExecInfo_priotity" },
    ],
    name: "工单信息",
    propName: "order_info",
  },
];
export const compareOptions = [
  {
    name: "等于",
    propName: "EQUALS",
  },
  {
    name: "不等于",
    propName: "NOT_EQUALS",
  },
  {
    name: "包含",
    propName: "CONTAINS",
  },
  {
    name: "不包含",
    propName: "NOT_CONTAINS",
  },
  {
    name: "大于",
    propName: "GREATER_THAN",
  },
  {
    name: "小于",
    propName: "LESS_THAN",
  },
];
export const suspensionOptions = [
  {
    name: "待认领",
    propName: "待认领",
  },
  {
    name: "待审批",
    propName: "待审批",
  },
  {
    name: "处理中",
    propName: "处理中",
  },
  {
    name: "已结束",
    propName: "已结束",
  },
  {
    name: "待提交",
    propName: "待提交",
  },
];

let nowSettingNode = null;
let nodesArr = [];
let manualNodesArr = [];
let manualNodesFormArr = [];
export function setNowSettingNode(node) {
  nowSettingNode = node;
}
export function getNowSettingNode() {
  return nowSettingNode;
}

function findPreNode(nodeId, svgLinesInfo) {
  svgLinesInfo.forEach((item) => {
    if (item.tarNodeId === nodeId) {
      let obj = nodesArr.find((element) => element.id === item.srcNodeId);
      if (obj.nodeType == "node_manual" && !manualNodesArr.includes(obj.id)) {
        manualNodesArr.push({
          id: obj.id,
          nodeName: obj.text,
        });
      }
      findPreNode(item.srcNodeId, svgLinesInfo);
    }
  });
  return null;
}

// 获取  分支节点  左侧选项的树形结构
export function getTreeSelectOptions() {
  nodesArr = [];
  manualNodesArr = [];
  manualNodesFormArr = [];
  // 当前节点ID
  let nodeId = nowSettingNode.id;
  // 节点信息
  let svgNodesInfo = readFromStorage("svgNodesInfo") || [];
  // 连线信息
  let svgLinesInfo = readFromStorage("svgLinesInfo") || [];
  // 表单信息
  let formInfo = readFromStorage("formInfo") || [];
  // 将节点的信息扁平化
  for (let key in svgNodesInfo) {
    nodesArr = nodesArr.concat(svgNodesInfo[key]);
  }
  // 递归查找上游人工节点
  findPreNode(nodeId, svgLinesInfo);
  // 获取上游人工节点的表单信息
  manualNodesArr.forEach((item) => {
    let obj = formInfo[item.id];
    if (obj) {
      manualNodesFormArr.push({
        id: item.id,
        nodeName: item.nodeName,
        formInfo: obj,
      });
    }
  });
  // 根据上游人工节点的表单信息生成树形选项
  let Options = deepClone(treeSelectOptions);
  manualNodesFormArr.forEach((item) => {
    let obj = {
      name: item.nodeName,
      propName: item.id,
      children: item.formInfo.fields.map((element) => {
        return {
          name: element.__config__.label,
          // propName: `${item.id}>>${element.__vModel__}`,
          propName: element.__vModel__,
          taskNodeId: item.id,
        };
      }),
    };
    Options.push(obj);
  });
  // console.log(Options);
  return Options;
}

// 获取  字段映射  部分的树形数据
export function getFieldMappingTreeSelectOptions() {
  let Options = [
    {
      children: [
        {
          name: "工单标题",
          propName: "procExeclnfo_title",
          customLabel: "工单标题",
        },
        {
          name: "工单编号",
          propName: "procExecInfo_exec_no",
          customLabel: "工单编号",
        },
      ],
      name: "工单信息",
      propName: "order_info",
    },
  ];
  manualNodesFormArr = [];
  // 节点信息
  let svgNodesInfo = readFromStorage("svgNodesInfo") || [];
  // 表单信息
  let formInfo = readFromStorage("formInfo") || [];
  svgNodesInfo.node_manual.forEach((item) => {
    let form = formInfo[item.id];
    if (form) {
      let obj = {
        name: item.text,
        propName: item.id,
        customId: item.id,
        children: form.fields.map((element) => {
          return {
            name: element.__config__.label,
            propName: `${item.id}====${element.__vModel__}`,
            taskNodeId: item.id,
            customLabel: `${item.text}-${element.__config__.label}`,
            // name: element.__config__.label,
            // propName: element.__vModel__,
            // customId: `${item.id}<-->${element.__vModel__}`,
            // taskNodeId: item.id,
            // customLabel: `${item.text}-${element.__config__.label}`,
          };
        }),
      };
      console.log(obj);
      Options.push(obj);
    }
  });

  return Options;
}

// /** 转换部门数据结构 */
export function normalizer(node, id, label, children = "children") {
  if (node.children && !node.children.length) {
    delete node.children;
  }
  return {
    id: node[id],
    label: node[label],
    children: node[children],
  };
}
