<template>
  <div class="gj-vedio"
       ref="wrapper">
    <video
           class="top-vedio"
           ref="vedio"
           :controls="controls"
           :autoplay="autoplay"
           controlsList="nodownload"
           poster="@/assets/common/vedio_mask.png"
           x5-playsinline="true"
           playsinline="true"
           webkit-playsinline="true">
      <source :src="url">
      您的浏览器不支持 video 标签
    </video>
    <div class="vedio-mask"
         @touchstart="onTouchVedioMask"
         v-if="!controls">
    <img class="cover" v-if="cover&&playStatus==='0'&&time<=0" :src="$config.MIDDLE_STATIC_PREFIX+cover" alt="" />
         <!-- <template v-if="isShowHandle">
          <img class="play-btn-middle"
              :src="playBtnImg[playStatus]"
              @click.stop="switchState">
         </template> -->
        <div class="middle flex-1">
          <py-progress v-model="time"
                        :maxTime="maxTime"
                        @onTouchEnd="onTouchEnd"
                        @onTouchStart="onTouchStart" />
        </div>
        <div class="handle-bar flex_cb">
          <div class="flex_h">
            <img class="play-btn"
              :src="playBtnImg[playStatus]"
              @click.stop="switchState">
            <span>{{time | playtime}} / </span>
            <span>{{maxTime | playtime}}</span>
          </div>
          <div class="flex_h">
            <a class="double-btn"
              href="javascript:void(0)"
              @click="double">
              {{playbackRate || '倍速'}}
            </a>
            <a class="btn"
              href="javascript:void(0)"
              @click="fullScreen">
              <img src="@/assets/common/icon_fullscreen.png">
            </a>
          </div>
        </div>
    </div>
    <c-select :list="playRateArr.map(i => i.text)" v-model="playbackRateIndex" :isShowCSelect.sync="isShowCSelect" />
  </div>
</template>

<script>
import { playRateArr } from '@/dict'
import cSelect from '@/components/common/cSelect'
import progress from '../progress'
const OVER_TIME = 5000
export default {
  name: 'gjVideo',
  components: {
    cSelect,
    'py-progress': progress
  },
  props: {
    cover: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      playRateArr,
      playbackRateIndex: 1,
      time: 0,
      maxTime: 0,
      playStatus: '0',
      isShowHandle: true,
      drawFlag: false,
      playBtnImg: {
        '0': require('@/assets/common/icon_play.png'),
        '1': require('@/assets/common/icon_pause.png')
      },
      timeOut: null,
      isError: false,
      isShowCSelect: false,
      isLoadFinish: false
    }
  },
  computed: {
    playbackRate () {
      return this.playRateArr[this.playbackRateIndex].text
    }
  },
  async mounted () {
    if (this.isWx && this.$native.isiOS) {
      if (typeof window.WeixinJSBridge !== 'undefined') {
        window.WeixinJSBridge.invoke('getNetworkType', {}, (e) => {
          this.init()
        })
      }
    } else {
      this.init()
    }
  },
  methods: {
    double () {
      this.isShowCSelect = true
    },
    init () {
      this.$refs.vedio.width = this.$refs.wrapper.clientWidth
      this.$refs.vedio.height = this.$refs.wrapper.clientHeight
      if (this.isWx && this.$native.isiOS) {
        this.$refs.vedio.pause() // 为了兼容IOS微信环境可以加载出视频，要加这一句
      }
      if (this.controls) {
        return
      }
      // 超时算作视频加载失败
      let timeout = setTimeout(() => {
        this.$createToast({
          txt: '当前网络环境较差，视频加载失败，请晚些重新进入',
          type: 'txt'
        }).show()
        this.isError = true
      }, OVER_TIME)
      // 可以播放
      this.$refs.vedio.oncanplay = () => {
        // 是否自动播放
        if (this.autoplay) {
          this.$refs.vedio.play()
        }
      }
      // 监听时间轴变化
      this.$refs.vedio.ontimeupdate = () => {
        if (this.drawFlag) {
          return
        }
        this.time = this.$refs.vedio.currentTime
      }
      this.$refs.vedio.onloadedmetadata = () => {
        clearTimeout(timeout)
        this.isLoadFinish = true
        this.maxTime = this.$refs.vedio.duration
      }
      this.$refs.vedio.onpause = () => {
        this.playStatus = '0'
      }
      this.$refs.vedio.onplay = () => {
        this.playStatus = '1'
        this.timeOut = setTimeout(() => {
          this.isShowHandle = false
        }, 2000)
      }
    },
    onTouchVedioMask () {
      if (this.timeOut) {
        clearTimeout(this.timeOut)
      }
      // if (this.isShowHandle) {
      //   this.isShowHandle = false
      //   return
      // }
      this.isShowHandle = true
      this.timeOut = setTimeout(() => {
        this.isShowHandle = false
      }, 2000)
    },
    onTouchStart () {
      this.drawFlag = true
      if (this.timeOut) {
        clearTimeout(this.timeOut)
      }
    },
    onTouchEnd (time) {
      this.drawFlag = false
      this.$refs.vedio.currentTime = time
      this.isShowHandle = true
      this.timeOut = setTimeout(() => {
        this.isShowHandle = false
      }, 2000)
    },
    switchState () {
      if (this.isError || !this.isLoadFinish) {
        return
      }
      if (this.playStatus === '1') {
        if (this.timeOut) {
          clearTimeout(this.timeOut)
        }
        this.isShowHandle = true
      }
      if (this.playStatus === '0') {
        this.$emit('onPlay')
        this.timeOut = setTimeout(() => {
          this.isShowHandle = false
        }, 2000)
      }
      this.playStatus === '0' ? this.$refs.vedio.play() : this.$refs.vedio.pause()
    },
    requestFullscreen (vedio) {
      if (vedio.requestFullscreen) {
        vedio.requestFullscreen()
      } else if (vedio.mozRequestFullScreen) {
        vedio.mozRequestFullScreen()
      } else if (vedio.webkitRequestFullScreen) {
        vedio.webkitRequestFullScreen(vedio.ALLOW_KEYBOARD_INPUT)
      }
    },
    iosRequestFullscreen (vedio) {
      if (vedio.webkitEnterFullscreen || vedio.enterFullScreen) {
        vedio.webkitEnterFullscreen && vedio.webkitEnterFullscreen()
        vedio.enterFullScreen && vedio.enterFullScreen()
      }
    },
    fullScreen () {
      let vedio = this.$refs.vedio
      this.$native.isiOS ? this.iosRequestFullscreen(vedio) : this.requestFullscreen(vedio)
    }
  },
  watch: {
    playbackRateIndex () {
      this.$refs.vedio.playbackRate = this.playRateArr[this.playbackRateIndex].value
    }
  },
  filters: {
    playtime (value) {
      let min = parseInt(value / 60)
      let second = parseInt(value % 60)
      min = `${min}`.padStart(2, '0')
      second = `${second}`.padStart(2, '0')
      return `${min} : ${second}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./index.scss";
</style>
