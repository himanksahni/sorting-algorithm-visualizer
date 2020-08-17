import quickSort from '../../sorting_algorithms/quick_sort'
import store from '../../store'

export default {
    namespaced: true,
    state: {
        quickOrder:[],
        quickRed:false,
        quickVoilet:false,
        quickGreen:false,
        quickRedChanged:[],
        quickVoiletChanged:[],
        quickGreenChanged:[],
        quickIPosition:-1,
        seperator:[]
    },
    getters:{

    },
    actions:{
        quick_sort({commit, state}){
            const newArr = [...store.state.array.array]
            const quickOrder = state.quickOrder
            quickSort(newArr,0,newArr.length -1, quickOrder)
            console.log(quickOrder)

            let j=1
            let completedCount = 0
            console.log(quickOrder.length)
            for(let i =0; i< quickOrder.length; i++){
                    const pivotIndox = quickOrder[i][0]
                    const lastIndx = quickOrder[i].length -1
                    if(quickOrder[i][lastIndx]==="setting pivot"){
                        setTimeout(()=>{
                            completedCount++
                            // console.log("setting pivot")
                            commit('changeBarColorQuick', {
                                value:"pivot",
                                barIndx:[pivotIndox]
                        })
                        }, 10*j) 
                    j++}
                    else if(quickOrder[i][lastIndx]==="checking"){
                        const indxBarOne = quickOrder[i][0]
                        const indxBarTwo = quickOrder[i][2]
                        const heightBarOne = quickOrder[i][1]
                        const heightBarTwo = quickOrder[i][3]
                        if(heightBarOne === -1){
                            setTimeout(()=>{
                                completedCount++
                                // console.log("in checking")
                                commit('changeBarColorQuick', {
                                    value:"checking",
                                    barIndx:[indxBarOne,indxBarTwo]
                            })
                            }, 10*j)
                        j++
                        }
                        else if(heightBarOne!==-1){
                            if(indxBarOne!=indxBarTwo){
                                setTimeout(()=>{
                                    completedCount++
                                    commit('changeBarColorQuick',{
                                        value:'wrong-position',
                                        barIndx:[indxBarTwo]
    
                                    })
                                }, 10*j)
                                j++

                                setTimeout(()=>{
                                    store.commit('array/changeValueAfterSortStep',{
                                        indxBarOne,
                                        indxBarTwo,
                                        heightBarOne,
                                        heightBarTwo
                                    })
                                    commit('changeBarColorQuick',{
                                        value:'correct-position',
                                        barIndx:[indxBarOne,indxBarTwo]
    
                                    })
                                }, 10*j)
                                j++
                            }

                            else{
                                setTimeout(()=>{
                                    completedCount++
                                    commit('changeBarColorQuick',{
                                        value:'checking-height',
                                        barIndx:[indxBarOne,indxBarTwo]
    
                                    })
                                }, 10*j)
                                j++
                            }

                        }    
                    }
                    else if(quickOrder[i][lastIndx]==="partition-done"){
                        const indxBarOne = quickOrder[i][0]
                        const indxBarTwo = quickOrder[i][2]
                        const heightBarOne = quickOrder[i][1]
                        const heightBarTwo = quickOrder[i][3]
                        setTimeout(()=>{
                            completedCount++
                            // console.log('partition-done')
                            console.log(completedCount)
                            store.commit('array/changeValueAfterSortStep',{
                                indxBarOne,
                                indxBarTwo,
                                heightBarOne,
                                heightBarTwo
                            })

                            commit('changeBarColorQuick', {
                                value:'partition-done',
                                barIndx:[indxBarOne]
                            })
                            if(completedCount===quickOrder.length){
                                store.commit('array/arraySorted')
                                commit('changeBarColorQuick', {
                                    value:"arraySorted",
                                    barInx:[]
                            })
                            }
                        }, 10*j) 
                    j++}      
            }
        },
    },

    mutations:{
        changeBarColorQuick(state, {value, barIndx}){
            if(value==="pivot"){
                state.quickVoilet = true 
                state.quickVoiletChanged = barIndx
            }
            else if(value==="wrong-position"){
                state.quickRed = true 
                state.quickRedChanged = barIndx
                state.quickGreen= false,
                state.quickGreenChanged=[]
            }

            else if(value==="correct-position"){
                state.quickRed = false 
                state.quickRedChanged = []
                state.quickGreen = true 
                state.quickGreenChanged = barIndx
                state.quickIPosition = barIndx[0]+1
            }
            else if(value==="checking"){
                state.quickGreen = true 
                state.quickGreenChanged = [barIndx[1]]
                state.quickIPosition = barIndx[0]
            }
            else if(value==='checking-height'){
                state.quickIPosition = barIndx[0]
                state.quickGreen = true 
                state.quickGreenChanged = [barIndx[1]]
            }
            else if(value==='partition-done'){
                // console.log("in pd mutation")
                state.quickVoilet = false
                state.quickGreen = false
                state.quickIPosition= -1
                state.quickRed= false
                state.quickRedChanged = []
                state.quickGreenChanged = []
                state.quickVoiletChanged = []
                state.seperator.push(barIndx[0])
            }
            else if(value==='arraySorted'){
                state.quickOrder = []
                state.quickRed = false
                state.quickVoilet =false
                state.quickGreen = false
                state.quickRedChanged = []
                state.quickVoiletChanged = []
                state.quickGreenChanged = []
                state.quickIPosition = -1
                state.seperator = []

            }
        },
        changeIposition(state, {indxBarOne}){
            state.quickIPosition = indxBarOne
        }
    }

}