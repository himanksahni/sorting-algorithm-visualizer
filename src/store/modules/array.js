import mergeSort from '../../sorting_algorithms/mergesort'
import insertionSort from '../../sorting_algorithms/insertion_sort'
import bubbleSort from '../../sorting_algorithms/bubble_sort'
// import $ from 'jquery'
export default {
    namespaced: true,
    state: {
        array:[],
        width: 45,
        sliderValue:1,
        mergeOrder:[[1,2]],
        insertionOrder:[[1,2]],
        bubbleOrder:[[1,2]],
        sorted: false,
        checkGreen: false,
        checkRed: false,
        colorChanged:[],
        showValue: true
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
        bubble_sort({commit, state}){
            const newArr = [...state.array]
            const bubbleOrder = state.bubbleOrder
            bubbleSort(newArr, bubbleOrder)

            let i = 0
            for(i; i < bubbleOrder.length; i++){

                const indxBarOne = bubbleOrder[i][0]
                const indxBarTwo = bubbleOrder[i][1]
                if(!bubbleOrder[i][2]){
                    const heightBarOne = bubbleOrder[i][3]
                    const heightBarTwo = bubbleOrder[i][4]
                    commit('changeValue',{
                        indxBarOne,
                        indxBarTwo,
                        heightBarOne,
                        heightBarTwo
                })
                }

            }
        },
        insertion_and_bubble_sort({commit,state}, algo){          
            const newArr = [...state.array]
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
            // const bars = $('.bars')
            let i = 1
            let j = 1
            let completedCount = 1
            for(i; i < sortOrder.length; i++){
                // const barOne = bars[sortOrder[i][0]]
                // const barTwo = bars[sortOrder[i][1]]
                let heightBarOne = -1
                let heightBarTwo = -1
                const indxBarOne = sortOrder[i][0]
                const indxBarTwo = sortOrder[i][1]
                if(!sortOrder[i][2]){
                    heightBarOne = sortOrder[i][3]
                    heightBarTwo = sortOrder[i][4]
                }
                setTimeout(()=>{
                    // $(barOne).css("background-color","#ffb3ba")
                    // $(barTwo).css("background-color","#ffb3ba")
                    commit('changeBarColor', {
                            value:"comparing",
                            barIndx:[indxBarOne, indxBarTwo]
                    })
                },100*j)

                j++
                setTimeout(()=>{
                    if(heightBarTwo != -1){
                        commit('changeValue',{
                            indxBarOne,
                            indxBarTwo,
                            heightBarOne,
                            heightBarTwo
                    })}
                    // $(barOne).css("background-color","#baffc9")
                    // $(barTwo).css("background-color","#baffc9")
                    commit('changeBarColor', {
                        value:"compSorted",
                        barIndx:[indxBarOne, indxBarTwo]
                        })
                  },
                100*j)

                j++
                setTimeout(()=>{
                    completedCount++
                    // $(barOne).css("background-color","gray")
                    // $(barTwo).css("background-color","gray")
                    commit('changeBarColor', {
                        value:"sorting",
                        barInx:[]
                    })
                    console.log(completedCount, sortOrder.length)
                    if(completedCount===sortOrder.length){
                        commit('changeBarColor', {
                            value:"arraySorted",
                            barInx:[]
                    })
                    }
                  },
                100*j)
    
                j++

            }
        }

    },

    mutations: {

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
                state.sorted = !state.sorted
                state.colorChanged = barIndx
            }
            else{
                state.checkGreen = false
                state.checkRed = false
                state.colorChanged = barIndx
            }

        },
        changeValue(state, payload){
            let newArr = [...state.array]
            newArr[payload.indxBarOne] = payload.heightBarOne
            newArr[payload.indxBarTwo] = payload.heightBarTwo
            state.array = newArr
        
        },


        changeArray (state, {sliderValue}){
            const value = parseInt(sliderValue)
            state.array = []
            for(let i=1; i< value +1; i++ ){
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
            state.insertionOrder =[[1,2]]
            state.bubbleOrder =[[1,2]]
            state.sorted = false
        },

        ADD_EL(state, payload){
            state.array.push(payload)
        },

        merge_arr(state, payload){
            state.mergeOrder = payload.mergeOrder
            // state.array = payload.newArr
            // state.array = arr
        },

        insertion_arr(state, payload){
            console.log(payload.insertionOrder)
            state.insertionOrder = payload.insertionOrder

        }
        

    }

}