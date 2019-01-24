<template>
  <div class="container">
    <el-row>
      <el-col class="container-item left" :span="8">
        <el-col :span="12" class="chart">
          <div class="title">图表</div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane class="data" label="数据" name="first">
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
                  <!--<el-collapse-item title="x轴数据" name="2">-->
                    <!--<div class="content-item">-->
                    <!--<span-->
                      <!--draggable="true"-->
                      <!--@drag.prevent="onDrag"-->
                      <!--@dragend.prevent="onDragend"-->
                      <!--@dragstart="onDragStart(item)"-->
                      <!--v-for="item in category"-->
                      <!--:key="item.id"-->
                      <!--class="data-item">-->
                      <!--{{item.name}}-->
                    <!--</span>-->
                    <!--</div>-->
                  <!--</el-collapse-item>-->
                  <div class="x-data">
                    <div class="title">x轴</div>
                    <div
                      class="content"
                      @drop.prevent="nodeDrop($event)"
                      @dragover.prevent="nodeDragOver">
                      <div class="field empty" v-show="nodeList.length === 0">请把字段拖入到此处</div>
                      <div class="field" v-for="node in nodeList" :key="node.name">{{node.name}}</div>
                    </div>
                  </div>
                  <el-collapse-item title="y轴" name="3">
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
                    标题&nbsp;&nbsp;&nbsp;<el-checkbox @change="changeTitleShow" v-model="custom.title.show"></el-checkbox>
                  </template>
                  <div class="style-item">
                    <el-input
                      class="item"
                      size="mini"
                      placeholder="请输入标题"
                      @blur="titleTextBlur"
                      v-model="custom.title.text"/>
                  </div>
                  <div class="style-item">
                    <el-color-picker
                      @change="changeTitleColor"
                      class="item"
                      v-model="custom.title.textStyle.color"
                      size="mini">
                    </el-color-picker>
                    <el-select
                      v-model="custom.title.textStyle.fontSize"
                      size="mini"
                      @change="changeTitleFontSize">
                      <el-option
                        :value="fontSize"
                        :label="fontSize"
                        v-for="fontSize in fontSizeList"
                        :key="fontSize">
                      </el-option>
                    </el-select>
                    <el-select
                      class="font-family-select"
                      v-model="custom.title.textStyle.fontFamily"
                      size="mini"
                      @change="changeTitleFontFamily">
                      <el-option
                        :value="fontFamily"
                        :label="fontFamily"
                        v-for="fontFamily in fontFamilyList"
                        :key="fontFamily">
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
          <!--<my-tree
            :draggable="true"
            :data="treeData"
            @onDragStart="nodeDragStart"/>-->
          <columns-tag :draggable="true" @onDragStart="nodeDragStart"/>
        </el-col>
      </el-col>
      <el-col :span="13" class="container-item">
        <div
          @click="handleChartItemClick('chart1')"
          class="chart-item"
          @drop.prevent="onDrop('chart1')"
          @dragover.prevent="dragOver('chart1')">
          <div class="chart" ref="chart1" style="width: 600px;height:300px;">
          </div>
        </div>
        <div
          @click="handleChartItemClick('chart2')"
          class="chart-item"
          @drop.prevent="onDrop('chart2')"
          @dragover.prevent="dragOver('chart2')">
          <div class="chart" ref="chart2" style="width: 600px;height:300px;">
          </div>
        </div>
      </el-col>
      <el-col :span="2" class="container-item chart-display">
        <el-button @click="saveChart" type="primary" size="mini">保存</el-button>
        <el-button v-for="(item, index) in chartList" :key="index" @click="showChart(item)">{{item.title.text}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import { TYPE } from '../../../common/constant/echarts'
import ChartTypeItem from './components/ChartTypeItem'
import ColumnsTag from './components/ColumnsTag'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'VddlSimpleChart',
  data () {
    return {
      nodeList: [], // x轴的字段list
      custom: {
        title: {
          show: true,
          text: '',
          textStyle: {
            color: '#011',
            fontSize: 14,
            fontFamily: 'sans-serif'
          }
        }
      },
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
      fontFamilyList: ['sans-serif', 'serif', 'monospace', 'Arial', 'Microsoft YaHei'],
      fontSizeList: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      activeName: 'first',
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
      treeData: {
        id: 1,
        name: '服装',
        children: [
          {
            name: '衬衫',
            value: 5,
            dataType: 'data'
          },
          {
            name: '羊毛衫',
            value: 20,
            dataType: 'data'
          },
          {
            name: '雪纺衫',
            value: 36,
            dataType: 'data'
          },
          {
            name: '裤子',
            value: 10,
            dataType: 'data'
          },
          {
            name: '高跟鞋',
            value: 10,
            dataType: 'data'
          },
          {
            name: '袜子',
            value: 20,
            dataType: 'data'
          }
        ]
      },
      xData: [], // x轴的数据
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
          name: '',
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
    ChartTypeItem,
    ColumnsTag
  },
  methods: {
    ...mapMutations({
      addChart: 'echarts/addChart'
    }),
    nodeDrop (ev) {
      // let node = ev.dataTransfer.getData('node')
      /* let isExist = this.nodeList.some(item => {
        return item.name === this.currNode.name
      })
      if (!isExist) {
        this.nodeList.push(this.currNode)
        this.option.xAxis.data.push(this.currNode.name)
        this.drawChart(this.option, this.currRefName)
      } */
      this.nodeList.push(this.node)
      this.node.data.forEach(item => {
        this.option.xAxis.data.push(item.name)
      })
      this.option.xAxis.name = this.node.name
      this.drawChart(this.option, this.currRefName)
    },
    nodeDragOver () {},
    nodeDragStart (node) {
      console.log('nodeDragStart', node)
      // ev.dataTransfer.setData('node', node)
      // this.currNode = node
      this.node = node
    },
    handleChartItemClick (refName) {
      this.currRefName = refName
    },
    /**
     * 改变title的字体类型
     */
    changeTitleFontFamily () {
      if (!this.existChart) {
        return
      }
      this.option.title.textStyle.fontFamily = this.custom.title.textStyle.fontFamily
      this.drawChart(this.option, this.currRefName)
    },
    /**
     * 改变title的字体大小
     */
    changeTitleFontSize () {
      if (!this.existChart) {
        return
      }
      this.option.title.textStyle.fontSize = this.custom.title.textStyle.fontSize
      this.drawChart(this.option, this.currRefName)
    },
    /**
     * 控制title是否显示
     */
    changeTitleShow () {
      if (!this.existChart) {
        return
      }
      this.option.title.show = this.custom.title.show
      this.drawChart(this.option, this.currRefName)
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
      this.drawChart(this.option, this.currRefName)
    },
    /**
     * 点击tab页事件
     * @param tab event
     */
    handleClick (tab) {},
    showChart (item) {
      this.drawChart(item)
    },
    /**
     * 保存图表
     */
    saveChart () {
      // 深拷贝
      let option = JSON.parse(JSON.stringify(this.option))
      console.log(this.myChart.getOption())
      this.addChart(option)
    },
    titleTextBlur () {
      if (!this.existChart) {
        return
      }
      this.option.title.text = this.custom.title.text
      this.drawChart(this.option, this.currRefName)
    },
    /**
     * 改变title字体颜色
     */
    changeTitleColor () {
      if (!this.existChart) {
        return
      }
      this.option.title['textStyle']['color'] = this.custom.title.textStyle.color
      this.drawChart(this.option, this.currRefName)
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
    onDrop (refName) {
      console.log('onDrop', refName)
      let dataType = this.currentItem.dataType || ''
      if (dataType === 'chart') {
        let type = this.currentItem.type
        if (type === TYPE.bar) {
          this.option.series[0].type = TYPE.bar
          this.option.title.text = this.currentItem.title
        } else if (type === TYPE.line) {
          this.option.series[0].type = TYPE.line
          this.option.title.text = this.currentItem.title
        }
        this.custom.title.text = this.option.title.text
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
      this.currRefName = refName
      this.drawChart(this.option, refName)
    },
    dragOver () {
      // console.log('dragOver')
    },
    /**
     * 根据配置数据，画出图表
     * @param option
     */
    drawChart (option, refName) {
      if (!refName) {
        this.$message({
          message: '请选择选择图表',
          type: 'warning'
        })
        return
      }
      this.myChart = echarts.init(this.$refs[refName])
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
      border: 1px solid #ccc;
      border-radius: 3px;
      margin-left: 10px;
      height: calc(75vh);
    }
    .left {
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
        .data {
          .x-data {
            .title {
              font-weight: bold;
              text-align: left;
              margin-left: 10px;
              color: #333;
            }
            .field {
              background-color: cornflowerblue;
              width: 100%;
              font-size: 12px;
              height: 15px;
              border: 1px solid #ccc;
              text-align: center;
              border-radius: 10px;
              color: #fff;
              margin-top: 2px;
              &.empty {
                color: #999;
                background-color: #eeeeee;
              }
            }
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
            .font-family-select {
              width: 100px;
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
  }
</style>
