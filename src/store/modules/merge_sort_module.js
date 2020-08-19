import merge_sort from '../../sorting_algorithms/merge_sort'
import store from '../../store'

export default {
    namespaced: true,

    state:{
        mergeOrder:[],
        mergeRed:true,
        mergeGreen:true,
        mergeRedChanged:[],
        mergeGreenChanged:[]

    },

    getters:{

    },

    actions:{
        merge_sort({commit,state}){
            const arr = [...store.state.array.array]
            const mergeOrder = state.mergeOrder

            if(arr.length===1){
                store.commit('array/arraySorted')
                store.commit('array/switchDisabled')
                commit('changeBarColorMerge', {
                    value:"arraySorted",
                    barInx:[]
            })
            }

            merge_sort(arr, mergeOrder)

            let j=1
            let completedCount = 0
            const speed = store.state.array.speed
            for(let i=0; i< mergeOrder.length;i++){
                const lastElIndx = state.mergeOrder[i].length -1
                let lastEl = state.mergeOrder[i][lastElIndx]
                const indxBarOne = mergeOrder[i][0]
                const indxBarTwo = mergeOrder[i][1]

                if(lastEl){
                    setTimeout(()=>{
                        completedCount++
                        commit('changeBarColorMerge',{
                            value:'correct-position',
                            barIndx:[indxBarOne, indxBarTwo]
                        })
                        if(completedCount===mergeOrder.length){
                            store.commit('array/arraySorted')
                            store.commit('array/switchDisabled')
                            commit('changeBarColorMerge', {
                                value:"arraySorted",
                                barInx:[]
                        })
                        }
                    },speed*j)
                    j++
                }
                else{
                    const indxToSwapOn = mergeOrder[i][2]
                    const newArr = mergeOrder[i][3]
                    setTimeout(()=>{
                        completedCount++
                        commit('changeBarColorMerge',{
                            value:'wrong-position',
                            barIndx:[indxBarOne, indxBarTwo]
                        })
                    },speed*j)
                    j++
                    
                    setTimeout(()=>{
                        store.commit('array/merge_sort_helper',{
                            newArr
                        })
                        commit('changeBarColorMerge',{
                            value:'correct-position',
                            barIndx:[indxBarTwo, indxToSwapOn]
                        })

                        if(completedCount===mergeOrder.length){
                            store.commit('array/arraySorted')
                            store.commit('array/switchDisabled')
                            commit('changeBarColorMerge', {
                                value:"arraySorted",
                                barInx:[]
                        })
                        }

                    },speed*j)
                    j++
                }
            }
        }

    },

    mutations:{
        changeBarColorMerge(state,{ value, barIndx}){
            if(value==='correct-position'){
                state.mergeRed=false
                state.mergeRedChanged=[]
                state.mergeGreen = true
                state.mergeGreenChanged = barIndx
            }

            else if(value==='wrong-position'){
                state.mergeGreen=false
                state.mergeGreenChanged=[]
                state.mergeRed = true
                state.mergeRedChanged = barIndx
            }

            else if(value==='arraySorted'){
                state.mergeOrder=[]
                state.mergeGreen =false
                state.mergeGreenChanged=[]
                state.mergeRed=false
                state.mergeRedChanged=[]

            }
    
    
        }

    }

}