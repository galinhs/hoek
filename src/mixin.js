// 每一個元件都會用到的 function 拉出來寫
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
