function bubbleSort(arr, bubbleOrder){
    let i = 0
    for(i; i< arr.length; i++){
        let j = 0
        for(j; j < (arr.length - i) -1; j++){
            if(arr[j] >= arr[j+1]){
                bubbleOrder.push([j, j+1,false, arr[j+1], arr[j]])
                const jthEl = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = jthEl
            }
            else{
                bubbleOrder.push([j, j+1,true])
            }
        }
    }
}

export default bubbleSort