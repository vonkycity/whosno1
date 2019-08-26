import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

export default ({ store }, inject) => {
  Vue.use(VueNativeSock, process.env.wsUrl, {
    store,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 3000
  })
}
