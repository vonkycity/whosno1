<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        whosno1
      </h1>
      <button @click="changeMsg">click me</button>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  created() {},
  mounted() {
    // const _this = this
    this.$eventbus.$on('SocketConnectionChange', (status) => {
      // alert(status)
      // eslint-disable-next-line
      // console.log(_this.$store)
      // eslint-disable-next-line
      // console.log(this.$store)
      const act = {
        action: 'test'
      }
      this.$store.dispatch('sendMessage', JSON.stringify(act)).then(
        () => {
          // 发送成功
          alert('ok')
        },
        (error) => {
          if (error) {
            // 发送失败
          }
        }
      )
    })
    this.$eventbus.$on('messageSent', (message) => {
      alert('rec')
    })
  },
  beforeDestroy() {
    this.$eventbus.$off('messageSent', {})
  },
  methods: {
    changeMsg: () => {
      this.$eventbus.$emit('messageSent', 'hello nihao~~~~~~')
      // eslint-disable-next-line
      console.log(this.$eventbus)
      alert('sent')
    },
    test: () => {
      // eslint-disable-next-line
      console.log(this.$eventbus)
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
