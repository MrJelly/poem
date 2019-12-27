import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'


// 引入mixin
import mixins from './mixins'
Vue.mixin(mixins)

const app = new Vue(App)
app.$mount()
