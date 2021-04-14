<template>
    <div class="broadcast" >
            <img :src="pageJson.carouselIcon"
            class="img"
            mode="widthFix" />
        <swiper v-if="showBroadcast" :options="swiperOptions" observeParents="true" observer="true" @change="onSwiperChange" :disable-touch="true" :circular="true" class="swiper" :autoplay="autoplay" :interval="interval" :duration="duration" :vertical="true">
            <swiper-item v-for="(item,index) in carousel" :key="index">
                <view class="swiper-item">
                    <div id="container" class="broadcast-text" @click="broadcastLink(index)" v-if="current === index">
                        <p id="innerText" :style="animation">{{item.text}}</p>
                    </div>
                </view>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
export default {
    props: {
        // showBroadcast: {
        //     type: Boolean,
        //     default () {
        //         return true
        //     }
        // }
    },
    data () {
        return {
            swiperOptions: {
                pagination: '.swiper-pagination',
                paginationType: 'fraction',
                observeParents: true,
                observer: true
            },
            carouselFrontText: '',
            carouselNextText: '',
            carouselCurrentText: '',
            showBroadcast: false, // 默认隐藏，优化体验；
            autoplay: true,
            interval: 4500, // 这个时间要考虑跑马灯时间相同
            duration: 200,
            current: 0, // 当前跑马灯显示的序号
            rate: 40, // 跑马灯速度系数，与速度正相关
            animationDuration: '',
            msgWidth: 0,
            contaninerWidth: 0,
            animationOpen: false,
            isShortMsg: true // 短广播
        }
    },
    watch: {},
    mounted () {
        this.showBroadcast = true
    },
    computed: {
        pageJson () {
            return this.pageData && this.pageData.homePage || {}
        },
        carousel () {
            return this.pageJson.carousel
        },
        animation () {
            if (this.isShortMsg) {
                return {
                    left: 0
                }
            }
            if (!this.animationOpen) {
                return {}
            }
            return {
                // animationDuration: this.animationDuration,z
                // animationDelay: '.5s',
                left: '100%',
                transition: `all ${this.animationDuration} linear 1s`,
                transform: `translateX(-${this.msgWidth + this.contaninerWidth + 50}px)`
            }
        }
    },
    methods: {
        /** 获取当前跑马灯内容元素并设置相关参数 */
        getElement () {
            /** 获取前清除动画参数 */
            this.animationOpen = false
            const handleInnerText = () => {
                const query = uni.createSelectorQuery()
                query.select(`#innerText`).boundingClientRect(data => {
                    if (!data) return
                    const msgWidth = data.width
                    if (msgWidth <= this.contaninerWidth) {
                        this.isShortMsg = true
                    } else {
                        this.isShortMsg = false
                    }
                    this.msgWidth = msgWidth
                    this.animationDuration = msgWidth / this.rate + 's'
                    this.interval = this.isShortMsg ? 4000 : msgWidth / this.rate * 800 + 500
                    setTimeout(() => {
                        this.animationOpen = true
                    }, 500)
                }).exec()
            }
            setTimeout(() => {
                if (!this.contaninerWidth) {
                    const query0 = uni.createSelectorQuery()
                    query0.select(`#container`).boundingClientRect(data => {
                        if (!data) return
                        this.contaninerWidth = data.width
                        handleInnerText()
                    }).exec()
                } else {
                    handleInnerText()
                }
            }, 60)
        },
        /** 轮播切换回调 */
        onSwiperChange (e) {
            this.current = e.detail.current
            this.getElement()
        },
        // 跳转到广播链接
        broadcastLink (i) {
            this.jumpApp(this.carousel[i].link)
            // window.location.href = this.carousel[i].link
        },
    },
    created () {}
}
</script>

<style lang="less">
	// 广播
	.broadcast {
		position: relative;
		box-sizing: border-box;
		padding: 0 4upx 0 10upx;
		margin: 0 auto;
		width: 750upx;
		height: 50upx;
background: #E5EEFF;
		line-height: 50upx;
		display: flex;
		justify-content: left;
        align-content: center;
        z-index: 0;
        margin: 20upx auto;
        margin-left: -30upx;
        .img{
            width: 29upx;
            height: 25upx;
            margin: 12upx 10upx;
        }
		.laba {
			width: 25upx;
			height: 21upx;
			background: url('https://gw.alipayobjects.com/os/q/cms/images/k1j2l3yx/6d6f40b4-13cd-4271-90cd-be0af47d8917_w25_h21.png')
				no-repeat;
			background-size: 100%;
			margin: 8upx 14upx 0 0;
			white-space: nowrap;
		}
		.swiper {
            width: 100%;
			height: 50upx;
		}
		.swiper-item {
            width: 100%;
            height: 50upx;
            box-sizing: border-box;
            display: flex;
		}
		.broadcast-text {
            flex: 1;
			margin-right: 36upx;
			overflow: hidden;
			line-height: 50upx;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
            color: #333333;
			white-space: nowrap;
            position: relative;
            #innerText {
                display: inline-block;
            }
			.text-inner {
				box-sizing: border-box;
				position: absolute;
				left: 100%;
			}
		}
		.yellow-text {
			font-size: 24upx;
			color: rgba(255, 233, 82, 1);
			white-space: nowrap;
		}
		.close-icon {
			width: 31upx;
			height: 31upx;
			background: url('https://gw.alipayobjects.com/os/q/cms/images/k1j2mext/7cb55f18-9015-4fd3-970a-e766b00ef72d_w31_h31.png')
				no-repeat;
			background-size: 100%;
			position: absolute;
			right: 4upx;
			top: 3upx;
		}
	}
</style>
