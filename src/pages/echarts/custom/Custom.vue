<template>
  <div class="container">
    <el-col class="container-item left" :span="8">
      <el-col :span="12" class="chart">
        <div class="title">图表</div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="数据" name="first">
            <div>
              <el-collapse>
                <el-collapse-item title="图表类型" name="1">
                  <div class="content-item">
                    <div
                      v-for="item in chartTypes"
                      :key="item.type"
                      draggable="true"
                      @drag.prevent="onDrag"
                      @dragend.prevent="onDragend"
                      @dragstart="onDragStart(item)">
                      <chart-type-item :item="item"/>
                    </div>
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
            </div>
          </el-tab-pane>
          <el-tab-pane label="样式" name="second" class="style">
            <el-collapse>
              <el-collapse-item name="style-title">
                <template slot="title">
                  标题&nbsp;&nbsp;&nbsp;<el-checkbox @change="changeTitleShow" v-model="titleShow"></el-checkbox>
                </template>
                <div class="style-item">
                  <el-input
                    class="item"
                    size="mini"
                    placeholder="请输入标题"
                    @blur="titleTextBlur"
                    v-model="titleText"/>
                </div>
                <div class="style-item">
                  <el-color-picker
                    @change="changeTitleColor"
                    class="item"
                    v-model="titleColor"
                    size="mini">
                  </el-color-picker>
                  <el-select v-model="titleFontSize" size="mini" @change="changeTitleFontSize">
                    <el-option
                      :value="fontSize"
                      :label="fontSize"
                      v-for="fontSize in fontSizeList"
                      :key="fontSize">
                    </el-option>
                  </el-select>
                </div>
                <div class="style-item">
                  <div class="box">
                    <p class="text">对齐</p>
                    <div class="icon-wrapper">
                      <i
                        @click="handleAlignIconClick(index)"
                        :key="icon.className"
                        class="iconfont"
                        :class="[icon.className, icon.selected ? 'selected': '']"
                        v-for="(icon, index) in alignIcons">
                      </i>
                    </div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
            <div class="edit-item">
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="12" class="data-model">
        <div class="title">数据模型</div>
      </el-col>
    </el-col>
    <div
      class="container-item content"
      @drop.prevent="onDrop"
      @dragover.prevent="dragOver">
      <div class="chart" ref="chart" style="width: 600px;height:400px;">
      </div>
    </div>
    <el-col :span="3" class="container-item chart-display">
      <el-button @click="saveChart" type="primary" size="mini">保存</el-button>
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
      titleShow: true,
      alignIcons: [
        {
          name: 'left',
          className: 'icon-zuoduiqi',
          selected: true
        },
        {
          name: 'center',
          className: 'icon-juzhongduiqi',
          selected: false
        },
        {
          name: 'right',
          className: 'icon-youduiqi',
          selected: false
        }
      ],
      fontSizeList: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      titleFontSize: 14,
      activeName: 'first',
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
          show: true,
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
    /**
     * 改变title的字体大小
     */
    changeTitleFontSize () {
      if (!this.existChart) {
        return
      }
      this.option.title.textStyle.fontSize = this.titleFontSize
      this.drawChart(this.option)
    },
    /**
     * 控制title是否显示
     */
    changeTitleShow () {
      if (!this.existChart) {
        return
      }
      this.option.title.show = this.titleShow
      this.drawChart(this.option)
    },
    /**
     * 点击对齐的icon
     * 控制title的对齐方式(左对齐/居中对齐/右对齐)
     * @param i 下标
     */
    handleAlignIconClick (i) {
      if (!this.existChart) {
        return
      }
      this.alignIcons.forEach(item => {
        if (item.selected) {
          item.selected = false
        }
      })
      this.alignIcons[i].selected = true
      this.option.title.x = this.alignIcons[i].name
      this.drawChart(this.option)
    },
    /**
     * 点击tab页事件
     * @param tab event
     */
    handleClick (tab, event) {
      console.log(tab, event)
    },
    showChart (item) {
      this.drawChart(item)
    },
    /**
     * 保存图表
     */
    saveChart () {
      // 深拷贝
      let option = JSON.parse(JSON.stringify(this.option))
      this.addChart(option)
    },
    titleTextBlur () {
      this.option.title.text = this.titleText
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
        this.titleText = this.option.title.text
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
    /**
     * 根据配置数据，画出图表
     * @param option
     */
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
    font-size: 14px;
    box-sizing: border-box;
    .container-item {
      border-radius: 3px;
      margin-right: 20px;
      height: calc(78vh);
    }
    .left {
      border: 1px solid #ccc;
      .title {
        text-align: center;
        border-bottom: 1px solid #ccc;
        padding: 5px 0;
      }
      .chart {
        .el-collapse {
          border-right: 1px solid #ccc;
          .content-item {
            border-top: 1px solid #ccc;
            padding-top: 10px;
            margin-left: 10px;
          }
        }
        .style {
          .style-item {
            display: flex;
            width: 92%;
            margin: 3px auto;
            .el-select {
              width: 65px;
            }
            .box {
              display: flex;
              width: 100%;
              border-radius: 3px;
              padding-left: 10px;
              border: 1px solid #ccc;
              .text {
                width: 20%;
              }
              .icon-wrapper {
                width: 70%;
                text-align: right;
                .iconfont {
                  margin-left: 15px;
                  color: #999;
                  cursor: pointer;
                  &.selected {
                    color: blue;
                  }
                }
              }
            }
          }
        }
      }
      .data-model {
        height: 100%;
        border-left: 1px solid #ccc;
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
    }
    .chart-display {
      border: 1px solid #aaa;
    }
  }
</style>
