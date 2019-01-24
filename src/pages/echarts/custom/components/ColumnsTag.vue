<template>
    <div
      @drag.prevent="onDrag"
      @dragend.prevent="onDragend"
      @dragstart="onDragStart"
      draggable="draggable"
      class="container"
      @click="handleClick">
      <div class="title-wrapper">
        <i :class="['iconfont', !open ? 'icon-sanjiaoright' : 'icon-xiajiantou1']"></i>
        <div class="title"><span>{{xData.name}}</span></div>
      </div>
      <div class="content" v-show="open">
        <el-checkbox-group v-model="node.data" @change="handleChange">
          <el-checkbox v-for="item in xData.data" :key="item.name" :label="item">
            {{item.name}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ColumnsTag',
  props: {
    draggable: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      open: false,
      node: {
        id: 1,
        name: '服装',
        data: []
      },
      xData: {
        id: 1,
        name: '服装',
        data: [
          {
            name: '衬衫',
            value: 5
          },
          {
            name: '羊毛衫',
            value: 20
          },
          {
            name: '雪纺衫',
            value: 36
          },
          {
            name: '裤子',
            value: 10
          },
          {
            name: '高跟鞋',
            value: 10
          },
          {
            name: '袜子',
            value: 20
          }
        ]
      }
    }
  },
  methods: {
    handleClick () {
      this.open = !this.open
    },
    handleChange () {
      console.log(this.columns)
    },
    onDragStart () {
      this.$emit('onDragStart', this.node)
    },
    onDragend () {},
    onDrag () {}
  }
}
</script>

<style scoped lang='scss'>
.container {
  width: 100%;
  background-color: coral;
  color: #fff;
  height: 20px;
  .title-wrapper {
    display: flex;
    line-height: 20px;
    .title {
      width: 85%;
      text-align: center;
    }
    .iconfont {
      font-size: 12px;
    }
  }
  .content {
    background-color: #FAEBD7;
    .el-checkbox:first-child {
      margin-left: 30px;
      padding-right: 14px;
    }
  }
}
</style>
