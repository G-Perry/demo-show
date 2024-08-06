<template>
  <section class="scroll_doc" ref="scroll_doc">
    <!-- 左侧目录 -->
    <section class="left" ref="left">
      <dl v-for="item in document" :key="`list_title_${item.title}`">
        <dt>{{ item.title }}</dt>
        <dd
          v-for="el in item.children"
          :key="`list_subTitle_${el.title}`"
          class="list_subTitle"
          @click="handleSubTitleClick(el.document.id)"
        >
          {{ el.title }}
        </dd>
      </dl>
    </section>
    <!-- 右侧文档 -->
    <section class="right" ref="right">
      <!-- <section v-for="i in 5" :key="i">
        <div class="doc_title">
          <span>什么是漏洞</span>
        </div>
        <div class="doc_subTitle">什么是漏洞</div>
        <div class="doc_content">
          <p>
            漏洞是指一个系统存在的弱点或缺陷，系统对特定威胁攻击或危险事件的敏感性，或进行攻击的威胁作用的可能性。漏洞可能来自应用软件或操作系统设计时的缺陷或编码时产生的错误，也可能来自业务在交互处理过程中的设计缺陷或逻辑流程上的不合理之处。漏洞可能被有意或无意地利用，从而对一个组织的资产或运行造成不利影响，如信息系统被攻击或控制，重要资料被窃取，用户数据被篡改，系统被作为入侵其他主机系统的跳板。
          </p>
        </div>
      </section> -->
      <section v-for="item in document" :key="`doc_title_${item.title}`">
        <div class="doc_title">
          <span>{{ item.title }}</span>
        </div>
        <div
          v-for="el in item.children"
          :key="`doc_self_${el.title}`"
          :id="el.document.id"
          class="doc_self"
        >
          <div class="doc_subTitle">{{ el.title }}</div>
          <div class="doc_content">
            <section v-html="el.document.content"></section>
          </div>
        </div>
      </section>
    </section>
    <!-- 右下按钮 -->
    <el-button
      type="primary"
      icon="el-icon-arrow-up"
      class="return_to_top_btn"
      v-show="btnIsShow"
      @click="returnToTop"
      circle
    ></el-button>
    <el-popover placement="left" width="360" trigger="hover">
      <section class="page_info">
        <span>
          页面：
          <span style="font-size: 12px">{{ pageInfoName }}</span>
        </span>
        <span>
          简述：
          <span style="font-size: 12px">{{ pageInfoDesc }}</span>
        </span>
      </section>
      <i class="el-icon-info page_info_icon" slot="reference"></i>
    </el-popover>
  </section>
</template>

<script>
export default {
  data() {
    return {
      document: [
        {
          title: "企业须知",
          children: [
            {
              title: "1.补天漏洞响应平台介绍",
              children: [],
              document: {
                id: 7,
                title: "企业须知",
                subTitle: "1.补天漏洞响应平台介绍",
                content:
                  "<p>\t补天漏洞响应平台，是专注于漏洞响应的第三方公益平台。补天平台通过充分引导民间的白帽力量，实现实时的、高效的漏洞报告与响应，守护企业网络安全，积极推动互联网安全行业的发展。被公安部、工信部、CNCERT、国测等机构评定为优秀技术支撑单位。</p><p>\t补天平台通过SRC、众测等方式服务广大企业，以安全众包的形式让白帽子从模拟攻击者的角度发现问题，解决问题，帮助企业树立动态、综合的防护理念，维护企业的网络安全。</p><p>\t网聚安全力量，为社会提供准确、详实的安全情报，让全中国网络都实现漏洞的及时发现与快速响应是补天平台始终坚持并不断履行的社会使命。</p>",
              },
            },
            {
              title: "2.什么是白帽子？",
              children: [],
              document: {
                id: 8,
                title: "企业须知",
                subTitle: "2.什么是白帽子？",
                content:
                  '<p>\t<span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">白帽子指通过能够识别计算机系统或网络系统中的安全漏洞的安全技术专家，但并不会恶意利该漏洞，而是提交给企业或者能够找到该企业的第三方漏洞平台，帮助企业在被其他人恶意利用之前修补漏洞，</span>\t\t<span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">维护计算机和互联网安全。</span></p>',
              },
            },
            {
              title: "3.什么是漏洞？",
              children: [],
              document: {
                id: 9,
                title: "企业须知",
                subTitle: "3.什么是漏洞？",
                content:
                  "<p>\t漏洞是指一个系统存在的弱点或缺陷，系统对特定威胁攻击或危险事件的敏感性，或进行攻击的威胁作用的可能性。漏洞可能来自应用软件或操作系统设计时的缺陷或编码时产生的错误，也可能来自业务在交互处理过程中的设计缺陷或逻辑流程上的不合理之处。</p><p>\t漏洞可能被有意或无意地利用，从而对一个组织的资产或运行造成不利影响，如信息系统被攻击或控制，重要资料被窃取，用户数据被篡改，系统被作为入侵其他主机系统的跳板。</p>",
              },
            },
            {
              title: "4.补天平台上的漏洞会公开吗？",
              children: [],
              document: {
                id: 10,
                title: "企业须知",
                subTitle: "4.补天平台上的漏洞会公开吗？",
                content:
                  '<p>\t<span style="background-color: rgb(255, 255, 255); color: rgb(96, 96, 96);">补天平台为了保护广大企业用户的利益，防止漏洞被恶意黑客二次利用，补天平台永久保护漏洞信息。</span></p>',
              },
            },
          ],
          document: null,
        },
        {
          title: "什么是漏洞",
          children: [
            {
              title: "漏洞定义",
              children: [],
              document: {
                id: 2,
                title: "什么是漏洞",
                subTitle: "漏洞定义",
                content:
                  "\t漏洞是指一个系统存在的弱点或缺陷，系统对特定威胁攻击或危险事件的敏感性，或进行攻击的威胁作用的可能性。漏洞可能来自应用软件或操作系统设计时的缺陷或编码时产生的错误，也可能来自业务在交互处理过程中的设计缺陷或逻辑流程上的不合理之处。漏洞可能被有意或无意地利用，从而对一个组织的资产或运行造成不利影响，如信息系统被攻击或控制，重要资料被窃取，用户数据被篡改，系统被作为入侵其他主机系统的跳板。",
              },
            },
          ],
          document: null,
        },
        {
          title: "关于实名认证",
          children: [
            {
              title: "实名认证",
              children: [],
              document: {
                id: 3,
                title: "关于实名认证",
                subTitle: "实名认证",
                content:
                  "\t《互联网群组信息服务管理规定》已经于2017年10月8日正式施行。该规定强调，群组信息服务提供者应当对互联网群组信息服务使用者进行真实身份信息认证，建立信用等级管理体系，合理设定群组规模，实施分级分类管理，并采取必要措施保护使用者个人信息安全。\t补天平台会全方位保护用户的信息安全，请大家放心进行实名认证，同时需要注意若提示“请检查录入的身份证、手机号码对应的是否为同一个人的信息”则是因为手机号的注册信息不是本人的身份证信息，需要联系手机号运营商进行注册信息的更改或者更换手机号注册，同时新注册的手机号或者刚更改完注册信息的手机号需要7个工作日左右的时间生效，请耐心等待7个工作日再来进行实名认证哦~",
              },
            },
          ],
          document: null,
        },
        {
          title: "漏洞的收录范围及提交规范",
          children: [
            {
              title: "1.补天收录范围",
              children: [],
              document: {
                id: 4,
                title: "漏洞的收录范围及提交规范",
                subTitle: "1.补天收录范围",
                content:
                  '<p>\t补天收录<strong>专属SRC以及公益SRC、未注册厂商</strong>的漏洞，未注册厂商要求web权重≥1，<strong>可在爱站网进行查询，看百度或移动大于等于1或者谷歌大于等于3。</strong></p><p>\t权重为0的漏洞仅在活动期间收取，活动信息请关注【补天平台】公众号，或者在【活动中心】进行查看。</p><p class="ql-align-center"><img src="https://www.butian.net/Public/images/newneed/d1.png"></p><p><br></p>',
              },
            },
            {
              title: "2.白帽子可提交的漏洞类型",
              children: [],
              document: {
                id: 5,
                title: "漏洞的收录范围及提交规范",
                subTitle: "2.白帽子可提交的漏洞类型",
                content:
                  '<p>\t具体漏洞收录细则：<a href="https://www.butian.net/Help/plan" rel="noopener noreferrer" target="_blank" style="color: rgb(82, 122, 247);">https://butian.net/Help/plan</a></p><p>\t通用漏洞：第三方软件，应用，系统对应的漏洞。如ECShop、Discuz、PHPCMS的SQL注入，XSS漏洞。开源软件，安全浏览器，手机应用，路由器，开发框架，甚至是某VPN系统某防火墙系统的漏洞。</p><p>\t事件漏洞：即非通用型漏洞，主要是指互联网上应用的一个具体漏洞，xx网站命令执行可被渗透，xx电商订单泄漏任意充值，xx网站应用SQL注入可导致信息泄露等等。</p>',
              },
            },
          ],
          document: null,
        },
        {
          title: "漏洞认领",
          children: [
            {
              title: "1.企业如何认领漏洞？",
              children: [],
              document: {
                id: 11,
                title: "漏洞认领",
                subTitle: "1.企业如何认领漏洞？",
                content:
                  '<p>\t未注册企业认领漏洞需要注册成为补天”公益SRC”用户，即可在企业操作后台查看并处置漏洞。</p><p>\t企业认领漏洞操作流程：</p><p>\t\t1) 使用企业邮箱注册账号（无企业邮箱请使用常用邮箱）</p><p>\t\t2) 填写企业详细信息</p><p>\t\t3) 进行身份验证（域名验证或上传企业授权函进行验证，管理员3-7天审核完成）</p><p>\t\t4) 登录企业账号</p><p>\t\t5) 在企业操作后台查看漏洞</p><p>\t\t6) 点击确认漏洞并查看漏洞细节</p><p class="ql-align-center">\t<img src="https://www.butian.net/Public/images/t01a24bbd3ed1429d57.png"></p><p class="ql-align-center"><img src="https://www.butian.net/Public/images/t010d6023419a547ad4.png"></p><p>\t</p><p>\t&nbsp;</p>',
              },
            },
            {
              title: "2.企业如何实时获取漏洞通知？",
              children: [],
              document: {
                id: 12,
                title: "漏洞认领",
                subTitle: "2.企业如何实时获取漏洞通知？",
                content:
                  '<p>\t<strong>用户通知：</strong>补天如收到企业漏洞，将会通过邮件、站内信等形式发送告警信息通知企业，用户可在“企业设置——通知管理“模块下添加通知邮箱，公益用户可以添加3个通知邮箱，未设置通知邮箱的用户将默认发送企业联系邮箱。</p><p>\t专属SRC用户可以通过邮件、短信、站内信等形式获取漏洞告警信息，专属用户可设置10个通知邮箱、10个通知短信。</p><p class="ql-align-center"><img src="https://www.butian.net/Public/images/t01b9a84a5e5253e871.jpg"></p><p>\t</p><p>\t&nbsp;</p>',
              },
            },
          ],
          document: null,
        },
        {
          title: "联系我们",
          children: [
            {
              title: "平台联系方式",
              children: [],
              document: {
                id: 6,
                title: "联系我们",
                subTitle: "平台联系方式",
                content:
                  '<p>\t补天白帽咨询电话：010-56509093</p><p>\t补天企业咨询电话：010-56509036</p><p>\t补天反馈邮箱：<a href="https://www.butian.net/newneed###" rel="noopener noreferrer" target="_blank" style="color: rgb(82, 122, 247);"><img src="https://www.butian.net/Public/images/t013f308a3b4c099c67.png"></a></p><p>\t补天官方QQ群: 补天5群：777567082</p><p>\t众测运营：荷兰豆；QQ：2656450853</p><p>\t白帽运营：补天线上活动、日常答疑，柠檬、维维豆奶；QQ：1695776365 ；</p><p>\t线下活动，罗宾；QQ：2287141655。</p><p><strong>官方公众号</strong></p><p>\t【补天漏洞响应平台】：获取漏洞状态提醒</p><p>\t<img src="https://www.butian.net/Public/images/wx1.jpg"></p><p>\t【补天平台】：获取活动通知</p><p>\t<img src="https://www.butian.net/Public/images/wx2.png"></p>',
              },
            },
          ],
          document: null,
        },
        {
          title: "漏洞认领、企业注册问题答疑",
          children: [
            {
              title: "1.已经注册了但仍旧无法认领漏洞怎么办？",
              children: [],
              document: {
                id: 13,
                title: "漏洞认领、企业注册问题答疑",
                subTitle: "1.已经注册了但仍旧无法认领漏洞怎么办？",
                content:
                  '<p>\t<strong>添加别名：</strong>请核查您的注册名称是否和漏洞所属企业名称不一致，您可在别名管理模块下添加别名，您可添加”企业别名、产品名、网站名、简称等“作为您的别名，以便您全面收集补天上的漏洞。</p><p class="ql-align-center"><img src="https://www.butian.net/Public/images/t019eba34b6470570cf.png"></p><p>\t举例说明：</p><p>\t1) 如企业注册名称为“补天漏洞响应平台”，漏洞归属企业名称为“补天平台”， “补天平台”为“补天漏洞响应平台”简称，则需要添加别名“补天平台”，方可认领补天平台名下的历史漏洞；</p><p>\t2) 如企业注册名称为“补天漏洞响应平台”，漏洞归属单位为“补天众测”，&nbsp;“补天众测”为“补天漏洞响应平台”产品，则需要添加别名“补天众测”，方可认领补天众测名下的历史漏洞；</p>',
              },
            },
          ],
          document: null,
        },
      ],
      btnIsShow: false,
      pageInfoName: "Document_Catalogue",
      pageInfoDesc:
        "参考奇安信补天漏洞响应平台的文档阅读页面，实现目录、文档、导航等类似功能，优化了原平台的几个bug，所有效果均为手写，详情请查看源码",
    };
  },
  methods: {
    initLeftPosition() {
      // 初始化左侧导航的位置
      let left = this.$refs.scroll_doc.offsetLeft;
      // let top = this.$refs.scroll_doc.offsetTop;
      // this.$refs.left.style.top = `${top}px`;
      this.$refs.left.style.left = `${left}px`;
    },
    onScroll() {
      // 设置左侧导航的位置
      const top = window.scrollY;
      const left = window.scrollX;
      const lh = this.$refs.left.offsetHeight;
      const rh = this.$refs.right.offsetHeight;
      const dh = lh / rh;

      // 控制右下回到顶部按钮的显隐
      this.btnIsShow = top > 0;

      // 设置左侧导航栏位置，包括横向滚动的时候
      // let left_top = this.$refs.left.getBoundingClientRect().top;
      // let left_height = this.$refs.left.getBoundingClientRect().height;
      // let left_bottom = this.$refs.left.getBoundingClientRect().bottom;
      // let page_bottom = this.$refs.scroll_doc.getBoundingClientRect().bottom;
      // let viewportHeight = document.documentElement.clientHeight;
      // if (viewportHeight - left_bottom < 20) {
      this.$refs.left.style.top = `${-top * dh + 20}px`;
      // }
      //  else if (page_bottom - left_bottom < 0) {
      //   this.$refs.left.style.top = `${page_bottom - left_height}px`;
      // }
      // if (left_top < 0 && left_bottom > viewportHeight) {
      //   let top =
      //     page_bottom - left_height > 0 ? 0 : page_bottom - left_height;
      //   this.$refs.left.style.top = `${top}px`;
      // }
      // else if (
      //   viewportHeight - left_bottom > 20 &&
      //   page_bottom - left_bottom > 0
      // ) {
      //   this.$refs.left.style.top = `${page_bottom - left_height}px`;
      // }

      // if () {

      // }

      // if (page_bottom - left_bottom < 0) {
      //   this.$refs.left.style.top = `${page_bottom - left_height}px`;
      // }
      // else if (left_top < 0) {
      //   this.$refs.left.style.top = `${page_bottom - left_height}px`;
      // }

      if (left > 0) {
        this.$refs.left.style.left = `${-left}px`;
      }
      // 滚动时右侧内容对应左侧导航
      let doc_self = document.querySelectorAll(".doc_self");
      let list_subTitle = document.querySelectorAll(".list_subTitle");
      list_subTitle.forEach((e) => {
        e.classList.remove("cur");
      });
      for (let i = 0; i < doc_self.length; i++) {
        let rect1 = doc_self[i].getBoundingClientRect();
        let rect2 = doc_self[i + 1]?.getBoundingClientRect();
        if (rect1.top < 180 && rect1.bottom > 180) {
          list_subTitle[i].classList.add("cur");
        } else if (rect1.bottom < 180 && rect2.top > 180) {
          list_subTitle[i + 1].classList.add("cur");
        }
      }
    },
    // 点击导航跳转
    handleSubTitleClick(id) {
      let target = document.getElementById(id);
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    },
    //回到顶部
    returnToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initLeftPosition();
      this.onScroll();
    });
    window.addEventListener("resize", this.initLeftPosition);
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.initLeftPosition);
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>

<style scoped>
.scroll_doc {
  width: 1200px;
  margin: 20px auto;
  height: fit-content;
  min-height: 300px;
  /* position: relative; */
}
.left {
  width: 300px;
  height: fit-content;
  border: 1px solid #ededed;
  background: #f7f9fa;
  padding: 10px 0;
  box-sizing: border-box;
  position: fixed;
}
.right {
  margin-left: 320px;
  width: 880px;
  border: 1px solid #ededed;
  box-sizing: border-box;
  background: #fff;
  min-height: 754px;
}

.doc_title {
  border-bottom: 1px solid #ededed;
  padding: 0;
  overflow: hidden;
  height: 50px;
  line-height: 50px;
  margin: 20px 15px 10px;
}
.doc_title > span {
  font-weight: bold;
  border-left: 3px solid #527af7;
  padding-left: 10px;
  font-size: 16px;
}
.doc_subTitle {
  line-height: 40px;
  padding: 0 30px;
  font-size: 16px;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
  font-weight: bold;
  color: #606060;
  margin: 20px 0 5px 0;
}
.doc_content {
  line-height: 30px;
  padding: 0 30px;
  box-sizing: border-box;
  font-size: 16px;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
  text-indent: 2em;
  color: #606060;
}

::v-deep .ql-align-center {
  text-indent: 0;
}
::v-deep .doc_content img {
  max-width: 100%;
}

dt,
dd {
  width: 100%;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
}

/* dt:hover, */
dd:hover,
dd.cur {
  background: #deeefb;
}
dt {
  font-weight: 600;
  padding-left: 10px;
  cursor: unset;
}

dd {
  font-size: 16px;
  padding-left: 20px;
  cursor: pointer;
  margin-inline-start: 0;
}
.return_to_top_btn {
  position: fixed;
  right: 50px;
  bottom: 60px;
}
.page_info {
  display: flex;
  flex-direction: column;
}
.page_info_icon {
  cursor: pointer;
  position: fixed;
  right: 50px;
  bottom: 110px;
  color: #409eff;
  font-size: 40px;
}
</style>