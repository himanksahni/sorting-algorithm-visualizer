import insertionSort from '../../sorting_algorithms/insertion_sort'
import bubbleSort from '../../sorting_algorithms/bubble_sort'
import store from '../../store'

export default {
    namespaced: true,
    state: {
        insertionOrder:[[1,2]],
        bubbleOrder:[[1,2]],
        checkGreen: false,
        checkRed: false,
        colorChanged:[],
    },
    getters:{

    },
    actions:{

        insertion_and_bubble_sort({commit,state}, algo){          
            const newArr = [...store.state.array.array]
            let sortOrder = []
            if(algo === "insertion"){
                const insertionOrder = state.insertionOrder
                insertionSort(newArr, insertionOrder)
                sortOrder = insertionOrder
            }
            else{
                const bubbleOrder = state.bubbleOrder
                bubbleSort(newArr, bubbleOrder)
                sortOrder = bubbleOrder
            }
            let i = 1
            let j = 1
            let completedCount = 1
            const speed = store.state.array.speed
            for(i; i < sortOrder.length; i++){
                let heightBarOne = -1
                let heightBarTwo = -1
                const indxBarOne = sortOrder[i][0]
                const indxBarTwo = sortOrder[i][1]
                if(!sortOrder[i][2]){
                    heightBarOne = sortOrder[i][3]
                    heightBarTwo = sortOrder[i][4]
                }
                if(!sortOrder[i][2]){
                    setTimeout(()=>{
                        commit('changeBarColor', {
                                value:"comparing",
                                barIndx:[indxBarOne, indxBarTwo]
                        })
                    },speed*j)

                j++}
                setTimeout(()=>{
                    if(heightBarTwo != -1){
                        store.commit('array/changeValueAfterSortStep',{
                            indxBarOne,
                            indxBarTwo,
                            heightBarOne,
                            heightBarTwo
                        })
                }
                    commit('changeBarColor', {
                        value:"compSorted",
                        barIndx:[indxBarOne, indxBarTwo]
                        })
                  },
                speed*j)

                j++
                setTimeout(()=>{
                    completedCount++
                    commit('changeBarColor', {
                        value:"sorting",
                        barInx:[]
                    })
                    if(completedCount===sortOrder.length){
                        commit('changeBarColor', {
                            value:"arraySorted",
                            barInx:[]
                    })
                    }
                  },
                speed*j)
                j++

            }
        }

    },

    mutations:{
        changeSortArray(state){
           state.insertionOrder=[[1,2]] 
           state.bubbleOrder=[[1,2]]
        },
        changeBarColor(state, { value, barIndx }){
            if(value==="comparing"){
                state.checkRed = !state.checkRed 
                state.colorChanged = barIndx
            }
            else if(value=="compSorted"){
                state.checkRed = false
                state.checkGreen = !state.checkGreen
                state.colorChanged = barIndx
            }
            else if(value==="arraySorted"){
                store.commit('array/arraySorted')
                state.colorChanged = barIndx

                ///////////////////////////
                state.insertionOrder=[[1,2]] 
                state.bubbleOrder=[[1,2]]

            }
            else{
                state.checkGreen = false
                state.checkRed = false
                state.colorChanged = barIndx
            }

        },
    }

}