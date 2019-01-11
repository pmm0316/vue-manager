<template>
    <div class="span-item">
      <div class="iconfont-wrapper">
        <i class="iconfont" :class="item.className"></i>
      </div>
      <p class="text-bottom">{{item.title}}</p>
    </div>
</template>

<script>
export default {
  name: 'ChartTypeItem',
  props: ['item']
}
</script>

<style scoped lang='scss'>
  .span-item {
    display: block;
    width: 70px;
    height: 60px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 2px;
    box-shadow: 0 0 3px #ccc;
    cursor: pointer;
    .iconfont-wrapper {
      width: 80px;
      height: 40px;
      position: relative;
      .iconfont {
        position: absolute;
        left: 10px;
        top: -20px;
        font-size: 45px;
        color: #555;
      }
    }
    p {
      font-size: 12px;
      color: #555;
    }
  }

</style>
