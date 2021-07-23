<template>
  <div class="progress"
       ref="progress"
       @touchstart="touchstart"
       @touchmove="touchmove"
       @touchend="touchend">
    <div class="circle"
         :style="{ 'transform': 'translate3d(-50%, 0, 0)', 'left': leftMove }"></div>
    <div class="bar"
         :style="{ 'width': leftMove }"></div>
  </div>
</template>

<script>

export default {
  name: 'DfhProgress',
  model: {
    prop: 'time',
    event: 'change'
  },
  props: {
    time: {
      type: Number,
      default: 0
    },
    maxTime: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      startX: null,
      endX: null,
      clientWidth: null,
      leftMove: '0%',
      componentTime: this.time,
      x: 0
    }
  },
  mounted () {
    this.clientWidth = this.$el.clientWidth
    this.startX = this.$refs.progress.offsetLeft
    this.endX = this.startX + this.clientWidth
  },
  methods: {
    touchstart (e) {
      this.$emit('onTouchStart')
      e.preventDefault()
    },
    touchmove (e) {
      let x = e.changedTouches[0].clientX || e.changedTouches[0].pageX
      if (!x) {
        console.warn('can not get the x  please check the device support property')
      }
      this.update(x)
      e.preventDefault()
    },
    touchend (e) {
      this.$emit('onTouchEnd', this.componentTime)
      e.preventDefault()
    },
    update (x) {
      if (x <= this.startX) {
        this.$emit('change', 0)
        return
      }
      if (x >= this.endX) {
        this.$emit('change', this.maxTime)
        return
      }
      let precent = ((x - this.startX) / this.clientWidth * 100).toFixed(2)
      this.leftMove = `${precent}%`
      this.componentTime = this.maxTime * parseFloat(precent / 100)
      this.$emit('change', this.componentTime)
    }
  },
  watch: {
    time (val) {
      this.leftMove = `${((this.time / this.maxTime) * 100).toFixed(2)}%`
      this.componentTime = val
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
