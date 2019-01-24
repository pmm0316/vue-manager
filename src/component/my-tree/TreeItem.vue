<template>
  <li>
    <div
      :class="{bold: isFolder}"
      @click="toggle">
      <div>
        <i v-if="isFolder" :class="['iconfont', !open ? 'icon-sanjiaoright' : 'icon-xiajiantou1']"></i>
        <span
          :draggable="draggable"
          @drag.prevent="onDrag"
          @dragend.prevent="onDragend"
          @dragstart="onDragStart($event, model)">{{ model.name }}</span>
      </div>
    </div>
    <ul v-show="open" v-if="isFolder">
      <tree-item
        :draggable="draggable"
        @onDragStart="onDragStart"
        class="item"
        v-for="(model, index) in model.children"
        :key="index"
        :model="model">
      </tree-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeItem',
  props: {
    model: Object,
    draggable: {
      default: false
    }
  },
  data: function () {
    return {
      open: false // 默认关闭
    }
  },
  computed: {
    isFolder: function () { // 如果有children，就返回子文件数量
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    onDrag () {},
    onDragend () {
    },
    onDragStart (e, node) {
      console.log('item', e, node)
      this.$emit('onDragStart', e, node)
    }
  }
}
</script>

<style scoped lang='scss'>
  .item {
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
  ul {
    padding-left: 2em;
    line-height: 1.5em;
    font-size: 13px;
  }
</style>
