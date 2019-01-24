<template>
  <ul>
    <tree-item
      :draggable="draggable"
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
    data: Object,
    draggable: Boolean
  },
  methods: {
    onDragStart (e, node) {
      this.$emit('onDragStart', e, node)
    }
  }
}
</script>
