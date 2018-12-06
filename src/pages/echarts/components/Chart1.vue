<template>
    <div id="chart1" style="width: 600px;height:400px;"></div>
</template>

<script>
import echarts from 'echarts'
// import pieOption from './pieOption'
export default {
  name: 'Chart1',
  props: {
    chartType: {
      require: true
    },
    dataSource: {
      require: true
    }
  },
  data () {
    return {
      myChart: null,
      option: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  },
  methods: {
    setData () {
      let xAxisData = []
      let series0Data = []
      this.dataSource.forEach(item => {
        if (item.selected) {
          xAxisData.push(item.title)
          series0Data.push(item.value)
        }
      })
      this.option.xAxis.data = xAxisData
      this.option.series[0].data = series0Data
    },
    setOption () {
      this.myChart.setOption(this.option)
    },
    drawChart () {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById('chart1'))
      // this.setData()
      this.setOption()
    }
  },
  mounted () {
    this.drawChart()
  },
  watch: {
    chartType () {
      // this.setData()
      this.option.series[0].type = this.chartType
      this.setOption()
    },
    dataSource: {
      handler () {
        this.setData()
        this.setOption()
      },
      deep: true // 深度监听（适合数据或者对象的监听）
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
