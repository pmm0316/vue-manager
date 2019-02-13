<script>
export default {
  name: 'MyTitle',
  props: {
    level: {
      default: 1
    }
  },
  render (h) {
    return h(
      `h${this.level}`,
      {
        class: {
          title: true,
          title2: true
        }
      },
      this.$slots.default
    )
  }
}
</script>
