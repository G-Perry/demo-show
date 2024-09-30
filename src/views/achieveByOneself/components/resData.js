export let resData = {
  msg: "操作成功",
  code: 200,
  data: {
    "start-time": 1699983101197,
    jid: "e9bf82e085bf26859e5a7ec132dcdec9",
    vertices: [
      {
        duration: 25939726,
        "start-time": 1699983101597,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "Source: 告警数据源 -> 告警规则更新 -> 空值过滤",
        id: "cbc357ccb763df2852fee8c4fc7d55f2",
        metrics: {
          "write-records": 84191,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 31040348,
          "read-bytes": 141674568,
          "read-records": 0,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939711,
        "start-time": 1699983101612,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "Source: DNS消息，威胁情报数据源",
        id: "feca28aff5a3958840bee985ee7de4d3",
        metrics: {
          "write-records": 47103364,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 14828393253,
          "read-bytes": 25466028134,
          "read-records": 0,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939755,
        "start-time": 1699983101568,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "Source: 设备信息消息 -> Sink: 设备信息",
        id: "2963852293169ba90d9d1e7d6308db5c",
        metrics: {
          "write-records": 0,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 0,
          "read-bytes": 64960578,
          "read-records": 0,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939750,
        "start-time": 1699983101573,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "Source: http-ueba -> 空值过滤 -> 过滤.css|.js|.png|.ico结尾的url -> login登录url过滤",
        id: "1171dea6747ab509fdaefbe74f7195af",
        metrics: {
          "write-records": 636334,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 187767622,
          "read-bytes": 61978051818,
          "read-records": 0,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939726,
        "start-time": 1699983101597,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 3,
        name: "白名单规则更新",
        id: "a7855710791d4a5536fdb73c624e73d8",
        metrics: {
          "write-records": 84191,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 31257812,
          "read-bytes": 31086679,
          "read-records": 84191,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 3,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939714,
        "start-time": 1699983101609,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 3,
        name: "Window(TumblingEventTimeWindows(60000), EventTimeTrigger, ThreatAlertProcess) -> 资产规则更新",
        id: "bd79b58d4c6fda434f81c8058872edbb",
        metrics: {
          "write-records": 4429,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 2767107,
          "read-bytes": 31309381,
          "read-records": 84191,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 3,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939713,
        "start-time": 1699983101610,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 3,
        name: "地理位置更新",
        id: "c252b7d312052cf7b9586d3e48bf11c6",
        metrics: {
          "write-records": 4429,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 2655075,
          "read-bytes": 2798276,
          "read-records": 4429,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 3,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939712,
        "start-time": 1699983101611,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "Sink: 生成IDS告警",
        id: "c219374c10418c0f6cedf50131a76df7",
        metrics: {
          "write-records": 0,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 0,
          "read-bytes": 2681870,
          "read-records": 4429,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939711,
        "start-time": 1699983101612,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 3,
        name: "top白名单过滤 -> alexa白名单过滤",
        id: "b23642197a427ec5db481d3963c66cfb",
        metrics: {
          "write-records": 14435398,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 4640095185,
          "read-bytes": 14828469041,
          "read-records": 47103364,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 3,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939266,
        "start-time": 1699983102057,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 3,
        name: "威胁域名过滤",
        id: "c879822e55c2212bc742de16458cb6d7",
        metrics: {
          "write-records": 490,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 424527,
          "read-bytes": 4640213630,
          "read-records": 14435398,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 3,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939265,
        "start-time": 1699983102058,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "情报规则更新",
        id: "954d87809ff8a8c09f08133d8c817fed",
        metrics: {
          "write-records": 242,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 366767,
          "read-bytes": 431486,
          "read-records": 490,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939265,
        "start-time": 1699983102058,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 3,
        name: "资产规则更新 -> 白名单过滤",
        id: "76f6dde27f044b7fcd81ddc43561343c",
        metrics: {
          "write-records": 237,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 388194,
          "read-bytes": 373444,
          "read-records": 242,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 3,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939264,
        "start-time": 1699983102059,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "地理位置信息更新 -> Sink: 生成威胁情报告警",
        id: "e7bafbf86f9ecf2c2248c268b9bec848",
        metrics: {
          "write-records": 0,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 0,
          "read-bytes": 395299,
          "read-records": 237,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939749,
        "start-time": 1699983101574,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "分流 -> (异常主机过滤, 正常主机过滤)",
        id: "95905ab780e8e55a1a1f41d0ffe39f3a",
        metrics: {
          "write-records": 630544,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 618734646,
          "read-bytes": 187773798,
          "read-records": 636334,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939740,
        "start-time": 1699983101583,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "404统计",
        id: "60ac4735673ae8525c30be1912fb766d",
        metrics: {
          "write-records": 2679,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 853660,
          "read-bytes": 1296054,
          "read-records": 5391,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939740,
        "start-time": 1699983101583,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "KeyedProcess -> Sink: 404异常告警sink",
        id: "e6ca9816e2a8c94d1d211f8ae018464a",
        metrics: {
          "write-records": 0,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 0,
          "read-bytes": 863727,
          "read-records": 2679,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939739,
        "start-time": 1699983101584,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "login 404日基线阈值 -> Sink: 404基线sink",
        id: "8fe022fa7db4721e74b5e98aaaadcf84",
        metrics: {
          "write-records": 0,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 0,
          "read-bytes": 1296054,
          "read-records": 5391,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939738,
        "start-time": 1699983101585,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "login 404月基线阈值",
        id: "403c40e57e228e42d6b0504580d94720",
        metrics: {
          "write-records": 2252,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 753475,
          "read-bytes": 1296054,
          "read-records": 5391,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939737,
        "start-time": 1699983101586,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "Sink: 404 月基线阈值sink",
        id: "83d61323a6087850093a0f0fa4f50f0a",
        metrics: {
          "write-records": 0,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 0,
          "read-bytes": 763909,
          "read-records": 2252,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939736,
        "start-time": 1699983101587,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "200统计",
        id: "21c99bbb278ae17efdf374e592219419",
        metrics: {
          "write-records": 621137,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 191852342,
          "read-bytes": 204981939,
          "read-records": 625153,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939735,
        "start-time": 1699983101588,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "KeyedProcess -> Sink: 200 异常告警sink",
        id: "f3aec24c6a7fa0e3a3a704108fb156da",
        metrics: {
          "write-records": 0,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 0,
          "read-bytes": 191873444,
          "read-records": 621137,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939735,
        "start-time": 1699983101588,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "login 200日基线阈值",
        id: "4aa3c4d612c9d6dc1766b3b0d95ea691",
        metrics: {
          "write-records": 617457,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 177919505,
          "read-bytes": 204981939,
          "read-records": 625153,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939734,
        "start-time": 1699983101589,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "Sink: 200 基线sink",
        id: "514007c3fae9f7be67c6454003caef92",
        metrics: {
          "write-records": 0,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 0,
          "read-bytes": 177935311,
          "read-records": 617457,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939733,
        "start-time": 1699983101590,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "login 200月基线阈值",
        id: "a4f678176db7d70ea2c0b56b96b1d3fc",
        metrics: {
          "write-records": 617202,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 177879673,
          "read-bytes": 204981939,
          "read-records": 625153,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
      {
        duration: 25939732,
        "start-time": 1699983101591,
        "end-time": -1,
        maxParallelism: 128,
        parallelism: 1,
        name: "Sink: 200 月基线阈值sink",
        id: "964e38a2825c53227b7f70710236c4d9",
        metrics: {
          "write-records": 0,
          "read-bytes-complete": true,
          "write-bytes-complete": true,
          "write-bytes": 0,
          "read-bytes": 177905692,
          "read-records": 617202,
          "read-records-complete": true,
          "write-records-complete": true,
        },
        tasks: {
          CREATED: 0,
          FAILED: 0,
          RUNNING: 1,
          CANCELED: 0,
          CANCELING: 0,
          INITIALIZING: 0,
          FINISHED: 0,
          SCHEDULED: 0,
          RECONCILING: 0,
          DEPLOYING: 0,
        },
        status: "RUNNING",
      },
    ],
    "end-time": -1,
    timestamps: {
      CREATED: 1699983101261,
      FAILING: 0,
      FAILED: 0,
      RUNNING: 1699983101442,
      SUSPENDED: 0,
      CANCELLING: 0,
      CANCELED: 0,
      RESTARTING: 0,
      INITIALIZING: 1699983101197,
      FINISHED: 0,
      RECONCILING: 0,
    },
    maxParallelism: -1,
    "status-counts": {
      CREATED: 0,
      FAILED: 0,
      RUNNING: 25,
      CANCELED: 0,
      CANCELING: 0,
      INITIALIZING: 0,
      FINISHED: 0,
      SCHEDULED: 0,
      RECONCILING: 0,
      DEPLOYING: 0,
    },
    duration: 25940126,
    isStoppable: false,
    now: 1700009041323,
    name: "Threat Streaming JOBS",
    state: "RUNNING",
    plan: {
      nodes: [
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "c252b7d312052cf7b9586d3e48bf11c6",
              ship_strategy: "REBALANCE",
            },
          ],
          parallelism: 1,
          description: "Sink: 生成IDS告警",
          operator_strategy: "",
          id: "c219374c10418c0f6cedf50131a76df7",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "bd79b58d4c6fda434f81c8058872edbb",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 3,
          description: "地理位置更新",
          operator_strategy: "",
          id: "c252b7d312052cf7b9586d3e48bf11c6",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "a7855710791d4a5536fdb73c624e73d8",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 3,
          description:
            "Window(TumblingEventTimeWindows(60000), EventTimeTrigger, ThreatAlertProcess) -&gt; 资产规则更新",
          operator_strategy: "",
          id: "bd79b58d4c6fda434f81c8058872edbb",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "cbc357ccb763df2852fee8c4fc7d55f2",
              ship_strategy: "REBALANCE",
            },
          ],
          parallelism: 3,
          description: "白名单规则更新",
          operator_strategy: "",
          id: "a7855710791d4a5536fdb73c624e73d8",
          operator: "",
          optimizer_properties: {},
        },
        {
          parallelism: 1,
          description: "Source: 告警数据源 -&gt; 告警规则更新 -&gt; 空值过滤",
          operator_strategy: "",
          id: "cbc357ccb763df2852fee8c4fc7d55f2",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "76f6dde27f044b7fcd81ddc43561343c",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 1,
          description: "地理位置信息更新 -&gt; Sink: 生成威胁情报告警",
          operator_strategy: "",
          id: "e7bafbf86f9ecf2c2248c268b9bec848",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "954d87809ff8a8c09f08133d8c817fed",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 3,
          description: "资产规则更新 -&gt; 白名单过滤",
          operator_strategy: "",
          id: "76f6dde27f044b7fcd81ddc43561343c",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "c879822e55c2212bc742de16458cb6d7",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 1,
          description: "情报规则更新",
          operator_strategy: "",
          id: "954d87809ff8a8c09f08133d8c817fed",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "b23642197a427ec5db481d3963c66cfb",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 3,
          description: "威胁域名过滤",
          operator_strategy: "",
          id: "c879822e55c2212bc742de16458cb6d7",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "feca28aff5a3958840bee985ee7de4d3",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 3,
          description: "top白名单过滤 -&gt; alexa白名单过滤",
          operator_strategy: "",
          id: "b23642197a427ec5db481d3963c66cfb",
          operator: "",
          optimizer_properties: {},
        },
        {
          parallelism: 1,
          description: "Source: DNS消息，威胁情报数据源",
          operator_strategy: "",
          id: "feca28aff5a3958840bee985ee7de4d3",
          operator: "",
          optimizer_properties: {},
        },
        {
          parallelism: 1,
          description: "Source: 设备信息消息 -&gt; Sink: 设备信息",
          operator_strategy: "",
          id: "2963852293169ba90d9d1e7d6308db5c",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "60ac4735673ae8525c30be1912fb766d",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 1,
          description: "KeyedProcess -&gt; Sink: 404异常告警sink",
          operator_strategy: "",
          id: "e6ca9816e2a8c94d1d211f8ae018464a",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "95905ab780e8e55a1a1f41d0ffe39f3a",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 1,
          description: "404统计",
          operator_strategy: "",
          id: "60ac4735673ae8525c30be1912fb766d",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "95905ab780e8e55a1a1f41d0ffe39f3a",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 1,
          description: "login 404日基线阈值 -&gt; Sink: 404基线sink",
          operator_strategy: "",
          id: "8fe022fa7db4721e74b5e98aaaadcf84",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "403c40e57e228e42d6b0504580d94720",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 1,
          description: "Sink: 404 月基线阈值sink",
          operator_strategy: "",
          id: "83d61323a6087850093a0f0fa4f50f0a",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "95905ab780e8e55a1a1f41d0ffe39f3a",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 1,
          description: "login 404月基线阈值",
          operator_strategy: "",
          id: "403c40e57e228e42d6b0504580d94720",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "21c99bbb278ae17efdf374e592219419",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 1,
          description: "KeyedProcess -&gt; Sink: 200 异常告警sink",
          operator_strategy: "",
          id: "f3aec24c6a7fa0e3a3a704108fb156da",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "95905ab780e8e55a1a1f41d0ffe39f3a",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 1,
          description: "200统计",
          operator_strategy: "",
          id: "21c99bbb278ae17efdf374e592219419",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "4aa3c4d612c9d6dc1766b3b0d95ea691",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 1,
          description: "Sink: 200 基线sink",
          operator_strategy: "",
          id: "514007c3fae9f7be67c6454003caef92",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "95905ab780e8e55a1a1f41d0ffe39f3a",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 1,
          description: "login 200日基线阈值",
          operator_strategy: "",
          id: "4aa3c4d612c9d6dc1766b3b0d95ea691",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "a4f678176db7d70ea2c0b56b96b1d3fc",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 1,
          description: "Sink: 200 月基线阈值sink",
          operator_strategy: "",
          id: "964e38a2825c53227b7f70710236c4d9",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "95905ab780e8e55a1a1f41d0ffe39f3a",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 1,
          description: "login 200月基线阈值",
          operator_strategy: "",
          id: "a4f678176db7d70ea2c0b56b96b1d3fc",
          operator: "",
          optimizer_properties: {},
        },
        {
          inputs: [
            {
              num: 0,
              exchange: "pipelined_bounded",
              id: "1171dea6747ab509fdaefbe74f7195af",
              ship_strategy: "HASH",
            },
          ],
          parallelism: 1,
          description: "分流 -&gt; (异常主机过滤, 正常主机过滤)",
          operator_strategy: "",
          id: "95905ab780e8e55a1a1f41d0ffe39f3a",
          operator: "",
          optimizer_properties: {},
        },
        {
          parallelism: 1,
          description:
            "Source: http-ueba -&gt; 空值过滤 -&gt; 过滤.css|.js|.png|.ico结尾的url -&gt; login登录url过滤",
          operator_strategy: "",
          id: "1171dea6747ab509fdaefbe74f7195af",
          operator: "",
          optimizer_properties: {},
        },
      ],
      jid: "e9bf82e085bf26859e5a7ec132dcdec9",
      name: "Threat Streaming JOBS",
      type: "STREAMING",
    },
  },
};

// export function searchAfterByInputs(id, arr) {
//   //   let lastId = id;
//   //   arr.forEach((item, index) => {
//   //     if (item.inputs[0].id == id) {
//   //       console.log("--->", item.description);
//   //       id = item.id;
//   //       searchAfterByInputs(id, arr);
//   //       //   return null;
//   //     } else {
//   //       if (index == 10) {
//   //         return null;
//   //       }
//   //       searchAfterByInputs(lastId, arr);
//   //     }
//   //   });
//   let length = arr.length;
//   for (let i = 0; i < length; i++) {
//     if (arr[i].inputs[0].id == id) {
//       console.log("--->", arr[i].description);
//       id = arr[i].id;
//     }
//     if (i == length - 1) {
//       return;
//     } else {
//       searchAfterByInputs(id, arr);
//     }
//   }
// }

// 反向操作：将扁平化数据转换为树形数据
export function searchAfterByInputs(id, arr) {
  let treeData = [];

  for (let item of arr) {
    if (item.inputs !== undefined && item.inputs[0].id === id) {
      let children = searchAfterByInputs(item.id, arr);
      if (children.length > 0) {
        item.children = children;
      }
      treeData.push(item);
    }
  }

  return treeData;
}

// n叉树的层序遍历
export function levelOrderTraversal(treeData) {
  const result = [];
  const queue = [...treeData]; // 将根节点推入队列

  while (queue.length > 0) {
    const level = [];
    const levelSize = queue.length; // 当前层级的节点数量
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // 从队列中取出节点
      // level.push({ id: node.id, name: node.name }); // 将节点的 id 和 name 存入结果数组
      level.push(node); // 将节点的 id 和 name 存入结果数组
      if (node.children && node.children.length > 0) {
        queue.push(...node.children); // 将子节点推入队列
      }
    }
    result.push(level); // 将当前层级的节点存入结果数组
  }

  return result;
}

// 先序遍历
function preorderTraversal(node, level, result) {
  if (node) {
    result.push({
      id: node.id,
      desc: node.description,
      parallelism: node.parallelism,
      level,
    }); // 将节点的 id、name 和 level 存入结果数组
    if (node.children && node.children.length > 0) {
      for (let child of node.children) {
        preorderTraversal(child, level + 1, result); // 递归遍历子节点，并将层数加一
      }
    }
  }
}

export function preorder(treeData) {
  const result = [];
  for (let node of treeData) {
    preorderTraversal(node, 0, result); // 初始层数为 0
  }
  return result;
}

// 用于jobManager页面的数据处理
export function findObjectById(array, id, keyName = "id") {
  // 使用 Array.prototype.find() 方法查找匹配的对象
  return array.find((obj) => obj[keyName] === id).value;
}

let thisMonth = new Date().getMonth() + 1;
//用于日历的task数组
export let tasks = [
  {
    date: `2024-${thisMonth - 1}-3`,
    tasks: [
      {
        id: 1,
        type: "warning", //  warning  danger  primary   info
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
      {
        id: 2,
        type: "info",
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
    ],
  },
  {
    date: `2024-${thisMonth - 2}-10`,
    tasks: [
      {
        id: 1,
        type: "warning", //  warning  danger  info
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
      {
        id: 2,
        type: "info",
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
      {
        id: 3,
        type: "danger",
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
      {
        id: 4,
        type: "danger",
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
    ],
  },
  {
    date: `2024-${thisMonth}-11`,
    tasks: [
      {
        id: 1,
        type: "warning", //  warning  danger  info
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
      {
        id: 2,
        type: "info",
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
      {
        id: 3,
        type: "danger",
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
    ],
  },
  {
    date: `2024-${thisMonth - 1}-28`,
    tasks: [
      {
        id: 1,
        type: "warning", //  warning  danger  info
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
      {
        id: 2,
        type: "info",
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
      {
        id: 3,
        type: "danger",
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
    ],
  },
  {
    date: `2024-${thisMonth}-12`,
    tasks: [
      {
        id: 1,
        type: "danger", //  warning  danger  primary   info
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
      {
        id: 2,
        type: "info",
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
      {
        id: 3,
        type: "warning",
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
    ],
  },
  {
    date: `2024-${thisMonth}-22`,
    tasks: [
      {
        id: 1,
        type: "info", //  warning  danger  primary   info
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
      {
        id: 2,
        type: "info",
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
    ],
  },
  {
    date: `2024-${thisMonth}-27`,
    tasks: [
      {
        id: 1,
        type: "warning", //  warning  danger  primary   info
        desc: "abdcefghijklmnopqrstuvwxyz",
      },
    ],
  },
];
