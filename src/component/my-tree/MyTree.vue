<template>
  <ul>
    <tree-item
      @onDragStart="onDragStart"
      class="item"
      :model="data">
    </tree-item>
  </ul>
</template>

<script>
import TreeItem from './TreeItem'
export default {
  name: 'MyTree',
  components: {
    TreeItem
  },
  props: {
    data: Object
  },
  methods: {
    onDragStart (node) {
      this.$emit('nodeDragStart', node)
    }
  }
}
</script>
