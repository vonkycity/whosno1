import Vue from 'vue'

export const state = () => ({
  indexState: 'index store state',
  socket: {
    isConnected: false,
    reconnectError: false
  },
  messageQueue: []
})

export const mutations = {
  addMessageToQueue(state, v) {
    state.messageQueue.push(v)
  },
  clearMessageQueue(state) {
    // state.messageQueue = []
    state.messageQueue.splice(0, state.messageQueue.length)
  },
  SOCKET_ONOPEN(state, event) {
    Vue.prototype.$socket = event.currentTarget
    state.socket.isConnected = true
    this.$eventbus.$emit('SocketConnectionChange', 1)
    for (let i = 0; i < state.messageQueue.length; i++) {
      Vue.prototype.$socket.send(state.messageQueue[i])
    }
    this.commit('clearMessageQueue')
  },
  SOCKET_ONCLOSE(state, event) {
    state.socket.isConnected = false
  },
  SOCKET_ONMESSAGE(state, event) {
    // do something
    this.$eventbus.$emit('ReceiveMessage', event.data)
  },
  SOCKET_ONRECONNECT(state, event) {
    // do something
    this.$eventbus.$emit('SocketConnectionChange', 2)
  },
  SOCKET_ONRECONNECT_ERROR(state) {
    state.socket.reconnectError = true
    this.$eventbus.$emit('SocketConnectionChange', -1)
  }
}
export const actions = {
  sendMessage(context, message) {
    /*
    if (context.state.socket.isConnected) {
      Vue.prototype.$socket.send(message)
    } else {
      context.commit('addMessageToQueue', message)
    }
    */
    return new Promise((resolve, reject) => {
      if (context.state.socket.isConnected) {
        Vue.prototype.$socket.send(message)
      } else {
        context.commit('addMessageToQueue', message)
      }
      resolve()
    })
  }
}
