<template>
  <div class="pathtracker"></div>
</template>
<style scoped>
.pathtracker {
  display: none;
}
</style>
<script>
export default {
  data() {
    return {
      retryCount: 0,
      tt: null
    }
  },
  computed: {
    currentPath() {
      return this.$route.path
    }
  },
  watch: {
    currentPath(newValue, oldValue) {
      this.setPath(this)
    }
  },
  mounted() {
    this.setPath(this)
  },
  beforeDestroy() {
    if (this.tt != null) {
      clearTimeout(this.tt)
    }
  },
  methods: {
    setPath(__this) {
      if (__this.$store.state.socket.isConnected) {
        const pathAction = {
          action: 'SetPath',
          contents: { path: __this.$route.path }
        }
        __this.$store.dispatch('sendMessage', JSON.stringify(pathAction)).then(
          () => {
            // 发送成功
          },
          (error) => {
            if (error) {
              // 发送失败
            }
          }
        )
      } else {
        __this.tt = setTimeout(function() {
          if (__this.retryCount > 10) {
            return
          }
          __this.setPath(__this)
          __this.retryCount += 1
        }, 1000)
      }
    }
  }
}
</script>
