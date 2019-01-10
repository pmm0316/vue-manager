<template>
  <div class="container">
    <el-col class="left" :span="8">
      <div class="operation-btns">
        <el-button @click="saveChart" type="primary" size="mini">保存</el-button>
      </div>
      <el-col :span="10">
        <el-collapse>
          <el-collapse-item title="图表类型" name="1">
            <div class="content-item">
              <chart-type-item
                v-for="item in chartTypes"
                :key="item.type"
                :item="item"
                draggable="true"
                @drag.prevent="onDrag"
                @dragend.prevent="onDragend"
                @dragstart="onDragStart(item)"/>
            </div>
          </el-collapse-item>
          <el-collapse-item title="x轴数据" name="2">
            <div class="content-item">
              <span
                draggable="true"
                @drag.prevent="onDrag"
                @dragend.prevent="onDragend"
                @dragstart="onDragStart(item)"
                v-for="item in category"
                :key="item.id"
                class="data-item">
                {{item.name}}
              </span>
            </div>
          </el-collapse-item>
          <el-collapse-item title="y轴数据" name="3">
            <div class="content-item">
              <span
                draggable="true"
                v-for="item in legends"
                @dragstart="onDragStart(item)"
                :key="item.title"
                class="data-item">
                {{item.title}}
              </span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="14">
        <div class="edit-item">
          <label class="item">标题:</label>
          <el-input
            class="item"
            size="mini"
            placeholder="请输入标题"
            @blur="titleTextBlur"
            v-model="titleText"/>
          <el-select
            @change="changeTitleAlign"
            class="item"
            size="mini"
            placeholder="位置"
            v-model="titleX">
            <el-option value="left" label="靠左">靠左</el-option>
            <el-option value="center" label="居中">居中</el-option>
            <el-option value="right" label="靠右">靠右</el-option>
          </el-select>
          <el-color-picker
            @change="changeTitleColor"
            class="item"
            v-model="titleColor"
            size="mini">
          </el-color-picker>
        </div>
        <div class="edit-item">
        </div>
      </el-col>
    </el-col>
    <div
      class="content"
      id="right"
      @drop.prevent="onDrop"
      @dragover.prevent="dragOver">
      <div class="chart" ref="chart" style="width: 600px;height:400px;">
      </div>
    </div>
    <el-col :span="3" class="chart-display">
      <el-button v-for="(item, index) in chartList" :key="index" @click="showChart(item)">{{item.title.text}}</el-button>
    </el-col>
  </div>
</template>

<script>
import echarts from 'echarts'
import { TYPE } from '../../../common/constant/echarts'
import ChartTypeItem from './components/ChartTypeItem'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'VddlSimpleChart',
  data () {
    return {
      titleText: '', // 图表的标题
      titleX: '', // 标题位置(左边，居中，右边)
      titleColor: '#011', // 标题颜色
      myChart: null,
      chartTypes: [
        {
          title: '柱状图',
          type: 'bar',
          dataType: 'chart',
          className: 'icon-barchart',
          id: '1'
        },
        {
          title: '折线图',
          type: 'line',
          dataType: 'chart',
          className: 'icon-linechart',
          id: '2'
        }
      ],
      legends: [
        {
          title: '销量',
          dataType: 'legend'
        }
      ],
      category: [
        {
          id: '1',
          name: '服装',
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
          dataType: 'data'
        }
      ],
      list: [],
      option: {
        title: {
          text: '',
          textStyle: {
          }
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
  computed: {
    ...mapGetters({
      chartList: 'echarts/chartList'
    })
  },
  components: {
    ChartTypeItem
  },
  methods: {
    ...mapMutations({
      addChart: 'echarts/addChart'
    }),
    showChart (item) {
      this.drawChart(item)
    },
    saveChart () {
      let option = JSON.parse(JSON.stringify(this.option))
      this.addChart(option)
    },
    titleTextBlur () {
      this.option.title.text = this.titleText
      this.drawChart(this.option)
    },
    changeTitleAlign () {
      this.option.title.x = this.titleX
      this.drawChart(this.option)
    },
    changeTitleColor () {
      console.log(this.titleColor)
      this.option.title['textStyle']['color'] = this.titleColor
      this.drawChart(this.option)
    },
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
      console.log('onDrop')
      let dataType = this.currentItem.dataType
      if (dataType === 'chart') {
        let type = this.currentItem.type
        if (type === TYPE.bar) {
          this.option.series[0].type = TYPE.bar
          this.option.title.text = this.currentItem.title
        } else if (type === TYPE.line) {
          this.option.series[0].type = TYPE.line
          this.option.title.text = this.currentItem.title
        }
        this.existChart = true // 图表已经选择
      } else if (dataType === 'data') {
        console.log(this.currentItem)
        let data = this.currentItem.data
        console.log('data', data, data.length)
        for (let i = 0; i < data.length; i++) {
          this.option.xAxis.data.push(data[i].title)
        }
      } else if (dataType === 'legend') {
        // this.isLegend = true
        let data = this.category[0].data
        this.option.xAxis.data.forEach(v1 => {
          let value = 0
          for (let i = 0; i < data.length; i++) {
            if (v1 === data[i].title) {
              value = data[i].value
              continue
            }
          }
          this.option.series[0].data.push(value)
        })
      }
      console.log('option', this.option)
      this.drawChart(this.option)
    },
    dragOver () {
      // console.log('dragOver')
    },
    drawChart (option) {
      console.log('drawChart')
      if (!this.myChart) {
        this.myChart = echarts.init(this.$refs.chart)
      }
      this.myChart.setOption(option)
    }
  },
  mounted () {
    console.log(this.chartList)
  }
}
</script>

<style scoped lang='scss'>
  @import "./style.scss";
  .container {
    box-sizing: border-box;
    .left {
      min-width: 200px;
      border: 1px solid #ccc;
      border-radius: 5px;
      .el-collapse {
        border-right: 1px solid #ccc;
        .content-item {
          border-top: 1px solid #ccc;
          padding-top: 10px;
          margin-left: 10px;
        }
      }
      .edit-item {
        display: flex;
        padding: 2px 5px;
        label {
          line-height: 30px;
          width: 74px;
          font-size: 12px;
        }
        .item {
          margin-left: 5px;
        }
      }
    }
    .content {
      float: left;
      border: 1px solid #aaa;
      height: calc(78vh);
    }
    .chart-display {
      border: 1px solid #aaa;
      height: calc(78vh);
    }
  }
</style>
