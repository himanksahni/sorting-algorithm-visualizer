import Vuex from 'vuex';
import Vue from 'vue';
import ArrayModule from './modules/array'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        array: ArrayModule,
    }

})
