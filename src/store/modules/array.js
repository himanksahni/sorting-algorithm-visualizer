import mergeSort from '../../sorting_algorithms/mergesort'
import store from '../../store'

export default {
    namespaced: true,
    state: {
        array:[],
        width: 45,
        sliderValue:1,
        mergeOrder:[[1,2]],
        showValue: true,
        sorted:false,
        speed: 500

    },

    getters: {
        getArray: state => state.array
    },


    actions: {
        addFirstElement({commit}) {
            const el = Math.floor(Math.random() * 200)
            commit('ADD_EL',el)

        },
        merge_sort({commit,state}){          
            const newArr = [...state.array]
            const mergeOrder = state.mergeOrder
            mergeSort(newArr, mergeOrder)
            commit('merge_arr', {
                mergeOrder,
                newArr
            })
        },

    },

    mutations: {
        merge_sort_helper(state, {newArr}){
            state.array = newArr
    
        },
        changeSpeed(state, {speed}){
            state.speed = 500/parseInt(speed)
        },
        arraySorted(state){
            state.sorted = true
        },
        changeValueAfterSortStep(state, payload){
            let newArr = [...store.state.array.array]
            newArr[payload.indxBarOne] = payload.heightBarOne
            newArr[payload.indxBarTwo] = payload.heightBarTwo
            state.array = newArr
        },

        changeArray (state, {sliderValue}){
            const value = parseInt(sliderValue)
            state.array = []
            for(let i=1; i< value + 1; i++ ){
                state.array.push(Math.floor(Math.random() * 200) + 1 )
            }
            state.array.length>110 && state.array.length<=200 ? state.width=2:
            state.array.length>72 && state.array.length<=110 ? state.width=4:            state.array.length>100 && state.array.length<=120 ? state.width=3:
            state.array.length>55 && state.array.length<=75 ? state.width=8:
            state.array.length>35 && state.array.length<=55 ? state.width=12:
            state.array.length>25 && state.array.length<=35 ? state.width=20:
            state.array.length>15 && state.array.length<=25 ? state.width=30:
            state.array.length>5 && state.array.length<=15 ? state.width=50:
            state.array.length>0 && state.array.length<=10 ? state.width=80 : state.width = 80

            state.width <= 30 ? state.showValue = false: state.showValue = true 
        
            state.mergeOrder =[[1,2]]
            store.commit('insertBubble/changeSortArray')
            state.sorted = false
        },

        ADD_EL(state, payload){
            state.array.push(payload)
        },

        merge_arr(state, payload){
            state.mergeOrder = payload.mergeOrder

        },    
    }

}