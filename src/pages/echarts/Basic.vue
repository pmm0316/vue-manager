<template>
    <div class="container">
      <div class="operation col">
        <el-select v-model="value" placeholder="请选择" class="operation-item">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!--<div class="operation-item data-source">-->
          <!--<el-button-->
            <!--@click="handleTagClick(index)"-->
            <!--:class="{'selected': item.selected}"-->
            <!--:key="item.title"-->
            <!--v-for="(item, index) in dataSource">-->
            <!--{{item.title}}-->
          <!--</el-button>-->
        <!--</div>-->
      </div>
      <div class="chart col">
        <chart1
          :chartType="value"/>
      </div>
    </div>
</template>

<script>
import Chart1 from './components/Chart1'
export default {
  name: 'Basic',
  data () {
    return {
      value: 'bar',
      options: [
        {
          value: 'bar',
          label: '柱状图'
        },
        {
          value: 'line',
          label: '折线图'
        }
      ]
      // dataSource: [
      //   {
      //     title: '衬衫',
      //     value: 5,
      //     selected: true
      //   },
      //   {
      //     title: '羊毛衫',
      //     value: 20,
      //     selected: true
      //   },
      //   {
      //     title: '雪纺衫',
      //     value: 36,
      //     selected: true
      //   },
      //   {
      //     title: '裤子',
      //     value: 10,
      //     selected: true
      //   },
      //   {
      //     title: '高跟鞋',
      //     value: 10,
      //     selected: true
      //   },
      //   {
      //     title: '袜子',
      //     value: 20,
      //     selected: true
      //   }
      // ]
    }
  },
  components: {
    Chart1
  },
  methods: {
    // handleTagClick (index) {
    //   this.dataSource[index].selected = !this.dataSource[index].selected
    // }
  }
}
</script>

<style scoped lang='scss'>
  .container {
    display: flex;
    .col {
      margin-right: 100px;
      .operation-item {
        margin-bottom: 20px;
      }
      /*.data-source {*/
        /*width: 200px;*/
        /*text-align: center;*/
        /*.el-button {*/
          /*width: 80px;*/
          /*margin-bottom: 5px;*/
          /*&:first-of-type {*/
            /*margin-left: 10px;*/
          /*}*/
          /*&.selected {*/
            /*background-color: #67C23A;*/
            /*color: #fff;*/
          /*}*/
        /*}*/
      /*}*/
    }
    .chart {
      width: 100%;
    }
  }
</style>
