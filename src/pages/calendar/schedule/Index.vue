<template>
  <div class="schedule" id="schedule">
    <div class="tableBox1">
      <table class="bgTable">
        <thead>
          <tr>
            <!--星期名字：周日~周六-->
            <th v-for="name in weekNames" :key="name">{{name}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in theWeek()" :key="index">
            <td v-for="(item, index2) in week"
                :key="index2"
                :class="{gray: item.prevMonth || item.nextMonth}">
              {{item.day}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tableBox2">
      <div class="row">
        <table class="scheduleTable">
          <tr>
            <td colspan="3"><div class="s life">吃饭</div></td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <!--<td>5</td>-->
            <!--<td>6</td>-->
            <!--<td>7</td>-->
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      weekNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      dayArr: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      events: [
        [{}]
      ]
    }
  },
  methods: {
    theWeek: function () {
      let _arr = []
      for (let i = 0; i < this.dayArr.length / 7; i++) {
        let week = []
        for (let j = 0; j < 7; j++) {
          week.push(this.dayArr[i * 7 + j])
        }
        _arr.push(week)
      }
      return _arr
    },
    initSchedule () {
      let dayArr = []
      // 本月第一天是星期几
      let monthFirstDatyWhatWeek = new Date(this.year, this.month - 1, 1).getDay()
      // 下一个月的year
      // let y = this.month === 12 ? this.year + 1 : this.year
      // let m = this.month === 12 ? 1 : this.month
      // 上个月的year 和 month
      let year1 = this.month === 1 ? this.year - 1 : this.year
      let month1 = this.month === 1 ? 12 : this.month - 1
      // 当前月总共几天
      let currentMonthDays = new Date(new Date(this.year, this.month, 0)).getDate()
      // 上个月总共几天
      let prevMonthDays = new Date(new Date(year1, month1, 0)).getDate()
      while (monthFirstDatyWhatWeek-- > 0) {
        dayArr.unshift({
          day: prevMonthDays--,
          prevMonth: true
        })
      }
      // let count = 1
      // while (currentMonthDays-- > 0) {
      //   dayArr.push({
      //     day: count++
      //   })
      // }
      // 把当前月的日期依次存入数组中
      for (let i = 1; i <= currentMonthDays; i++) {
        dayArr.push({
          day: i
        })
      }
      let count2 = 1
      /**
       * 存在两种情况
       * 1.月初第一天是在周六时，总共要循环6行，42个数字
       * 2.其他情况。循环5行，35个数字
       */
      if (dayArr.length < 35) {
        while (dayArr.length < 35) {
          dayArr.push({
            day: count2++,
            nextMonth: true
          })
        }
      } else {
        while (dayArr.length < 42) {
          dayArr.push({
            day: count2++,
            nextMonth: true
          })
        }
      }
      this.dayArr = dayArr
      console.log(this.dayArr)
    }
  },
  mounted () {
    this.initSchedule()
  }
}
</script>

<style scoped lang='scss'>
@import "./index.less";
</style>
