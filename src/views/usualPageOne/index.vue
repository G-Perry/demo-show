<template>
  <div class="son_fit_father">
    <span class="pageTitle">页面标题</span>
    <top-search
      :searchConfig="searchConfig"
      @handleSearch="handleSearch"
      @handleRefresh="handleRefresh"
      bottom-border
    ></top-search>
    <section class="table_up_btns">
      <button class="hover_blue_btn" @click="handleAddDialogOpen">
        <i class="el-icon-circle-plus"></i>
        <span>新增</span>
      </button>
      <div class="line"></div>
      <button
        class="hover_blue_btn"
        :disabled="single"
        @click="handleEditDialogOpen"
      >
        <i class="el-icon-edit" style="font-weight: 600"></i>
        <span>修改</span>
      </button>
      <div class="line"></div>
      <button
        class="hover_blue_btn"
        :disabled="multiple"
        @click="handleStatusChange('on')"
      >
        <i class="el-icon-check" style="font-weight: 600"></i>
        <span>启用</span>
      </button>
      <div class="line"></div>
      <button
        class="hover_blue_btn"
        :disabled="multiple"
        @click="handleStatusChange('off')"
      >
        <i class="el-icon-close" style="font-weight: 600"></i>
        <span>禁用</span>
      </button>
      <div class="line"></div>
      <button class="hover_blue_btn" :disabled="multiple" @click="handleDelete">
        <i class="el-icon-delete-solid"></i>
        <span>删除</span>
      </button>
    </section>
    <el-table
      :data="tableData"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      height="0"
    >
      <el-table-column
        type="selection"
        width="40"
        align="center"
      ></el-table-column>
      <!-- <el-table-column type="index" width="50" label="序号" align="center"></el-table-column> -->
      <el-table-column
        width="50"
        label="序号"
        align="center"
        prop="index"
      ></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">{{ scope.row.sex | sexMatch }}</template>
      </el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="birth" label="出生日期"></el-table-column>
      <el-table-column
        prop="identityCard"
        show-overflow-tooltip
        label="身份证"
      ></el-table-column>
      <el-table-column prop="phoneNum" label="电话号码"></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        min-width="300"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="status" width="90" label="状态">
        <template slot-scope="scope">
          <!-- <common-button></common-button> -->
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="handleStatusSwitchChange(scope.row)"
          ></el-switch>
          <!-- <el-switch v-model="scope.row.status | statusMatch"></el-switch> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template slot-scope="scope">
          <button
            class="btn_in_table"
            title="修改"
            @click="handleEditDialogOpen(scope.row)"
          >
            <i class="el-icon-edit"></i>
          </button>
          <button
            class="btn_in_table"
            title="删除"
            @click="handleDelete(scope.row)"
          >
            <i class="el-icon-delete"></i>
          </button>
        </template>
      </el-table-column>
    </el-table>
    <div ref="pagination-bar" class="bottom_pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page="queryParams.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryParams.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="total"
      ></el-pagination>
    </div>
    <addOrEditDialog ref="addOrEditDialog"></addOrEditDialog>
  </div>
</template>

<script>
import {
  getUserList,
  updateUserStatusById,
  getUserDetailsById,
  userDeleteById,
} from "@/api/index";
import addOrEditDialog from "./addOrEditDialog.vue";
import { commonCURD } from "./commonCURD";
export default {
  mixins: [commonCURD],
  components: {
    addOrEditDialog,
  },
  data() {
    return {
      // 请求参数
      queryParams: {},
      // 顶部搜索表单配置
      searchConfig: [
        { name: "AAA", key: "aaa", type: "input" },
        { name: "BBBbbbBBB", key: "bbb", type: "input" },
        {
          name: "CCC",
          key: "ccc",
          type: "select-filter",
          list: [],
        },
        {
          name: "DDDdddDDD",
          key: "ddd",
          type: "select-filter",
          list: [],
        },
        { name: "EEE", key: "eee", type: "input" },
        { name: "FFF", key: "fff", type: "input" },
        { name: "GGGgggGGG", key: "ggg", type: "input" },
        { name: "HHH", key: "hhh", type: "date" },
        { name: "III", key: "iii", type: "input" },
        { name: "JJJ", key: "jjj", type: "input" },
        {
          name: "KKK",
          key: "kkk",
          type: "select",
          list: [],
        },
        {
          name: "LLL",
          key: "lll",
          type: "select",
          list: [],
        },
        {
          name: "MMM",
          key: "mmm",
          type: "select",
          list: [],
        },
      ],
    };
  },
  filters: {
    sexMatch(sexNum) {
      return sexNum == 1 ? "男" : "女";
    },
  },
  methods: {
    resetQueryParams() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 20,
        aaa: undefined,
        bbb: undefined,
        ccc: undefined,
        ddd: undefined,
        eee: undefined,
        fff: undefined,
        ggg: undefined,
        hhh: undefined,
        iii: undefined,
        jjj: undefined,
        kkk: undefined,
        lll: undefined,
        mmm: undefined,
      };
    },
    handleStatusChange(sign) {
      this.$confirm(
        "此操作将 " + (sign == "off" ? "禁用" : "启用") + " 账号, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let data = {
            id: this.ids,
            status: sign == "off" ? 0 : 1,
          };
          updateUserStatusById(data).then((res) => {
            res.code == 200 && this.getList();
          });
          this.$message({
            type: "success",
            message: "操作成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消",
          });
        });
    },
    handleAddDialogOpen() {
      this.$refs.addOrEditDialog.reset();
      this.$refs.addOrEditDialog.address = [];
      this.$refs.addOrEditDialog.dialogTitle = "新增";
      this.$refs.addOrEditDialog.dialogVisible = true;
    },
    handleEditDialogOpen(row) {
      this.$refs.addOrEditDialog.reset();
      const id = row.id || this.ids[0];
      getUserDetailsById(id).then((res) => {
        if (res.code == 200) {
          this.$refs.addOrEditDialog.dialogTitle = "修改";
          this.$refs.addOrEditDialog.form = res.row;
          this.$refs.addOrEditDialog.address = res.row.address.split(" ");
          this.$refs.addOrEditDialog.dialogVisible = true;
        }
      });
    },
    handleStatusSwitchChange(row) {
      this.$confirm(
        "此操作将" +
          (row.status == 0 ? "禁用 " : "启用 ") +
          row.name +
          " 的账号, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let data = {
            id: [row.id],
            status: row.status == 0 ? 0 : 1,
          };
          updateUserStatusById(data).then((res) => {
            res.code == 200 && this.getList();
          });
          this.$message({
            type: "success",
            message: "操作成功",
          });
        })
        .catch(() => {
          row.status = row.status == 0 ? 1 : 0;
          this.$message({
            type: "info",
            message: "操作已取消",
          });
        });
    },
  },
  created() {
    this.searchConfig.forEach((item) => {
      item.key == "ddd" &&
        (item.list = [
          {
            label: "已完善",
            value: true,
          },
          {
            label: "未完善",
            value: false,
          },
        ]);
      item.key == "ccc" &&
        (item.list = [
          {
            label: "111111",
            value: 1,
          },
          {
            label: "222222",
            value: 2,
          },
          {
            label: "333333",
            value: 2,
          },
        ]);
    });
    this.idName = "id";
    this.getListApi = getUserList;
    this.getDetailsById = getUserDetailsById;
    this.deleteApi = userDeleteById;
    this.resetQueryParams();
    this.getList();
  },
};
</script>

<style scoped>
.pageTitle {
  display: block;
  height: 36px;
  line-height: 36px;
  box-sizing: border-box;
  padding: 0 20px;
  font-weight: 600;
  border-bottom: 1px solid #eee;
}

.table_up_btns {
  width: 100%;
  height: 36px;
  line-height: 36px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.bottom_pagination {
  height: 36px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

::v-deep .cell:empty::before {
  content: "-";
  color: gray;
}

::v-deep .el-table {
  display: flex;
  flex-direction: column;
}

::v-deep .el-table__body-wrapper {
  flex: 1;
  overflow-y: auto;
}
</style>


<!-- 

你好，这里是葛王华，今天摸鱼抽空把这个写一下。

    对于一二月那会儿的迷惑操作向你诚挚道歉，希望不会对你后续的相亲造成排斥心理。我在本文对当
初的心路历程进行分析，希望能得到你的原谅。
以下是我后续反思自省之后对当初迷惑操作的分析，我把整个10月到2月梳理了一下，把整个过程分割为：
    阶段一：十月份初识--“歧视”事件
    阶段二：断联的一个月
    阶段三：十二月中旬--一月你断崖式断联
    阶段四：一月中旬开始的迷之操作--你单删

    简单描述下就是：
    阶段一：一个在恋爱方面心理年龄还很幼稚的白纸，忽然转变思想接受相亲，跑上来遇到一个能看上眼的，
就一个劲儿找你身上的优点、契合点，并因此逐渐上头。
    阶段二：并没有因断联而冷静，反而是自我洗脑、自我感动式持续上头
    阶段三：问题就出在这里，回顾起来这里思绪相当混乱。入局之后，并没有相关的经验，又不得其法，
反而急于求成疏忽边界感，同时潜意识将你抬高，心理上产生不安和自卑，越陷越深。
    很感谢你当时给了我第二次机会，不过当时自己并没有窥得全貌，给再多机会都没用。
    阶段末期你断崖式断联那会儿，有过一周时间缓冲，其实我已经有了心理准备。可还记得你给出祝福之后，
我曾邀请你复盘本次相亲，如果你当时能与我理性讨论交流，咱们大概率还能停留在朋友这一层关系，也就
没有之后的迷惑操作了。（这一点后续解释）
    阶段四：（这一段我都不想回忆，简直是黑历史，天知地知你知我知，当笑料就行别外传，谢谢了。）
为啥会这样呢，是因为你当时一言不发，我自己又没有外力指点破局，思维进了死胡同。当时你真的一句话
不说，我真的以为你给我屏蔽了。反正发啥你都不看，那我就心安理得地将你当个潜在的激励意象，当作磨
刀石罢了。（好尴尬啊，想想就想给自己一巴掌）



    以上大部分是表象，贯穿始终一直到现在的还有一条内在的线，那就是“意义”，我一直在寻找能够解释
你出现的意义，这也是阶段三末期和阶段四以及之后很长一段时间我思绪混乱、操作混乱和头疼的点。
    这边我采用“定果寻因”的方式叩问本心，以此逆推解释。

    问：我为什么执着于寻找所谓的意义？
    答：因为不知道从几岁起，我会时不时地复盘自省，就是那种以人为鉴以史为鉴的意思。我总觉得我
所经历的一切都有其存在的意义，或为人或为事，这些存在可能教会我某种道理或是吸取教训；又或者某
一刻的某一场景，长存心底，或温馨“此心安处是吾乡”，或警醒“前覆后戒”。

    问：我为什么会执着于寻找你出现的意义？
    答：因为你出现的前后和时机，在我的视角来看带有很强烈的玄学色彩，一开始我以为是你是天赐的缘
分，然而当我发现并不是的时候，我找不到新的意义来代替前者，我迷茫了。在相当长一段时间里我始终未
能找到一个准确合理的“意义”来说服自己，所以阶段三末期之后内心一直很煎熬。

    问：我为什么会成为这样的人？
    答：分两点
    “偏好玄学”--后来研究了一段时间的玄学，发现自己命带华盖，天生就对玄学类的事物感兴趣，回忆
一下确实如此，从小我就很喜欢志怪类的影视剧，大了又很偏好玄幻仙侠类的小说。
    “寻找意义”--这应该是受到“陆王心学”的影响。以前读《明朝那些事儿》的时候很喜欢王阳明这位先
贤，而恰好其父也叫王华；另一个是因为我很喜欢的《剑来》中陈平安的原型就是王阳明。受此影响，我
可能有点主观唯心主义，同样的我寻找意义的行为又有点朱熹“格物致知”的意思。

    好了，有了上述背景，再来解释下当初的迷之操作。
    问：我为啥会做出那样的事？
    答：因为当时你一句话不说，我自己搁那儿思维进入死胡同。内心煎熬下，我寻到的破局之法是固执地
给你定了个意义，那就是你的出现是为了提醒自己变得更好。反正你也不说话，管你看不看，就拿你当砥砺
自己的磨刀石了，把每天自己的锻炼、学习什么的发给你。当时的想法是，赶紧把自己身体、学识提高一个
档次，迫切地想证明出这一点来，然后就能寻到意义所在，我也就心安理得地真正放下。

    问：为什么1月28号那天你叫我别发了，我仍旧很偏执地一意孤行？
    答：因为时机不对，你如果在一开始就拒绝这种行为，我是不会这么做的，也没这个脸做这个。

    问：为啥那个时间点不对？
    答：你一言不发，我虽然头脑混乱，但整天琢磨还是想明白了一些事，那就是上文提到的自卑，入局
之后我产生了自卑的心理，没来由的，好像挺常见，刷知乎发现我这类白纸初次喜欢上一个女生之后都会
这样。此前我只感觉阶段三末期有一种违和感，不自信，处处掣肘，并没有意识到这点。而在那个时间点
我发现了自己产生自卑感，同时好像触底反弹一样，空前自信，哪管你接不接受，直接我行我素。其实在
那个时间点，我已经知道自己没机会了，只是固执地想证明当时所认准的意义。
    我还记得我好像说过“既知事不可为，便不会纠缠”，那啥，真的对不起，当时那个时间点我认了死理，
真的一点都不认为是在纠缠。现在回头是有点尴尬。

    问：怎么发现这一点的呢？
    答：1月28号那天公司年会，我去的早，被拉着布置场景，之后就坐在紫琅湖边吹风，看着湖面浩渺、视
野广阔，胸中生出一股豪迈之气。就好像是，在此之前我与自己周旋许久，然后在此契机下临门一脚，“拨开
云雾见天日，守得云开见月明”。不过似乎过头了，当时在那种心境下写了小作文，言辞过于狂放，自信过头
了，还有当时的下头行为，对你造成困扰实在抱歉，在此向你诚挚致歉。


再补充两点作为背景：

    问：我到底为啥会喜欢上你？
    答：这一点我其实也有点迷惑，明明连面都没见过，咋单凭聊天就忽然舔上了。后来有回刷知乎，我
好像找到了答案，原文我找不到了，大意就是零经验、母单、长期单身以此为背景，忽然转变思路想谈恋爱
了，这时候来了个条件能入眼的，便单方面寻找对方的优点和契合点，自我感动式潜移默化，就这么喜欢上
了，不过又因为零经验加无意识的自卑，小丑是必然，失败是必然。

    问：你有哪几点吸引到我？
    答：1.你的长相在我审美上，仅凭一张照片，这有点扯但确实是这样，其实我一开始还没注意到这个，
        是后来相亲遇到没眼缘的我都不想搭理，这才想到这一点。（后来抖音刷到一个博主，昵称叫“77不爱读书”，
        我感觉眉眼跟你很像，我给朋友看他也这么说。一开始刷到看了心烦，后来倒是平常心了。我刚关注那会儿
        人还很少，后来不知道哪个奇才想出来的评论，然后评论区画风就变奇怪了）
      2.你我的兴趣爱好有大部分重合。
      3.玄学因素，这点我至今无法解释，因为实在是有点巧合了。
          3.1 我心态转变开始相亲，这时候你出现了，而且大部分符合我的择偶观
          3.2 你出现之前我经历了半个月左右的水逆，加了你之后有没有时来运转不记得了，反正是没事了
          3.3 我主动断联那个月，好像是第二天开始口腔溃疡，断断续续一周都没好，我试着分享了一首歌
              给你，这次好了。（平时一年都不见得会口腔溃疡的，还有水逆那会儿第一次得荨麻疹，都赶
              那段时间了，反正很神奇。）
          3.4 中间应该还有一段，我不记得了
          3.5 除夕那天你把我删了，当晚就发烧38°，又吐又泄，一直到大年初二晚上温度才降下来。我都无
              语了，好像必须跟你有牵扯才行。（后来我记得个把月身体都是亚健康状态，什么锻炼肌肉拉伤，
              好像还有复阳，还有后来锻炼把肩膀练伤了，到现在还没完全好。这边有点牵强，但硬扯好像也
              能扯上关系）
          3.6 想起来还有一个，被删后，我当时想找个借口放弃得了，搁那儿抛硬币，真不是骗你，无论我选
              字还是花，问放弃抛出来的结果六七次都是都是凶，问继续吉凶参半，问结局一凶多吉一大吉。
              后两者我还持怀疑态度，第一个就有点怀疑人生了，要不是当时我还记录了一下，现在回头我
              都怀疑是不是记忆错乱了，有记录的就六次，好像后面又抛了几回也都是凶。              
      4.你我同姓，这一点占比还是比较重的，我似乎受到了网络上女拳关于冠名权的影响，如果同姓，可以
        省下很多麻烦事，我这人最怕麻烦了。
      5.你的家庭结构，你是非独。现在流行的两家并一家很好，不过我观念偏古，更希望能娶你进门。扪
      心自问，我会是任何人的良人，同样我家里也不是强势的人家，都是软性子，会是不错的婆家。以我成
      长的经验来看，家里人喜欢女孩子多一些。（这一点有些大男子主义了）





解释便先到这里，接下来讲讲后续我找到的意义。
引用一句不记得哪看来的“时间不是答案，但答案在时间里”。阶段三末期，我知道自己机会已经很小了，
当时想着的是保持不断联，拖着，以期能在接下来的时间里能迸发灵感。

    被单删后，说实话，尽管知道没可能了，但确实还难受了蛮长一段时间的，我也把之后的相亲都推了。
后来转变思路是因为有一天忽然想明白了，时间点大概是在三月中旬，姻缘这种事是相互的，既然我找到
了向你奔赴的理由，而你却没有，这只能说明咱们之间并非正缘，我一味的强求反而是一种下作行为。于
是我开始再次接受相亲，同时也想着赶紧把你忘了。

    给你讲讲后面几位，你就当看故事吧。

    第三位，金沙的，小我几岁，属龙属蛇不记得了，家里拆迁两套房，好像是文员。这女的我感觉纯纯有
病，没礼貌。是两边家长子女先一起见面的，交换微信时连个名字都不给，“叫我小X就可以了”，加微信后我
发现是仅聊天的权限，朋友圈锁着。
    这不一看就没入人家眼嘛，咱也不自讨没趣，正好她有点地包天我也没看上。回去后，就当天打了个招
呼，然后就没联系了。好像对面父母对我印象还行（不过有一说一对面父亲待人处事还是不错的，她母亲存
在感偏低不评价），过了两天又催到中间人那叫我主动，我爸骂了我一顿，我tm主动个得儿主动，我直接顺
着台阶下，以“没看上我，不自取其辱”为理由表示“很高兴认识你，再见”，对面就锁朋友圈进行了解释并道
歉，我表示理解，之后就躺列表吃灰。
    到此为止一切都还正常，后来我换手机导微信的时候，我发现她把我拉黑了，妈的真有病，我算是给足
她体面了吧，你把我删了我都没话说，一言不发拉黑，你是哪来的什么大小姐。
（这边想起来，阶段四我这么下头你都只是给我删除了，倒显得你可爱了，说实话异地而处，如果我是你，我
应该早就把自己拉黑了）

    第四位，会计，也是先见面那种，不过她妈去打牌了，就她一个人来的，这点我还挺欣赏她的，落落大方，
我偏i人做不到她这么好，我家里虽然对此有点微词，但也没太介意。然后我就有一搭没一搭的聊了两周，（她
也是那种找了有回应，不找就没话的样子，结合第六位，我发现你们女生好像都这样）这边还有点受你影响，
甚至有时候会有种在跟你聊天的既视感，不过人家回应起来比你积极些，尝试邀约了两次没出来，我就撤了，
断联一周然后跟她商量好应付家里就此结束。后来发现抛开相亲这层身份，倒是挺聊得来网友。目前已经在
列表吃灰了。
（之后曾邀请她讨论了一回，倒是有了一个收获，她说“现在的女孩子都不想谈恋爱，自己比较快乐”，这点
第六位也很赞同，我想了下套在你身上好像也对）

    第五位，也是会计，也是先双方见面（我是真烦这个，尴尬的一批，以后条件允许我还是直接先加微
信吧），怎么说呢，胖得不漂亮，没感觉，回家后人家打招呼我都没回，这确实有点没礼貌了，不过反正
以后也不会有交集，无所谓了。过了三天人家应该是被家里赶鸭子上架，问我态度，逃不掉了，我直接说
她有点胖不喜欢，措辞稍微委婉但真诚。之后就没联系，换手机发现被第三位拉黑后，我看了下，这一位
也只是给我删了，后来我跟第三位和第六位都讨论过这件事，俩人都表示说女生胖是件非常伤人的事。对
比一下，感觉第三位更有病了。
（在复盘这一位时，结合第三位，我发现我也不是啥好鸟，遇到没感觉的我也懒得发消息，不过相较而言，
还是你更厉害。同时也是在此时，我发现了上文被你吸引的第一个点。）

    第五点五位，她当时是待业，是第五位那会儿跟我大学室友微信电话，不知道怎么扯到你了，他自作
主张给自己表妹和我牵线。其实那会儿我又有点不想相亲了，人家一番好意我也不能驳了面子，就聊了一
天，隔天早上打了个招呼没回，刚好我也不想继续，后来我也没再找过，已在列表吃灰。
（她跟第一位一样，都是在我不想相亲的时候出现，都一样就只聊了一晚。不过按照那天了解的，她倒是
也有不少契合点，其中之一是她也对玄学感兴趣，自学过一段时间紫微斗数。我发现现在的年轻人好像都
对这个挺感兴趣的。）

    接下来是当前的最后一位了，我也是在这找到能说服自己的答案。

    第六位，人事，四月下旬先加的微信，当初那会儿她刚跳槽到昆山，一开始我也没报啥期望，算是应
付家里。同样不主动就没回应的标准开局（你们女生是不是都一个样，知乎上相亲贴好像也这么说），聊
了几天我又想撤了，还断联了一周，后来不知道为啥又聊上了。
    后面就维持基本的不断联，五一还错过了，一直到十八号才见了第一面。比我能接受的胖要稍微胖一
点点，我一直以为我的审美是那种白幼瘦，后来发现对她还是有感觉的。
    仍旧无经验，接下来我也不知道该如何去推进关系，同时也没报特别的期望。基于知乎上看的“还愿
意搭理你就对你还敢兴趣”这样的结论，再结合在你那吸取的教训。我就维持住两点“不断联”、“不入局”，
以这样的原则去接触，至少不会有像阶段三四那会儿的昏头行为。
    后来啊，就每天聊聊，我发现她也会主动分享、发牢骚了，（原来不用刻意找话题啊，每天抱怨傻逼
公司都能乐此不疲），之后也是陆续见了几次，交换礼物，一起出去玩什么的。现在回头再看，是她先入
局了，后来她回南通的频次增加了，她也曾承认有我的原因在，“莫名其妙愿意一起出去一次两次三次，
还三天两头想回南通”。后来还是喜欢上她了，我不知道怎么形容，就是跟她在一起时很舒服，心很平静，
就是一种默契、契合感。倒也不是人家段位高，段位真高的话，我这种白纸应该是被牵着鼻子走的。而我
呢，也是个胆小的，自始至终连手都没牵过，哈哈哈哈哈太菜了。
    在此过程中，我了解到她曾谈过，几个我没问，我直觉告诉我是非处，但我还没做好面对否定答案的
思想准备。后来我本以为自己能接受非处了，不过这样的冲动经过“一鼓作气，再而衰，三而竭”，难得提
起的一口气终究是泄掉了，倒在了表白前。
    我的直觉很准，而我终究还是接受不了。这是一根刺，哪怕再小也终究存在，扎在肉里会痛，拔出来
会伤。
    六月底结束了，这短暂的美丽的意外。放下的过程有些痛苦，但好像也没阶段三四那会儿那么难受。
目前差不多走出来了，不过真正走出来应该是要等下一次心动了。



说几点题外话与建议。
    在后面几次相亲中，我大概对自己有了个定位，可以用鸡肋来形容，比上不足比下有余，叫人
投怀送抱那不可能，但各方面条件也不差，我都不知道阶段三那会儿自卑个什么劲儿，只能归咎于
潜意识作祟了。
    我也总结了一些方法论，我该做的就是保持一颗平常心，不入局，不多想，主打一个陪伴和提
供情绪价值，保持不断联的基础上，增加我在对面生活中的存在感，应该保底能有个日久生情。光
凭聊天我好像没本事提高太多好感，先尝试送礼物打开局面，有回应最好，没回应就及时止损，之
后还是要多见面才行。
（我真正聊了的也就你、第四、第六位，我发现过了初期探索那段过程之后，找不到话题聊天很无
趣，自然也约不出来，异地而处，我也不想浪费大半天的时间，跟一个无趣的人出去。第六位一开
始也没出来，约了第三次还是第四次才见面的，见面之后聊起来感觉好点了，也可能是错觉，后面
我再总结总结）

    上文抛硬币那会儿，另有一个六七月会有变局的结论，记得当时也发给你看，猜你应该也没看。
我一度将信将疑，现在看来好像还真有点玄学。原来所谓变局不是你我之间再续前缘，而是有了多次
经历之后，汇集在这个时间点我解开了之前的心结。
    另外几处卦象，也都能说得通。至于那个问结局，唯一一次多个硬币同花色的大吉之卦，反而
最好解释，物极必反罢了。


    后来我想过，你应该也非处，记得当时你模棱两可没有给出正面回答，后来还发了什么“配不上你”
这样的话。只是当时我半入局，以第一意义麻痹自己，没多想这个。话说直接说不行吗，是就是，不是
就不是。处的话，二十多岁的女生能守住底线，不应该是件很骄傲的事吗？非处的话，不能敢爱敢恨敢
作敢当吗？人各有志，只是我个人介意，又不会批判，理解但不认可罢了。
  







好了，故事到此为止，我寻到的意义何在呢？

问：在我的视角你的出现有哪些意义呢？
答：10月-12月中旬：你是我天赐的缘分。（已废弃）
    1月-3月：你的出现是为了提醒我变得更好（不再固执地迫切地想证明这一点，正缓慢证明中，其实
    当我动了向上地念头起，有结果是必然，完全没必要阶段四那样太着急具象化证明它）
    6月-7月：你是我的情劫（与你这段经历的后半程，是一个问心局，反思复盘中我收获了不少经验，
    包含了很多是什么、为什么、怎么做，这是我脱单路上从零到一很宝贵的经验。）

    我找到了你出现的意义，你的出现，是叫我尽早地从原先排斥相亲、单身万岁的固执思想中调整
    过来。同时提醒自己收起一部分的少年心气，将相差心理年龄和生理年龄拉近，不要再幼稚固执。
    从你这获取经验是因，之后运用在第六位以及今后其他人的实践中，便是果。很感谢你在
    阶段三四那会儿对我无礼行为的包容，容我再次向你诚挚地致歉。
    （上文我提到，如果阶段三末期你能与我讨论复盘一番，我大概就不会想第二个意义了，
    直接就能得出类似于“你是我相亲路上的经验包”的结论，也就不会有后面的事了。）


你要说我对你是否还心存幻想，好像还有点，但咱也做不出没脸没皮地事（额，阶段四那会儿
你一句话不说，我真没觉得自己做的哪有问题，现在看太傻逼了），再多经历几次第六位我差
不多也就真放下了。


最后，终于来到祝福的环节。

    你我之间的故事终将合页，很感谢你的出现，赐我一场问心局。历时数月我已寻得真意，心境臻至
圆满，此文便是最后得一片拼图。
    山高水长，江湖路远，珍重万千。祝君早觅良人，寻得一个好人家，愿君今后平安顺畅，一路安康，
带着我的祝福一定要幸福快乐呀。
（二三月我说不出这个话，四月只能说半句。写到这里，我忽然想起来你四月那会
儿换了个那种花开富贵的头像，当时想找你来着，还好忍住了哈哈哈哈哈，后来看你
又换回来了，想来是度过了烦心事，真好）


-->
