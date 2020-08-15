function insertionSort(arr, insertionOrder){
    for(let i = 1; i < arr.length; i++){
        const key = arr[i]
        let j = i-1
        let k = i
        let count = 1
        if(j>=0 && arr[j] < key){
            insertionOrder.push([j,i, true])
        }
        while(j >= 0 && arr[j] > key){
            if(count === 1){
                insertionOrder.push([j,i,false,key,arr[j]])
                count--
            }
            else{
                insertionOrder.push([j,k,false,key,arr[j]])
            }
            arr[j+1] = arr[j]
            j--
            k--
    }
        arr[j+1] = key
}
    return arr
}

export default insertionSort