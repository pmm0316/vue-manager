<template>
  <div class="container">
    <div class="left">
      <el-collapse>
        <el-collapse-item title="图表类型" name="1">
          <div class="content-item">
            <span
              v-for="item in chartTypes"
              :key="item.type"
              class="span-item"
              draggable="true"
              @drag.prevent="onDrag"
              @dragend.prevent="onDragend"
              @dragstart="onDragStart(item)">
            {{item.title}}
          </span>
          </div>
        </el-collapse-item>
        <el-collapse-item title="x轴数据" name="2">
          <div class="content-item">
            <span
              draggable="true"
              @drag.prevent="onDrag"
              @dragend.prevent="onDragend"
              @dragstart="onDragStart(item)"
              v-for="item in data"
              :key="item.title"
              class="span-item">
            {{item.title}}
          </span>
          </div>
        </el-collapse-item>
        <el-collapse-item title="y轴数据" name="3">
          <div class="content-item">
            <span
              draggable="true"
              v-for="item in legends"
              @dragstart="onDragStart(item)"
              :key="item.title" class="span-item">
            {{item.title}}
          </span>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div
      class="right"
      id="right"
      @drop.prevent="onDrop"
      @dragover.prevent="dragOver">
      <div class="chart" id="chart" style="width: 600px;height:400px;">
      </div>
    </div>
  </div>
</template>

<script>
import Chart1 from './components/Chart1'
import echarts from 'echarts'
export default {
  name: 'VddlSimpleChart',
  data () {
    return {
      myChart: null,
      chartTypes: [
        {
          title: '柱状图',
          type: 'bar',
          dataType: 'chart',
          id: '1'
        },
        {
          title: '折线图',
          type: 'line',
          dataType: 'chart',
          id: '2'
        }
      ],
      legends: [
        {
          title: '销量',
          dataType: 'legend'
        }
      ],
      data: [
        {
          title: '衬衫',
          value: 5,
          dataType: 'data'
        },
        {
          title: '羊毛衫',
          value: 20,
          dataType: 'data'
        },
        {
          title: '雪纺衫',
          value: 36,
          dataType: 'data'
        },
        {
          title: '裤子',
          value: 10,
          dataType: 'data'
        },
        {
          title: '高跟鞋',
          value: 10,
          dataType: 'data'
        },
        {
          title: '袜子',
          value: 20,
          dataType: 'data'
        }
      ],
      option: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: []
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
  components: {
    Chart1
  },
  methods: {
    onDragStart (item) {
      console.log('onDragStart', item)
      this.currentItem = item
      // ev.dataTransfer.setData('Text', ev.target.innerText)
    },
    onDrag (ev) {
      // this.chartType = ev.target.innerText
      // console.log('onDrag', ev)
    },
    onDragend (ev) {
      console.log('onDragend')
    },
    onDrop () {
      let dataType = this.currentItem.dataType
      if (dataType === 'chart') {
        if (this.currentItem.type === 'bar') {
          this.myChart = echarts.init(document.getElementById('chart'))
          this.option.series[0].type = 'bar'
        }
      } else if (dataType === 'data') {
        let title = this.currentItem.title
        if (!this.option.xAxis.data.includes(title)) {
          this.option.xAxis.data.push(title)
        }
        let xLen = this.option.xAxis.data.length
        let yLen = this.option.series[0].data.length
        let lastValue = this.option.xAxis.data[xLen - 1]
        if (this.isLegend && xLen > 0 && (xLen - 1) === yLen) {
          this.data.forEach(item => {
            if (item.title === lastValue) {
              this.option.series[0].data.push(item.value)
            }
          })
        }
      } else if (dataType === 'legend') {
        this.isLegend = true
        this.option.xAxis.data.forEach(v1 => {
          let value = 0
          for (let i = 0; i < this.data.length; i++) {
            if (v1 === this.data[i].title) {
              value = this.data[i].value
              continue
            }
          }
          this.option.series[0].data.push(value)
        })
      }
      this.myChart.setOption(this.option)
    },
    dragOver () {
      // console.log('dragOver')
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang='scss'>
  @import "./style.scss";
  .container {
    .left {
      width: 30%;
      min-width: 200px;
      float: left;
      border: 1px solid #ccc;
      border-radius: 5px;
      .content-item {
        border-top: 1px solid #ccc;
        padding-top: 10px;
        margin-left: 10px;
      }
    }
    .right {
      float: right;
      border: 1px solid #aaa;
      width: 60%;
      height: calc(78vh);
    }
  }
</style>
