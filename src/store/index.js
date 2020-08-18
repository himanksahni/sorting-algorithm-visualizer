import Vuex from 'vuex';
import Vue from 'vue';
import ArrayModule from './modules/array'
import InsertBubbleModule from './modules/insert_bubble_module'
import QuickModule from './modules/quick_sort_module'
import HeapModule from './modules/heap_sort_module'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        array: ArrayModule,
        insertBubble: InsertBubbleModule,
        quick: QuickModule,
        heap: HeapModule
    }

})
