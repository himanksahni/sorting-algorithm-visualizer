function mergeSort(arr, mergeOrder){
    const subsituteArr = [...arr]
    const valueIndexArray=[]
    arr.forEach((el, i) => { valueIndexArray.push([i,el])});
    mergeRecur(0, arr.length -1,  arr, subsituteArr, mergeOrder)
}

function mergeRecur(start, end, array, subsituteArr, mergeOrder) {
    if(start === end){
        return
    } 
    const mid = Math.floor((start+end)/2)
    mergeRecur(start, mid, subsituteArr, array, mergeOrder)
    mergeRecur(mid +1, end, subsituteArr, array, mergeOrder)
    merge(start, mid, end, array, subsituteArr, mergeOrder)
}

function merge(start,mid, end, arr, subsituteArr, mergeOrder){
    let i = start
    let j = mid+1
    let k = start

    while(i <= mid && j <= end){
        if(subsituteArr[i] <= subsituteArr[j]){
            mergeOrder.push([i,j,k,subsituteArr[i] ])
            // mergeOrder.push([i,j,k,subsituteArr[i]])
            arr[k++] = subsituteArr[i++]
        }
        else{
            mergeOrder.push([i,j,k,subsituteArr[j]])
            arr[k++] = subsituteArr[j++]
        }

    }
    while(i <= mid){
        mergeOrder.push([i,i,k,subsituteArr[i]])
        arr[k++] = subsituteArr[i++]
    }

    while(j <= end){
        mergeOrder.push([j,j,k,subsituteArr[j]])
        arr[k++] = subsituteArr[j++]
    }
}   


export default mergeSort;