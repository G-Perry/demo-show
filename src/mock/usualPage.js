import Mock from "mockjs";

// get请求从config.url获取参数，post从config.body中获取参数
function getParamObj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

let List = [];
const count = 200;

for (let i = 0; i < count; i++) {
  // Random.date()
  let birth = Mock.Random.date();
  let thisYear = new Date().getFullYear();
  List.push(
    Mock.mock({
      index: i + 1,
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      address: Mock.mock("@county(true)"),
      // "age|18-60": 1,
      birth: birth,
      age: thisYear - birth.slice(0, 4),
      identityCard: Mock.Random.id(),
      sex: Mock.Random.integer(0, 1),
      status: Mock.Random.integer(0, 1),
      // age: 2022-Number('@date("yyyy")'),
      // birth: '@date',
    })
  );
}

export default {
  getList(config) {
    let queryParams = getParamObj(config.url);
    return {
      total: List.length,
      rows: List.slice(
        queryParams.pageSize * (queryParams.pageNum - 1),
        queryParams.pageSize * queryParams.pageNum
      ),
      code: 200,
    };
  },
};
