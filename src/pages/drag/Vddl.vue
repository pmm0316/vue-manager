<template>
  <div class='container'>
    <div
      class="box-card"
      v-for='(list, listName) in lists'
      :key="listName">
      <div class='panel'>
        <div class='header'>
          <h3>List {{listName}}</h3>
        </div>
        <div class='body'>
          <vddl-list class='panel__body--list'
                     :list='list'
                     :inserted='handleInserted'
                     :dragover='handleDragover'
                     :drop='handleDrop'
                     :horizontal='false'>
            <vddl-draggable class='body-item' v-for='(item, index) in list' :key='item.id'
                            :draggable='item'
                            :index='index'
                            :wrapper='list'
                            effect-allowed='move'
                            :selected='selectedEvent'
                            :dragstart='handleDragstart'
                            :dragend='handleDragend'
                            :canceled='handleCanceled'
                            :moved='handleMoved'
                            v-bind:class="{'selected': selected === item}">
              {{item.label}}
            </vddl-draggable>
            <vddl-placeholder>&nbsp;&nbsp;&nbsp;&nbsp;</vddl-placeholder>
          </vddl-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: null,
      lists: {
        A: [
          {
            'id': 1,
            'label': 'Item A1'
          },
          {
            'id': 2,
            'label': 'Item A2'
          },
          {
            'id': 3,
            'label': 'Item A3'
          },
          {
            'id': 4,
            'label': 'Item A4'
          },
          {
            'id': 5,
            'label': 'Item A5'
          }
        ],
        B: [
          {
            'id': 6,
            'label': 'Item B1'
          },
          {
            'id': 7,
            'label': 'Item B2'
          },
          {
            'id': 8,
            'label': 'Item B3'
          },
          {
            'id': 9,
            'label': 'Item B4'
          },
          {
            'id': 10,
            'label': 'Item B5'
          }
        ],
        C: [
          {
            'id': 11,
            'label': 'Item C1'
          },
          {
            'id': 12,
            'label': 'Item C2'
          },
          {
            'id': 13,
            'label': 'Item C3'
          },
          {
            'id': 14,
            'label': 'Item C4'
          },
          {
            'id': 15,
            'label': 'Item C5'
          }
        ]
      }
    }
  },
  methods: {
    selectedEvent: function (item) {
      this.selected = item
    },
    handleDragstart () {
      console.log(':v-draggable: dragstart')
    },
    handleDragend () {
      console.log(':v-draggable: dragend')
    },
    handleCanceled () {
      console.log(':v-draggable: canceled')
    },
    handleInserted (target) {
      console.log(':v-list: inserted', target)
    },
    handleDrop (data) {
      console.log(':v-list: drop')
      console.log(data)
      const { index, list, item } = data
      // change the id
      item.id = new Date().getTime()
      list.splice(index, 0, item)
    },
    handleMoved (item) {
      console.log(':v-draggable: moved')
      console.log(item)
      const { index, list } = item
      list.splice(index, 1)
    },
    handleDragover () {
      console.log(':v-list: handleDragover')
    }
  }
}
</script>

<style lang='scss'>
  .vddl-list, .vddl-draggable {
    position: relative;
  }
  .vddl-placeholder {
    background-color: #eee;
  }
  .container {
    display: flex;
    .box-card {
      width: 25%;
      margin-right: 20px;
      .panel {
        border-radius: 5px;
        border: 1px solid #ddd;
        overflow: hidden;
        .header {
          background-color: #eee;
          line-height: 30px;
          height: 30px;
          font-size: 18px;
          font-weight: bold;
          h3 {
            margin-left: 5px;
          }
        }
        .body {
          .vddl-list {
            min-height: 100px; // 必须设置最小高度，不然当list为空时，数据拖拽不过来
          }
          .body-item {
            height: 28px;
            border-bottom: 1px solid #eee;
            font-size: 14px;
            line-height: 28px;
            padding-left: 5px;
          }
        }
      }
    }
  }
</style>
