<template>
  <div class="chart-container column-center">
    <template v-if="noData">
      <span>暂无数据</span>
    </template>
    <template v-else>
      <div class="chart" ref="chartRef"></div>
    </template>
  </div>
</template>

<script>
/* eslint-disable */
import moment from 'moment'
import echarts from 'echarts'

const OPTION = {
  textStyle: {
    color: '#fff',
    fontSize: 10
  },
  grid: {
    // show: false,
    left: '10%',
    right: '10%',
    top: '10%',
    bottom: '10%'
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false,
      margin: 2,
      fontSize: 8
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    }
    // splitLine: {
    //   lineStyle: {
    //     color: '#E5E5E5',
    //     opacity: 0.5
    //   }
    // }
  },
  series: [{
    type: 'line',
    data: [],
    lineStyle: {
      color: '#FF0000',
      width: 1
    },
    itemStyle: {
      opacity: 0
    },
    areaStyle: {
      origin: 'start',
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0, color: 'rgba(255, 0, 0, 1)' // 0% 处的颜色
        }, {
          offset: 1, color: 'rgba(255, 0, 0, 0)' // 100% 处的颜色
        }],
        global: false
      }
    }
  }]
}

export default {
  name: 'Chart',
  props: {
    fundCode: {
      type: String,
      default: ''
    },
    fundType: {
      type: String,
      defualt: ''
    },
    rateDimension: {
      type: String,
      defualt: ''
    }
  },
  data () {
    return {
      noData: false
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    isMonetary () {
      return this.verifyMonetaryFund(this.fundType)
    }
  },
  methods: {
    startDate (lastDate) {
      // 默认近一年
      let returnData = ''
      switch (this.rateDimension) {
        case 'ONEWEEKRESMUD':
          returnData = moment(lastDate).add(-7, 'D').format('YYYYMMDD')
          break
          case 'ONEMONTHRESMUD':
          returnData = moment(lastDate).add(-1, 'M').format('YYYYMMDD')
          break
          case 'THREEMONTHRESMUD':
          returnData = moment(lastDate).add(-3, 'M').format('YYYYMMDD')
          break
          case 'SIXMONTHRESMUD':
          returnData = moment(lastDate).add(-6, 'M').format('YYYYMMDD')
          break
          case 'ONEYEARRESMUD':
          returnData = moment(lastDate).add(-1, 'Y').format('YYYYMMDD')
          break
          case 'TWOYEARRESMUD':
          returnData = moment(lastDate).add(-2, 'Y').format('YYYYMMDD')
          break
          case 'THREEYEARRESMUD':
          returnData = moment(lastDate).add(-3, 'Y').format('YYYYMMDD')
          break
          case 'ETIMERESMUD':
          returnData = moment(lastDate).add(-9999, 'Y').format('YYYYMMDD')
          break
      }
      return returnData
    },
    async init () {
      try {
        let list = []
        let lastDate = ''
        let startDate = ''
        let baseAccNav = 0
        let hasDataNum = 0
        const data = await this.$marketApi.getIncomeList({ fundCode: this.fundCode })
        list = this.$utils.arrSort(data, 'SK_DATE')
        lastDate = list[list.length - 1].SK_DATE
        // 通过控制始末位置控制数据区间
        startDate = this.startDate(lastDate)
        list = list.filter(i => i.SK_DATE >= startDate)
        if (this.isMonetary) {
          list = list.map(i => {
            if (i.INCOMEUNIT) hasDataNum++
            return {
              date: moment(i.date).format('YYYYMMDD'),
              data: i.INCOMEUNIT
            }
          })
          if (!hasDataNum) {
            this.noData = true
            return
          }
        } else {
          baseAccNav = list[0].TOTALNAV
          list = list.map(i => {
            return {
              date: moment(i.date).format('YYYYMMDD'),
              data: ((i.TOTALNAV - baseAccNav) * 100 / baseAccNav).toFixed(2)
            }
          })
        }
        
        const chart = echarts.init(this.$refs.chartRef)
        const option = JSON.parse(JSON.stringify(OPTION))
        option.xAxis[0].data = list.map(i => i.date)
        option.series[0].data = list.map(i => i.data)

        let decimal  = this.isMonetary ? 4 : 2
        chart.setOption(option)
      } catch (e) {
        console.log(e)
        this.noData = true
      }
    },
    getYLabel (data) {
      let maxLabel, minLabel, intervalLabel, yLabelList = []
      let max = Math.max(...data)
      let min = Math.min(...data)
      let minInterval = ((max - min) * 1.2 / 4).toFixed(2)
      // x上下轴刻度标签个数
      let xTopLabelNum = Math.ceil(max / minInterval)
      let xBottomLabelNum = min > 0 ? Math.ceil(min / minInterval) : Math.floor(min / minInterval)
      // 如果除0外刻度个数大于4就增加 间隔大小
      let i = 1
      while (xTopLabelNum + Math.abs(xBottomLabelNum) > 3) {
        minInterval = ((minInterval / 5) * i + Number(minInterval)).toFixed(2)
        xTopLabelNum = Math.ceil(max / minInterval)
        xBottomLabelNum = min > 0 ? Math.ceil(min / minInterval) : Math.floor(min / minInterval)
        i++
      }
      maxLabel = parseFloat(xTopLabelNum * minInterval).toFixed(2)
      minLabel = parseFloat(xBottomLabelNum * minInterval).toFixed(2)
      intervalLabel = minInterval
      for (let i = 0; i < xTopLabelNum; i++) {
        yLabelList.push((maxLabel - i * intervalLabel).toFixed(2))
      }
      for (let i = 0; i < Math.abs(xBottomLabelNum) + 1; i++) {
        yLabelList.push((0 - i * intervalLabel).toFixed(2))
      }
      return { min: +minLabel, max: +maxLabel, interval: +intervalLabel, yLabelList}
    }
  },
  watch:{
    fundCode (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.init()
      }
    }
  }
}
</script>

<style lang='less' scoped>
.chart-container {
  width: 140upx;
  // background: url('https://gw.alipayobjects.com/os/q/cms/images/kbg2vn13/7910213f-d17c-4acf-a47f-e9d52b996e52_w360_h248.png') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .chart {
    width: 140upx;
    height: 80upx;
  }
  span {
    font-size: 14upx;
  }
}
</style>
