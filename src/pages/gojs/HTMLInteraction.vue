<template>
    <div>
      <div id='paletteDraggable' class='draggable' style='height: 300px;'>
      <div id='paletteDraggableHandle' class='handle'>Palette</div>
      <div id='paletteContainer'>
        <div id='myPaletteDiv'></div>
      </div>
    </div>

      <div id='infoDraggable'
           class='draggable' style='display: inline-block; vertical-align: top; padding: 5px; top: 20px; left: 380px;'>
        <div id='infoDraggableHandle' class='handle'>Info</div>
        <div>
          <div id='myInfo'></div>
        </div>
      </div>

      <div style='display: inline-block; vertical-align: top; width:400px'>
        <div id='myDiagramDiv' style='background-color: whitesmoke; border: solid 1px black; height: 400px'></div>
      </div>
    </div>
</template>

<script>
import go from 'gojs'
import $ from 'jquery'
import '../../../static/js/jquery-ui.min'
import Inspector from './js/DataInspector'

export default {
  name: 'HTMLInteraction',
  methods: {
    init () {
      let GO = go.GraphObject.make // for conciseness in defining templates
      let myDiagram =
        GO(go.Diagram, 'myDiagramDiv', // must name or refer to the DIV HTML element
          { allowDrop: true }) // must be true to accept drops from the Palette
      // define several shared Brushes
      let fill1 = 'rgb(105,210,231)'
      let brush1 = 'rgb(65,180,181)'
      let fill2 = 'rgb(167,219,216)'
      let brush2 = 'rgb(127,179,176)'
      let fill3 = 'rgb(224,228,204)'
      let brush3 = 'rgb(184,188,164)'
      let fill4 = 'rgb(243,134,48)'
      let brush4 = 'rgb(203,84,08)'
      myDiagram.nodeTemplateMap.add('', // default category
        GO(go.Node, 'Auto',
          { locationSpot: go.Spot.Center },
          new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
          GO(go.Shape, 'Ellipse',
            { strokeWidth: 2, fill: fill1, name: 'SHAPE' },
            new go.Binding('figure', 'figure'),
            new go.Binding('fill', 'fill'),
            new go.Binding('stroke', 'stroke')
          ),
          GO(go.TextBlock,
            { margin: 5,
              maxSize: new go.Size(200, NaN),
              wrap: go.TextBlock.WrapFit,
              textAlign: 'center',
              editable: true,
              font: 'bold 9pt Helvetica, Arial, sans-serif',
              name: 'TEXT' },
            new go.Binding('text', 'text').makeTwoWay())))
      // On selection changed, make sure infoDraggable will resize as necessary
      myDiagram.addDiagramListener('ChangedSelection', function (diagramEvent) {
        let idrag = document.getElementById('infoDraggable')
        idrag.style.width = ''
        idrag.style.height = ''
      })
      // initialize the Palette that is in a floating, draggable HTML container
      let myPalette = new go.Palette('myPaletteDiv') // must name or refer to the DIV HTML element
      myPalette.nodeTemplateMap = myDiagram.nodeTemplateMap
      myPalette.model = new go.GraphLinksModel([
        { text: 'Lake', fill: fill1, stroke: brush1, figure: 'Hexagon' },
        { text: 'Ocean', fill: fill2, stroke: brush2, figure: 'Rectangle' },
        { text: 'Sand', fill: fill3, stroke: brush3, figure: 'Diamond' },
        { text: 'Goldfish', fill: fill4, stroke: brush4, figure: 'Octagon' }
      ])
      myPalette.addDiagramListener('InitialLayoutCompleted', function (diagramEvent) {
        let pdrag = document.getElementById('paletteDraggable')
        let palette = diagramEvent.diagram
        pdrag.style.width = palette.documentBounds.width + 28 + 'px' // account for padding/borders
        pdrag.style.height = palette.documentBounds.height + 38 + 'px'
      })
      this.initAction(myPalette, myDiagram)
    },
    initAction (myPalette, myDiagram) {
      $('#paletteDraggable').draggable({handle: '#paletteDraggableHandle'}).resizable({
        // After resizing, perform another layout to fit everything in the palette's viewport
        stop: function () { myPalette.layoutDiagram(true) }
      })
      $('#infoDraggable').draggable({ handle: '#infoDraggableHandle' })
      let inspector = new Inspector('myInfo', myDiagram,
        {
          properties: {
            // key would be automatically added for nodes, but we want to declare it read-only also:
            'key': { readOnly: true, show: Inspector.showIfPresent },
            // fill and stroke would be automatically added for nodes, but we want to declare it a color also:
            'fill': { show: Inspector.showIfPresent, type: 'color' },
            'stroke': { show: Inspector.showIfPresent, type: 'color' }
          }
        })
      console.log(inspector)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped lang='scss'>
  .draggable {
    display: inline-block;
    vertical-align: top;
    border: 4px solid #BBB;
    border-radius: 4px;
    background-color: #F5F5F5;

    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 500;
  }

  .handle {
    background-color: lightblue;
    cursor: move;
    text-align: center;
    font: bold 12px sans-serif;
  }

  #infoDraggable {
    font: 12px helvetica, sans-serif;
  }

  #myInfo {
    width: 100%;
    overflow: hidden;
  }

  #myPaletteDiv {
    background-color: #F5F5F5;
    width: 100%;
    height: 100%;
  }

  /*
  One simple way of making a div fill its space,
  with allowances for the title (top) and the resize handle (bottom)
  */
  #paletteContainer {
    position:absolute;
    bottom: 14px;
    left: 0;
    right: 0;
    top: 14px;
  }
</style>
