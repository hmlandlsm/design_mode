
<template>
<!-- 第二版 -->
	<PageContainer
        :withLoading="false"
        :delay="200"
        :absTop="false"
  >
  <div class="home-page">
    <bg :bg="pageJson && pageJson.headBg" />
    <article class="page-head">
      <div class="search-btn">
        <img class="search-btn-icon"
             @click="toSearch"
             :src="pageJson && pageJson.searchIcon"
             mode="widthFix" />
             <p>查询</p>
      </div>
      <div class="income-row row">
        <div class="total-income flex-1">
          <div class="cross-center">
          <p class="key">我的总资产</p>
            <img class="open-eye"
            v-if="!eyeOpenState || !loginToken"
             @click="openEye"
             :src="pageJson.openEyeIcon"
             mode="widthFix" />
            <img class="close-eye"
            v-else
             @click="closeEye"
             :src="pageJson.closeEyeIcon"
             mode="widthFix" />
          </div>
          <p class="val" v-if="eyeOpenState && AccoQueryIndexPageReturn && isLogin">{{AccoQueryIndexPageReturn && AccoQueryIndexPageReturn.totalMarketValue | assets}}</p>
          <p class="val" v-else>{{resetData.totalMarketValue | assets}}</p>
        </div>
        <div class="yesterday-income flex-1">
          <p class="key">
            昨日收益 <span class="o-text ml-10" v-if="AccoQueryIndexPageReturn && AccoQueryIndexPageReturn.dayIncEnddate">{{(AccoQueryIndexPageReturn && AccoQueryIndexPageReturn.dayIncEnddate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$2-$3")) || ''}}</span>
          </p>
          <p class="val" v-if="eyeOpenState && AccoQueryIndexPageReturn && isLogin">{{AccoQueryIndexPageReturn && AccoQueryIndexPageReturn.totalDayInc | income}}</p>
          <p class="val" v-else>{{AccoQueryIndexPageReturn && AccoQueryIndexPageReturn.totalDayInc == '0' ? '0.00' : resetData.totalDayInc | income}}</p>
        </div>
      </div>
    </article>
    <div class="btn-bar row">
      <div class="flex-1 button dir-top cross-center"
              @click="goLink(pageJson.linkPartOne && pageJson.linkPartOne.link, pageJson.linkPartOne && pageJson.linkPartOne.text)"
              :style="{ color: pageJson.fhBtnColor }">
            <img class="btn-bar-icon"
             mode="widthFix"
             :src="pageJson.linkPartOne && pageJson.linkPartOne.icon"/>
        {{ pageJson.linkPartOne && pageJson.linkPartOne.text }}
      </div>
      <div class="flex-1 button dir-top cross-center"
              @click="goLink(pageJson.linkPartTwo && pageJson.linkPartTwo.link, pageJson.linkPartTwo && pageJson.linkPartTwo.text)">
            <img class="btn-bar-icon"
             mode="widthFix"
             :src="pageJson.linkPartTwo && pageJson.linkPartTwo.icon"/>
        {{ pageJson.linkPartTwo && pageJson.linkPartTwo.text }}
      </div>
      <div class="flex-1 button dir-top cross-center"
              @click="goLink(pageJson.linkPartThree && pageJson.linkPartThree.link, pageJson.linkPartThree && pageJson.linkPartThree.text)">
            <img class="btn-bar-icon"
             mode="widthFix"
             :src="pageJson.linkPartThree && pageJson.linkPartThree.icon"/>
        {{ pageJson.linkPartThree && pageJson.linkPartThree.text }}
      </div>
      <div class="flex-1 button dir-top cross-center"
              @click="goLink(pageJson.linkPartFour && pageJson.linkPartFour.link, pageJson.linkPartFour && pageJson.linkPartFour.icon)">
            <img class="btn-bar-icon"
             mode="widthFix"
             :src="pageJson.linkPartFour && pageJson.linkPartFour.icon"/>
        {{ pageJson.linkPartFour && pageJson.linkPartFour.text }}
      </div>
    </div>
    <Carousel ref="carousel"/>
    <scroll-view class="activity" scroll-x v-if="pageJson.scrollActivity && pageJson.scrollActivity.length > 1">
      <div class="item"
              v-for="(item,index) in pageJson.scrollActivity"
              :key="index"
              @click="goLink(item.link, `海景窗链接${index}跳转`)">
        <img :src="item.img"
        lazy-load="true"
        class="img"
             mode="widthFix" />
      </div>
    </scroll-view>
    <ul class="list" v-if="firstPageTabsFunds && firstPageTabsFunds.tabFunds && userMsg" @touchstart="touchstart" @touchend="touchend">
      <div class="tabs-title" v-if="showTabsFundModel">
        <div class="title">{{firstPageTabsFunds && firstPageTabsFunds.tabFundsTitle}}</div>
        <div class="line"></div>
        <div class="sub">{{firstPageTabsFunds && firstPageTabsFunds.tabFundsSubText}}</div>
      </div>
        <div class="risk-tip" v-if="!showAllFund && userMsg && userMsg.riskLevel < 5" :class="showTabsFundModel ? 'special' : ''">
        已根据您的风险承受能力筛选产品，点击
        <span @click="checkMore">查看更多</span>
      </div>
      <div class="funds-tabs" v-if="showTabsFundModel">
        <div class="tab-item" v-if="tabFunds" :class="tabsIndex === tabIndex ? 'active' : ''" v-for="(item, tabsIndex) in tabFunds" :key="tabsIndex" @click="changeTabIndex(tabsIndex)">
          <div v-if="item.fundCards && item.fundCards.length > 0">
              {{ item.title }}
            <div class="bottom-line" v-if="tabsIndex === tabIndex"></div>
          </div>
        </div>
      </div>
      <li class="item row"
            v-if="fundCards && fundCards.length > 0 && fundCards[0].fundName"
          @click="goFundDetailBase(item.fundCode)"
          v-for="(item, index) in fundCards" :key="index">
        <chart :fundCode="item.fundCode" :fundType="item.fundType" :rateDimension="item.rateDimension" />
        <div class="item-center">
          <div class="hold">
            <updown :value="item[item.rateDimension]" :unit="true">{{item[item.rateDimension]}}</updown>
          </div>
            <span class="text">{{TIME_REGION_LIST_CN[item.rateDimension]}}</span>
        </div>
        <div class="item-right flex-1">
          <div class="fund-name">{{item.fundName}}</div>
          <div class="fund-sub">{{item.fundSlogan}}</div>
        </div>
      </li>
    </ul>
      <div class="tabs-title" style="margin-top: 50upx;margin-bottom: 30upx">
        <div class="title">{{firstPagePoster && firstPagePoster.firstPagePosterTitle}}</div>
        <div class="line"></div>
        <div class="sub">{{firstPagePoster && firstPagePoster.firstPagePosterSubText}}</div>
      </div>
    <!-- <scroll-view class="poster-group" scroll-y>
      <div class="left-part flex-1" >
        <div class="item" v-for="(item, index) in (firstPagePoster && firstPagePoster.firstPagePosterList)" @click="goLink(item.link, `资讯跳转`)">
          <img :src="item.img"
            class="img"
            lazy-load="true"
            mode="widthFix"
            v-if="item && item.type == 'img'" />
            <div class="acticle-poster" v-if="item && item.type == 'acticle'">
            <img :src="item.img"
            class="acticle-img"
            lazy-load="true"
            mode="widthFix" />
            <div class="main-acticle">
                {{item && item.main}}
            </div>
            <div class="bottom-part">
            <div class="flex-center">
                <img :src="item.headerImg"
                class="header-img"
                lazy-load="true"
                mode="widthFix"/>
                <div class="name">
                    {{item && item.name}}
                </div>
            </div>
            <div class="date">
                {{item && item.date}}
            </div>
            </div>
            </div>
        </div>
      </div>
    </scroll-view> -->
    <!-- 瀑布流更换实现方式 -->
    <scroll-view class="water_fall" scroll-y @scroll="waterFallScroll">
        <div class="water_box" ref="scrollContainer">
            <div class="water_col mgr20">
                <div class="item"  ref="leftWaterItem" v-for="(item, index) in leftWaterList" @click="goLink(item.link, `资讯跳转`)">
                    <img :src="item.img"
                    @load="imgLoaded(0)"
                    class="img"
                    lazy-load="true"
                    mode="widthFix"
                    v-if="item && item.type == 'img'" />
                    <div class="acticle-poster" v-if="item && item.type == 'acticle'">
                        <img :src="item.img"
                        @load="imgLoaded(0)"
                        class="acticle-img"
                        lazy-load="true"
                        mode="widthFix" />
                        <div class="main-acticle">
                            {{item && item.main}}
                        </div>
                        <div class="bottom-part">
                        <div class="flex-center">
                            <img :src="item.headerImg"
                            class="header-img"
                            lazy-load="true"
                            mode="widthFix"/>
                            <div class="name">
                                {{item && item.name}}
                            </div>
                        </div>
                        <div class="date">
                            {{item && item.date}}
                        </div>
                        </div>
                    </div>
                    <div class="video-box" v-if="item && item.type == 'video' && !item.isScrolling">
                        <img :src="item.img"
                        @load="imgLoaded(0)"
                        class="video-img"
                        mode="widthFix"
                        lazy-load="true"
                        />
                    </div>
                    <!-- 唯一滚动的 -->
                    <div class="video-box" v-if="item && item.type == 'video' && item.isScrolling">
                        <img :src="item.img"
                        @load="imgLoaded(0)"
                        class="video-img"
                        mode="widthFix"
                        lazy-load="true"
                        ref="scrollItemImg"
                        :style="videoAnimation"
                        />
                    </div>
                </div>
            </div>
            <div class="water_col">
                <div class="item" ref="rightWaterItem" v-for="(item, index) in rightWaterList" @click="goLink(item.link, `资讯跳转`)">
                    <img :src="item.img"
                    @load="imgLoaded(1)"
                    class="img"
                    lazy-load="true"
                    mode="widthFix"
                    v-if="item && item.type == 'img'" />
                    <div class="acticle-poster" v-if="item && item.type == 'acticle'">
                        <img :src="item.img"
                        @load="imgLoaded(1)"
                        class="acticle-img"
                        lazy-load="true"
                        mode="widthFix" />
                        <div class="main-acticle">
                            {{item && item.main}}
                        </div>
                        <div class="bottom-part">
                        <div class="flex-center">
                            <img :src="item.headerImg"
                            class="header-img"
                            lazy-load="true"
                            mode="widthFix"/>
                            <div class="name">
                                {{item && item.name}}
                            </div>
                        </div>
                        <div class="date">
                            {{item && item.date}}
                        </div>
                        </div>
                    </div>
                    <div class="video-box" v-if="item && item.type == 'video' && !item.isScrolling">
                        <img :src="item.img"
                        @load="imgLoaded(1)"
                        class="video-img"
                        mode="widthFix"
                        lazy-load="true"
                        />
                    </div>
                    <!-- 唯一滚动的 -->
                    <div class="video-box" v-if="item && item.type == 'video' && item.isScrolling">
                        <img :src="item.img"
                        @load="imgLoaded(0)"
                        class="video-img"
                        mode="widthFix"
                        lazy-load="true"
                        ref="scrollItemImg"
                        :style="videoAnimation"
                        />
                    </div>
                </div>
            </div>
        </div>
    </scroll-view>
    <!-- <left-tab @quit="reset"/> -->
    <bottom-tab :active="'Home'"/>
  </div>
  <!-- 弹窗组件 -->
  <template slot="dialog" >
      <Toast/>
      <Confirm/>
  </template>
	</PageContainer>
</template>

<script>
import Bg from '../../../components/accountComponents/bg'
import Card from '../../../components/accountComponents/card'
import Updown from '../../../components/accountComponents/updown'
import userMixin from '@/mixins/userMixin'
// import LeftTab from '../../../components/leftTab'
import BottomTab from '../../../components/bottomTab'
import Carousel from './components/carousel'
import Chart from './components/Chart'
// 弹窗
import Toast from '@/d-dialogs/activity/Toast'
import { setTimeout } from 'timers'

const EXCLUDE_KEY = ['code', 'message']
// 时间区间
const TIME_REGION_LIST = [
    {
        name: '周涨跌',
        key: 'ONEWEEKRESMUD',
        show: true
    },
    {
        name: '月涨跌',
        key: 'ONEMONTHRESMUD',
        show: true
    },
    {
        name: '最近三月',
        key: 'THREEMONTHRESMUD',
        show: true
    },
    {
        name: '最近半年',
        key: 'SIXMONTHRESMUD',
        show: true
    },
    {
        name: '今年以来',
        key: 'FROMNOWYEARRESMUD',
        show: true
    },
    {
        name: '近一年',
        key: 'ONEYEARRESMUD',
        show: true
    },
    {
        name: '近两年',
        key: 'TWOYEARRESMUD',
        show: true
    },
    {
        name: '近三年',
        key: 'THREEYEARRESMUD',
        show: true
    },
    {
        name: '成立以来',
        key: 'ETIMERESMUD',
        show: true
    }
]

export default {
    name: 'Home',
    components: {
        Bg,
        Card,
        Updown,
        // LeftTab,
        BottomTab,
        Carousel,
        Chart,

        Toast
    },
    mixins: [userMixin],
    data () {
        return {
            touchPlaceX: 0, // 基金列表滑动偏移值
            showAllFund: false,
            TIME_REGION_LIST_CN: {
                ONEWEEKRESMUD: '周涨跌',
                ONEMONTHRESMUD: '月涨跌',
                THREEMONTHRESMUD: '最近三月',
                SIXMONTHRESMUD: '最近半年',
                FROMNOWYEARRESMUD: '今年以来',
                ONEYEARRESMUD: '近一年涨跌幅',
                TWOYEARRESMUD: '近两年',
                THREEYEARRESMUD: '近三年',
                ETIMERESMUD: '成立以来'
            },
            riskLevelOption: {
                低风险: 1,
                中低风险: 2,
                中等风险: 3,
                中高风险: 4,
                高风险: 5
            },
            sortInfo: {
                key: 'NAV',
                type: 'desc'
            },
            // allFundList: []
            // isFollow: true
            leftWaterList: [],
            rightWaterList: [],
            waterPicCount: 0,
            leftWaterHeight: 0,
            rightWaterHeight: 0,
            curVideoImgDuration: 4,
            videoScrollX: 0,
            scrollItem: {}, // 需要滚动的元素
            scrollTop: 0,
            scrollTimeOut: null

        }
    },
    async created () {
        if (this.openInApp) {
            await this.getOrignData('loginToken')
            this.setStatusBar({
                textColor: this.pageData.homePage && this.pageData.homePage.flagTabTextBg,
                bgColor: this.pageData.homePage && this.pageData.homePage.flagTabBg,
                hasStatusBar: 1
            })
        }
        let data = await this.$marketApi.getFundList()
        data = this.formatFundList(data)
        this.$updateModel('allFundList', data)
        if (!this.loginToken || JSON.stringify(this.loginToken) == '{}') {
            this.reset()
            return false
        }
        if (this.loginToken && !this.signToken) {
            await this.doLogin(false)
            await this.getHomeData()
        } else {
            await this.getHomeData()
        }
        if (!this.signToken && !this.loginToken) {
            this.reset()
            return false
        }
        if (this.$getModel('firstRegister')) {
            this.openOneClickBuyTip()
        }
    },
    async onPullDownRefresh () {
        if (this.openInApp) {
            await this.getOrignData('loginToken')
        }
        if (!this.loginToken || JSON.stringify(this.loginToken) == '{}') {
            this.reset()
            uni.stopPullDownRefresh()
            return false
        }
        if (this.loginToken && !this.signToken) {
            await this.doLogin(false)
            await this.getHomeData()
            uni.stopPullDownRefresh()
        } else {
            await this.getHomeData()
            uni.stopPullDownRefresh()
        }
        uni.stopPullDownRefresh()
    },
    onShow () {
        if (this.$refs.carousel && this.$refs.carousel.onSwiperChange) {
        // 重新轮播
            this.$refs.carousel.onSwiperChange({
                detail: {
                    current: 0
                }
            })
        }
    },
    methods: {
        // 记录偏移值
        touchstart (e) {
            // console.log('touchstart', e)
            this.touchPlaceX = e.changedTouches[0].pageX
        },
        // 同步tab
        touchend (e) {
            // console.log('touchend', e.changedTouches[0].pageX - this.touchPlaceX > 50, this.touchPlaceX - e.changedTouches[0].pageX, this.tabIndex, this.tabFunds)
            if (e.changedTouches[0].pageX - this.touchPlaceX > 50) {
                this.tabIndex = this.tabIndex + 1 < this.tabFunds.length ? this.tabIndex + 1 : this.tabIndex
            }
            if (this.touchPlaceX - e.changedTouches[0].pageX > 50) {
                this.tabIndex = this.tabIndex - 1 >= 0 ? this.tabIndex - 1 : this.tabIndex
            }
        },
        // 开户后提醒打开一键购
        openOneClickBuyTip () {
            this.$dialog.open('Confirm', {
                text: this.$getModel('getTradeJsonReturn').tradePage && this.$getModel('getTradeJsonReturn').tradePage.trade_home_toOpenOneClickBuy,
                confirmBtn: '立即开启',
                cancelBtn: '以后再说',
                confirmFn: () => {
                    uni.navigateTo({
                        url: '../tradeHabit/index'
                    })
                    this.$dialog.close('Confirm')
                },
                cancelFn: () => {
                    this.$dialog.close('Confirm')
                }
            })
        },
        // 查看更多
        checkMore () {
            this.zhuge.track('点击首页查看更多基金（销售适当性）', {
                使用环境: this.openInApp ? 'APP' : 'H5',
                身份证号: this.userMsg.identifyNo,
                用户名: this.userMsg.customerName
            })
            this.dealCheckMore().then((res) => {
                if (this.userMsg && this.userMsg.riskLevel < 5) {
                    this.$dialog.open('Confirm', {
                        text: (res.data && res.data.body && res.data.body.content) || '基金投资可能造成本金亏损，也可能直接导致超过原始本金损失，请谨慎考虑。建议您购买与您风险等级承受能力匹配的产品。',
                        confirmBtn: '确认',
                        cancelBtn: '取消',
                        confirmFn: () => {
                            this.showAllFund = true
                            this.$dialog.close('Confirm')
                        },
                        cancelFn: () => {
                            this.$dialog.close('Confirm')
                        }
                    })
                }
            })
        },
        getHomeData () {
            // 获取用户信息
            this.$triggerEvent('getHomePageData', {
                signToken: this.signToken
            }).then(async (res) => {
                const flag = await this.dealRes(res, this.getHomeData)
                if (!flag) {
                    return false
                }
                if (this.userMsg) {
                    this.zhuge.identify(this.userMsg.handset, {
                        性别: this.userMsg && this.userMsg.sex > 0 ? '男' : '女',
                        身份证号: this.userMsg.identifyNo,
                        用户名: this.userMsg.customerName,
                        邮箱: this.userMsg && this.userMsg.email,
                        风险承受等级: this.userMsg && this.userMsg.riskLevelStr
                    })
                }
            })
        },
        changeTabIndex (index) {
            this.tabIndex = index
        },
        // filtrRawInfo (item) {
        //     // let returnData = null
        //     // returnData = item.rawInfo.filter((info) => {
        //     //     return String(info.key) == String(item.rateDimension)
        //     // })
        //     // return returnData[0]
        //     return {}
        // },

        openEye () {
            if (this.signToken) {
                // window.location.href = 'http://192.168.0.4:8080/#/'
                this.$updateModel('eyeOpenState', true)
            } else {
                uni.showToast({
                    icon: 'none',
                    title: '请先进行登录！'
                })
                setTimeout(() => {
                    uni.navigateTo({
                        url: '../../login/login/index'
                    })
                }, 2000)
            }
            // this.totalMarketValue = this.AccoQueryIndexPageReturn.totalMarketValue
            // this.totalDayInc = this.AccoQueryIndexPageReturn.totalDayInc
        },
        closeEye () {
            if (this.signToken) {
                this.$updateModel('eyeOpenState', false)
            } else {
                uni.showToast({
                    icon: 'none',
                    title: '请先进行登录！'
                })
                setTimeout(() => {
                    uni.navigateTo({
                        url: '../../login/login/index'
                    })
                }, 2000)
            }
        },
        getPageData () {
            // if (!(this.userMsg && this.userMsg.identifyNo)) {
            // }
            // 获取用户信息
            this.$triggerEvent('AccoQueryIndexPage', {
                signToken: this.signToken,
                idno: this.userMsg && this.userMsg.identifyNo,
                idtype: '0'
            }).then(async (res) => {
                const flag = await this.dealRes(res, this.getPageData)
                if (!flag) {
                    return false
                }
                if (res.data && res.data.body) {
                    console.log('res.data.body', res.data.body)
                    Object.keys(res.data.body)
                        .filter(key => !EXCLUDE_KEY.includes(key))
                        .forEach(key => {
                            this[key] = res.data.body[key] || ''
                        })
                }
            })
            // await this.$api
            //     .AccoQueryIndexPage({
            //         signToken: this.signToken,
            //         idno: this.userMsg && this.userMsg.identifyNo,
            //         idtype: '0'
            //     })
            //     .sub(({ data }) => {
            //         const flag = this.accountDealRes(data, this.getPageData)
            //         if (!flag) {
            //             return
            //         }
            //         if (data.body) {
            //             Object.keys(data.body)
            //                 .filter(key => !EXCLUDE_KEY.includes(key))
            //                 .forEach(key => {
            //                     this[key] = data.body[key] || ''
            //                 })
            //         }
            //         this.$ui.hideLoading()
            //     })
            //     // .catch(err => {
            //     //     this.$Ui.errMsg(err)
            //     //     this.$Ui.hideLoading()
            //     // })
        },
        toSearch () {
            this.zhuge.track('首页打开搜索', {
                使用环境: this.openInApp ? 'APP' : 'H5',
                身份证号: this.userMsg.identifyNo,
                用户名: this.userMsg.customerName
            })
            uni.navigateTo({
                url: '../../market/fundList/index'
            })
            this.$updateModel('openSearch', true)
            // this.$emit('openSearch')
        },
        reset () {
            this.$store.dispatch('setUserInfo', {
                token: '',
                idno: '',
                idtype: '0',
                state: 'NO_LOGIN'
            })
            this.$store.dispatch('setHomeState', {
                loadData: false
            })
            const resetData = {
                fundDayInc: '****',
                fundTotalInc: '****',
                marketValue: '****',
                totalIncEnddate: '--',
                dayIncEnddate: '',
                superMoneyDayInc: '****',
                superMoneySum: '****',
                superMoneyTotalInc: '****',
                totalDayInc: '****',
                totalInc: '****',
                totalMarketValue: '****',
                unConfirmShare: 0,
                unConfirmSum: 0,
                // isFollow: true,
                followMsg: '',
                test: '2'
            }
            Object.keys(resetData).forEach(d => {
                this[d] = resetData[d]
            })
        },
        // 图片加载，一个一个push进去
        imgLoaded (type) {
            // 弹性布局左右两边盒子高度会一直被撑开为一致的，所以需要动态计算左右盒子实际高度
            var leftIdx = this.leftWaterList.length - 1
            var rightIdx = this.rightWaterList.length - 1
            if (type) {
                this.rightWaterHeight += this.$refs.rightWaterItem[rightIdx].clientHeight
            } else {
                this.leftWaterHeight += this.$refs.leftWaterItem[leftIdx].clientHeight
            }
            this.waterPicCount++
            // 加载结束
            if ((this.leftWaterList.length + this.rightWaterList.length) === this.firstPagePoster.firstPagePosterList.length) {
                this.picScroll()
                return
            }
            // 组装左右两列数组
            if (this.leftWaterHeight < this.rightWaterHeight) {
                this.leftWaterList.push(this.firstPagePoster.firstPagePosterList[this.waterPicCount])
            } else {
                this.rightWaterList.push(this.firstPagePoster.firstPagePosterList[this.waterPicCount])
            }
        },
        // 监听滚动
        waterFallScroll (e) {
            this.scrollTop = e.detail.scrollTop
        },
        picScroll () {
            this.videoScrollX = 0
            this.curVideoImgDuration = 0
            setTimeout(() => {
                console.log('重新赋值跑')
                const el = this.$refs.scrollItemImg[0]
                this.videoScrollX = el.clientWidth - this.$refs.leftWaterItem[0].clientWidth - 10
                this.curVideoImgDuration = 4
            }, 400)
        }
    },
    computed: {
        eyeOpenState () {
            return this.$getModel('eyeOpenState')
        },
        share () {
            return this.pageData.share
        },
        allFundList () {
            return this.$getModel('allFundList')
        },
        showTabsData () {
            return this.tabFunds[this.tabIndex]
        },
        tabFunds () {
            if (this.firstPageTabsFunds && this.firstPageTabsFunds.tabFunds && this.allFundList) {
                const returnData = JSON.parse(JSON.stringify(this.firstPageTabsFunds.tabFunds))
                if (returnData && returnData.length > 0) {
                    returnData.map((item) => {
                        let concatData = item.fundCards.map(info => {
                            const fundData = this.allFundList.find((fund) => {
                                return fund.fundCode == info.fundCode
                            })
                            const infoReturn = {
                                ...fundData,
                                ...info
                            }
                            return infoReturn
                        })
                        // 过滤风险不匹配项
                        if (concatData && concatData.length > 0 && this.userMsg && this.userMsg.riskLevel && !this.showAllFund) {
                            concatData = concatData.filter(
                                i => this.riskLevelOption[i.fundRisk] <= this.userMsg.riskLevel)
                        }
                        concatData = this.$utils.arrSort(concatData, this.sortInfo.key, this.sortInfo.type === 'desc')
                        item.fundCards = concatData
                        return item
                    })
                    return returnData
                }
            }
            return []
        },
        // 如果所有数据都过滤了就不展示模块了
        showTabsFundModel () {
            if (this.tabFunds && this.tabFunds.length > 0) {
                let flag = false
                this.tabFunds.map((item) => {
                    if (item.fundCards && item.fundCards.length > 0) {
                        flag = true
                    }
                })
                return flag
            }
            return false
        },
        fundCards () {
            if (this.showTabsData && this.allFundList) {
                let returnData = JSON.parse(JSON.stringify(this.showTabsData))
                // 从所有基金数据中合并数据
                returnData = returnData.fundCards.map((item) => {
                    const fundData = this.allFundList.find((fund) => {
                        return fund.fundCode == item.fundCode
                    })
                    item = {
                        ...item,
                        ...fundData
                    }
                    return item
                })
                // 过滤风险不匹配项
                if (returnData && returnData && this.userMsg && this.userMsg.riskLevel && !this.showAllFund) {
                    returnData = returnData.filter(
                        i => this.riskLevelOption[i.fundRisk] <= this.userMsg.riskLevel)
                }
                returnData = this.$utils.arrSort(returnData, this.sortInfo.key, this.sortInfo.type === 'desc')
                return returnData
            } else {
                return []
            }
        },
        isLogin () {
            if (this.test) {
                return this.$getModel('signToken') || this.loginToken
            }
            return this.$getModel('signToken') || this.loginToken
        },
        pageJson () {
            return (this.pageData && this.pageData.homePage) || {}
        },
        firstPageTabsFunds () {
            return this.$getModel('firstPageTabsFunds')
        },
        firstPagePoster () {
            return this.$getModel('firstPagePoster')
        },
        // 视频图片滑动样式
        videoAnimation () {
            return {
                left: '100%',
                transition: `all linear ${this.curVideoImgDuration}s 1s`,
                transform: `translateX(-${this.videoScrollX}px)`
            }
        }
    },
    watch: {
        // 监听滚动高度,防抖节流
        scrollTop (val, old) {
            console.log(val)
            if (this.scrollTimeOut) {
                clearTimeout(this.scrollTimeOut)
            }
            this.scrollTimeOut = setTimeout(() => {
                this.picScroll()
            }, 800)
        },
        firstPagePoster (val, oldList) {
            if (val && Array.isArray(val.firstPagePosterList)) {
                // 数据加载完毕，动态添加一个元素
                this.leftWaterList.push(val.firstPagePosterList[0])
                // 过滤获取第一个需要滑动的图片元素
                // this.scrollItem = val.firstPagePosterList.filter(item => {
                //     return item.type === 'video' && item.videoPlay
                // })[0]

                // 处理动画
                this.firstPagePoster.firstPagePosterList.forEach(item => {
                    if (item.type === 'video' && item.videoPlay) {
                        item.isScrolling = true
                        this.scrollItem = item
                    }
                })
                console.log(this.firstPagePoster.firstPagePosterList)
            }
        },
        isLogin (val, oldval) {
            if (!val && oldval) {
                this.reset()
            }
        },
        // 监听路由变化
        $route (to, from) {
            if (from.meta.name !== to.meta.name && this.openInApp) {
                if (to.meta.name != 'pages-home-home-index' && to.meta.name != 'pages-account-assets-index' && to.meta.name != 'pages-login-login-index' && to.meta.name != 'pages-login-login_account-index' && this.nowHeaderBg != 'ffffff') {
                    this.$updateModel('nowHeaderBg', 'ffffff')
                    this.setStatusBar(
                        {
                            bgColor: 'ffffff',
                            hasStatusBar: '1',
                            textColor: '0'
                        }
                    )
                }
                if (to.meta.name == 'pages-account-assets-index') {
                    this.setStatusBar({
                        textColor: this.getAccountJsonReturn.assetsPage.flagTabTextBg,
                        bgColor: this.getAccountJsonReturn.assetsPage.flagTabBg,
                        hasStatusBar: 1
                    })
                }
                if (to.meta.name == 'pages-home-home-index') {
                    this.setStatusBar({
                        textColor: this.pageData.homePage && this.pageData.homePage.flagTabTextBg,
                        bgColor: this.pageData.homePage && this.pageData.homePage.flagTabBg,
                        hasStatusBar: 1
                    })
                }
            }
        }
    },
    onShareAppMessage () {
        return {
            path: this.share.path,
            title: this.share.shareTitle,
            imageUrl: this.share.shareImg
        }
    }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
