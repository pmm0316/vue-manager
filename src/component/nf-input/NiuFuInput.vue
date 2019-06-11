<template>
    <div class="input-wrapper" :class="classNames" @mouseover="mouseOver" @mouseout="mouseOut">
      <input :type="type" :value="value" @input="onInput"
             :placeholder="placeholder" @focus="onFocus"
             @blur="onBlur"
             :disabled="disabled"
      />
      <i class="icon el-icon-circle-close" @click="handleClose" v-show="clearIconShow"></i>
      <i class="icon el-icon-view" @click="togglePassword" v-show="passwordIconShow"></i>
    </div>
</template>

<script>
export default {
  name: 'nf-input',
  data () {
    return {
      clearable: false,
      isFocus: false, // input是否聚焦
      isClear: false, // 是否可清除
      showPassword: false, // 默认隐藏密码
      showPasswordIcon: false // 是否是密码框
    }
  },
  props: {
    value: {
      default: ''
    },
    placeholder: {
      default: '请输入内容'
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    classNames () {
      return {
        blue: this.isFocus,
        'is-disabled': this.disabled,
        'have-icon': this.clearIconShow
      }
    },
    clearIconShow () {
      return (this.clearable && this.value !== '' && this.isFocus) ||
        (this.isClear && !this.isFocus)
    },
    passwordIconShow () {
      return this.showPasswordIcon && this.isFocus
    },
    /**
     * 返回input的type值
     */
    type () {
      if (this.showPassword) {
        return 'password'
      } else {
        return 'text'
      }
    }
  },
  methods: {
    onInput (e) {
      this._changeValue(e.target.value)
    },
    /**
     * 改变value值
     * @param val
     * @private
     */
    _changeValue (val) {
      this.$emit('input', val)
    },
    onFocus () {
      this.$emit('focus')
      this.isFocus = true
    },
    onBlur () {
      this.$emit('blur')
      this.isFocus = false
    },
    /**
     * 拿到组件的属性
     * @private
     */
    _initAttrs () {
      if ('clearable' in this.$attrs) {
        this.clearable = true
      }
      if ('show-password' in this.$attrs) {
        this.showPasswordIcon = true
        this.showPassword = true
      }
    },
    handleClose () {
      if (this.value !== '') {
        this._changeValue('')
      }
    },
    mouseOver () {
      if (!this.isClear && this.clearable) {
        this.isClear = true
      }
    },
    mouseOut () {
      if (this.isClear && this.clearable) {
        this.isClear = false
      }
    },
    togglePassword () {
      this.showPassword = !this.showPassword
    }
  },
  created () {
    this._initAttrs()
  }
}
</script>

<style scoped lang="scss">
  .input-wrapper {
    width: 180px;
    position: relative;
    border-radius: 5px;
    border: 1px solid #dcdfe6;
    display: inline-block;
    padding: 8px 15px;
    input {
      border: none;
      outline: none;
    }
    .icon {
      position: absolute;
      bottom: 27.5%;
      right: 6px;
    }
  }
  .blue {
    border-color: deepskyblue;
  }
  .is-disabled {
    background-color: rgb(235, 235, 228);
  }
  .have-icon input {
    margin-right: 10px;
  }
</style>
