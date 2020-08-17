import Vue from 'vue'
import App from './App.vue'
import './../node_modules/bulma/css/bulma.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import UUID from "vue-uuid";
import $ from 'jquery'
import { library } from '@fortawesome/fontawesome-svg-core'
import {  faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

library.add(faBars)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
Vue.component('font-awesome-icon', FontAwesomeIcon) 
Vue.use(UUID);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  $,
  store,
  render: h => h(App),
}).$mount('#app')
