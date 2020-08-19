import heapSort from '../../sorting_algorithms/heap_sort'
import store from '../../store'

export default {
    namespaced:true,
    state:{
        heapOrder:[],
        heapGreen:false,
        heapRed: false,
        heapRedChanged:[],
        heapGreenChanged:[]
    },
    
    getters:{

    },


    actions:{
        heap_sorted({commit}){
            store.commit('array/arraySorted')
            store.commit('array/switchDisabled')
            commit('changeBarColorHeap', {
                value:'completed',
                barIndx: []
                })

        },
        heap_sort({ commit, state, dispatch}){
            const arr = [...store.state.array.array]
            if(arr.length===1){
                dispatch('heap_sorted')
            }
            heapSort(arr, state.heapOrder)

            let j=1
            let completedCount = 0
            const speed = store.state.array.speed
            for(let i =0; i< state.heapOrder.length;i++){
                const lastElIndx = state.heapOrder[i].length -1
                let lastEl = state.heapOrder[i][lastElIndx]
                const indxBarOne = state.heapOrder[i][0]
                const indxBarTwo = state.heapOrder[i][2]
                const heightBarOne = state.heapOrder[i][1]
                const heightBarTwo = state.heapOrder[i][3]

                if(!lastEl){
                    const lc = state.heapOrder[i][4]
                    const rc = state.heapOrder[i][5]
                    setTimeout(()=>{
                        completedCount++
                        commit('changeBarColorHeap', {
                            value:'wrong',
                            barIndx:[indxBarOne, lc, rc]
                        })
                    },speed*j)
                    j++

                    setTimeout(()=>{
                        store.commit('array/changeValueAfterSortStep',{
                                        indxBarOne,
                                        indxBarTwo,
                                        heightBarOne,
                                        heightBarTwo
                                    })

                    },speed*j)
                    j++

                    setTimeout(()=>{
                        commit('changeBarColorHeap', {
                            value:'correct',
                            barIndx:[indxBarOne, indxBarTwo]
                        })

                        if(completedCount == state.heapOrder.length){
                            dispatch('heap_sorted')
                        }
                    },speed*j)
                    j++
                    
                }

                else if(lastEl === 'swapping last and first'){
                    setTimeout(()=>{
                        completedCount++
                        commit('changeBarColorHeap', {
                            value:'wrong',
                            barIndx:[indxBarOne, indxBarTwo]
                        })
                    },speed*j)
                    j++

                    setTimeout(()=>{
                        store.commit('array/changeValueAfterSortStep',{
                                        indxBarOne,
                                        indxBarTwo,
                                        heightBarOne,
                                        heightBarTwo
                                    })

                    },speed*j)
                    j++

                    setTimeout(()=>{
                        commit('changeBarColorHeap', {
                            value:'correct',
                            barIndx:[indxBarOne, indxBarTwo]
                        })

                        if(completedCount == state.heapOrder.length){
                            dispatch('heap_sorted')
                        }

                    },speed*j)
                    j++

                }

                else if(lastEl){
                    const lc = state.heapOrder[i][2]
                    const rc = state.heapOrder[i][3]
                    if(lc < state.heapOrder.length && rc < state.heapOrder.length){
                        setTimeout(()=>{
                            completedCount++
                            commit('changeBarColorHeap', {
                                value:'correct',
                                barIndx:[indxBarOne, lc, rc]
                            })
                            if(completedCount == state.heapOrder.length){
                                dispatch('heap_sorted')
                            }
                        },speed*j)
                        j++
                    }
                    else{
                        setTimeout(()=>{
                            completedCount++
                            commit('changeBarColorHeap', {
                                value:'correct',
                                barIndx:[indxBarOne]
                            })
                            if(completedCount == state.heapOrder.length){
                                dispatch('heap_sorted')
                            }
                        },speed*j)
                        j++
                    }
                }
            }


        },

    },

    mutations:{
        changeBarColorHeap(state,{ value, barIndx}){

            if(value==='wrong'){
                state.heapGreen = false
                state.heapGreenChanged = []
                state.heapRed = true
                state.heapRedChanged = barIndx
            }

            else if(value==='correct'){
                state.heapRed = false
                state.heapRedChanged = []
                state.heapGreen = true
                state.heapGreenChanged = barIndx
            }

            else if(value=='completed'){
                state.heapOrder = []
                state.heapRed = false
                state.heapRedChanged = []
                state.heapGreen = false
                state.heapGreenChanged = []
            }

        }


    }


}