import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$pixel = {
  size: 20,
}

Vue.prototype.$snake = {
  getStyle: (position) => {
    return {
      height: `${Vue.prototype.$pixel.size}px`,
      width: `${Vue.prototype.$pixel.size}px`,
      top: `${position[1] * Vue.prototype.$pixel.size}px`,
      left: `${position[0] * Vue.prototype.$pixel.size}px`
    }
  }
}

new Vue({
  render: h => h(App),
}).$mount('#app')
