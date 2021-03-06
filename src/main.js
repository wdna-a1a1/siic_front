import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI, { Message, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import 'element-ui/lib/theme-chalk/display.css'
import './assets/font/font.css'
import '@/styles/index.scss' // global css
import moment from 'moment'
import 'moment/locale/zh-cn'

import App from './App'
import store from './store'
import router from './router'
import ax from '@/utils/axios'
import msg from '@/utils/message'
import qs from 'qs'

import '@/icons' // icon
import '@/permission' // permission control
// ...

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.config.productionTip = false
Vue.prototype.$axios = ax
Vue.prototype.$qs = qs
Vue.prototype.$message = msg
Vue.prototype.$MessageBox = MessageBox
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
