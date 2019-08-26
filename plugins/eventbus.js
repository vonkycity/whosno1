import Vue from 'vue'

export default ({ app }, inject) => {
  const eventbus = new Vue()
  // app.eventbus = eventbus
  inject('eventbus', eventbus)
}
