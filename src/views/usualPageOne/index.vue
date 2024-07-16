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
引用一句不记得哪看来的“时间不是答案，但答案在时间里”。

    被单删后，说实话，尽管知道没可能了，但确实还难受了蛮长一段时间的，我也把之后的相亲都推了。
后来转变思路是因为有一天忽然想明白了，姻缘这种事是相互的，既然我找到了向你奔赴的理由，而你却
没有，这只能说明咱们之间并非正缘，我一味的强求反而是一种下作行为。于是我开始再次接受相亲，同
时也想着赶紧把你忘了。
    给你讲讲后面几位，你就当看故事吧。
    第三位，金沙的，小我几岁，属龙属蛇不记得了，家里拆迁两套房，这女的我感觉纯纯有病，没礼貌。
是两边家长子女先一起见面的，交换微信时连个名字都不给，“叫我小X就可以了”，加微信后我发现是仅聊
天的权限。
    这不一看就没入人家眼嘛，咱也不自讨没趣，正好她有点地包天我也没看上。回去后，就当天打了个招
呼，然后就没联系了。好像对面父母对我印象还行（不过有一说一对面父亲待人处事还是不错的，她母亲存
在感偏低不了解），过了两天又催到中间人那叫我主动，我爸骂了我一顿，我tm主动个得儿主动，我直接顺
着台阶下，以“没看上我，不自取其辱”为理由表示“很高兴认识你，再见”，对面就锁朋友圈进行了解释并道
歉，我表示理解，之后就躺列表吃灰。
    到此为止一切都还正常，后来我换手机导微信的时候，我发现她把我拉黑了，妈的真有病，我算是给足
她体面了吧，你把我删了我都没话说，一言不发拉黑，你是哪来的什么大小姐。
（这边想起来，后来我这么下头你都只是给我删除了，倒显得你可爱了，说实话异地而处，如果我是你，我
应该早就把自己拉黑了）

    第四位，也是先见面那种，不过她妈去打牌了，就她一个人来的，这点我还挺佩服她的，我家里虽然对
此有点微词，但也没太介意。然后我就有一搭没一搭的聊了两周，这边还有点受你影响，甚至有时候会有种
在跟你聊天的既视感，尝试邀约了两次没出来，我就撤了，断联一周然后跟她商量好应付家里就此结束。后
来发现抛开相亲这层身份，倒是挺聊得来网友。目前已经在列表吃灰了。
（事后曾邀请她讨论了一回，倒是有了一个收获，她说“现在的女孩子都不想谈恋爱，自己比较快乐”，这点
第六位也很赞同，我想了下套在你身上好像也对）

    第五位，也是先双方见面（我是真烦这个，尴尬的一批，以后条件允许我还是直接先加微信吧），怎么
说呢，胖得不漂亮，我没感觉，回家后人家打招呼我都没回，这确实有点没礼貌了，不过反正以后也不会有
交集，无所谓了。





-->
