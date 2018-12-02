<template>
  <div class="sort">
    <div class="tag-list">
      <el-tag
        :key="color.text"
        v-for="color in colors"
        type="success"
        v-dragging="{ item: color, list: colors, group: 'color' }">
        {{color.text}}
      </el-tag>
    </div>
    <div class="color-box">
      <div
        class="color-item"
        :style="{'background': color.color}"
        v-for="color in colors"
        v-dragging="{ item: color, list: colors, group: 'color' }"
        :key="color.text">
        {{color.text}}
      </div>
    </div>
    <div class="code">
      <pre>
        <code>{{colors}}</code>
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      colors: [
        {
          text: 'Java',
          color: 'red'
        },
        {
          text: 'Javascript',
          color: '#9400D3'
        },
        {
          text: 'PHP',
          color: 'pink'
        },
        {
          text: 'C++',
          color: 'green'
        },
        {
          text: 'C#',
          color: 'yellow'
        },
        {
          text: 'Go',
          color: 'greenyellow'
        },
        {
          text: 'Python',
          color: '#00FF66'
        },
        {
          text: 'VB',
          color: '#FF9966'
        },
        {
          text: 'Node.js',
          color: '#FF6699'
        }
      ]
    }
  },
  mounted () {
    this.$dragging.$on('dragged', ({value}) => {
      console.log(value.item)
      console.log(value.list)
      console.log(value)
    })
  }
}
</script>

<style lang="scss" scoped>
  .sort {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    .tag-list {
      margin-left: 80px;
      display: flex;
      flex-direction: column;
      .el-tag {
        text-align: center;
        width: 100px;
        height: 45px;
        line-height: 40px;
        margin-bottom: 5px;
      }
    }
    .color-box {
      margin-top: 15px;
      margin-left: 100px;
      width: 600px;
      height: 420px;
      div {
        float: left;
        color: #333;
        text-align: center;
        width: 200px;
        height: 140px;
        line-height: 140px;
        box-sizing: border-box;
      }
    }
    .code {
      width: 100px;
      margin-left: 100px;
      pre {
        color: #969696;
        font-size: 12px;
      }
    }
  }
</style>
