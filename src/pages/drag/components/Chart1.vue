<template>
    <div id="drag-chart1" style="width: 600px;height:400px;"></div>
</template>

<script>
import echarts from 'echarts'
// import pieOption from './pieOption'
export default {
  name: 'drag-chart1',
  props: {
    chartType: {
      type: 'string'
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
          data: []
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: '',
            data: []
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
    }
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById('drag-chart1'))
    // this.setData()
    this.setOption()
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
