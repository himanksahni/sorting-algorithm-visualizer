function quickSort(arr, start, end, quickOrder){
    // console.log(quickOrder)
    if(start < end){
        const q = partition(arr,start, end, quickOrder)
        // console.log(arr.slice(start,q), arr.slice(q+1,end))
        // console.log("---------------------------")
        quickSort(arr, start, q-1, quickOrder)
        quickSort(arr,q+1, end, quickOrder)
    }
}
function partition(arr, start, end, quickOrder){
    let i = start
    let j = start
    const pivot = arr[end]
    quickOrder.push([end, pivot, "setting pivot"])
    for(j; j<end; j++){
        if(arr[j] < pivot){
            const smallerEl = arr[j]
            arr[j] = arr[i]
            arr[i] = smallerEl
            addInQuickOrder(arr,i, j, quickOrder, smallerEl)
            i++
        }
        else{
            addInQuickOrder(arr,i, j, quickOrder, - 1)
        }
    }
    arr[end] = arr[i]
    const endVal = arr[i]
    arr[i] = pivot
    quickOrder.push([i,pivot, end, endVal,"partition-done"])
    // console.log(arr)
    return i
}

function addInQuickOrder(arr, i, j, quickOrder, iVal){
    let orderEl = []
    orderEl.push(i)
    // iVal===-1? orderEl.push(arr[i]): orderEl.push(iVal)
    orderEl.push(iVal)
    orderEl.push(j)
    orderEl.push(arr[j])
    orderEl.push("checking")

    quickOrder.push(orderEl)
}

export default quickSort