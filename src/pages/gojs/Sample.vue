<template>
    <div class="container">
      <div id="myDiagramDiv1"
           style="width:500px; height:200px; background-color: #DAE4E4;"></div>
      <div id="myDiagramDiv2"
           style="width:500px; height:200px; background-color: #DAE4E4;"></div>
    </div>
</template>

<script>
import go from 'gojs'

export default {
  name: 'Sample',
  data () {
    return {
    }
  },
  methods: {
    initialGoJsPage1 () {
      let $ = go.GraphObject.make // 拿到画笔
      let myDiagram = $(go.Diagram, 'myDiagramDiv1',
        {
          'undoManager.isEnabled': true, // 允许Ctrl-Z撤消，Ctrl-Y重做
          layout: $(go.TreeLayout, {
            angle: 0 // 角度0度
          })
        },
        {
          initialContentAlignment: go.Spot.Center // 图形居中
        })
      let myModel = $(go.GraphLinksModel) // 拿到模型
      // 定义模型节点数据的显示形式
      myDiagram.nodeTemplate = $(go.Node, 'Horizontal',
        {
          background: '#44CCFF'
        },
        $(go.TextBlock, 'Default Text', {
          margin: 10, stroke: 'white', font: 'bold 14px sans-serif' // some room around the text, a larger font, and a white stroke:
        },
        // TextBlock.text is data bound to the "name" attribute of the model data
        // 显示文本绑定为name的值
        new go.Binding('text', 'name'))
      )
      myModel.nodeDataArray = [
        { name: '开始', key: 'Alpha' },
        { name: '审核', key: 'Beta' },
        { name: '结束', key: 'Gamma' }
      ]
      myModel.linkDataArray = [
        {from: 'Alpha', to: 'Beta'},
        {from: 'Beta', to: 'Gamma'}
      ]
      myDiagram.model = myModel
    },
    initialGoJsPage2 () {
      if (this.myDiagram2) {
        return
      }
      let $ = go.GraphObject.make // 拿到画笔
      this.myDiagram2 = $(go.Diagram, 'myDiagramDiv2',
        {
          'undoManager.isEnabled': true, // 允许Ctrl-Z撤消，Ctrl-Y重做
          layout: $(go.TreeLayout, {
            angle: 90, layerSpacing: 35 // 角度90度
          })
        },
        {
          initialContentAlignment: go.Spot.Center // 图形居中
        })
      let myDiagram = this.myDiagram2
      let myModel = $(go.TreeModel) // 拿到模型
      myModel.nodeDataArray = [
        { key: 'A' },
        { key: 'B1', parent: 'A' },
        { key: 'B2', parent: 'A' },
        { key: 'C1', parent: 'B1' },
        { key: 'C2', parent: 'B2' }
      ]
      myDiagram.model = myModel
    }
  },
  mounted () {
    // this.initialGoJsPage1()
    this.initialGoJsPage2()
  },
  destroyed () {
    console.log('destroyed')
  }
}
</script>

<style scoped lang='scss'>
.container {
  div {
    margin: 10px;
  }
}
</style>
