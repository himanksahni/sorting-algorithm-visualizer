function merge_sort(arr, mergeOrder){
    mergeRecur(0, arr.length -1,  arr, mergeOrder)
}

function mergeRecur(start, end, array, mergeOrder) {
    if(start === end){
        return
    } 
    const mid = Math.floor((start+end)/2)
    mergeRecur(start, mid, array, mergeOrder)
    mergeRecur(mid +1, end, array, mergeOrder)
    merge(start, mid, end, array, mergeOrder)
}

function merge(start,mid, end, arr, mergeOrder){
    let i = start
    let j = mid+1
    let k = start

    while(i<=end && j <= end && i<j){
        if(arr[i] <= arr[j]){
            mergeOrder.push([i,j,k,true])
            i++
        }
        else{
            const ithEl = arr[i]
            const jthEl = arr[j]
            let subArr = [...arr]
            let newArr = []
            let slicedArrOne;
            let slicedArrTwo
            let slicedArrThree
            if(0!==i){
                slicedArrOne = subArr.slice(0,i)
            }
            else{
                slicedArrOne = []
            }
            if(i+1!==j){
                slicedArrTwo = subArr.slice(i+1,j)
            }
            else{
                slicedArrTwo =[]
            }

            slicedArrThree = subArr.splice(j+1, subArr.length)

            newArr.push(jthEl)
            newArr.push(ithEl)
            newArr=newArr.concat(slicedArrTwo)
            newArr=newArr.concat(slicedArrThree)
            newArr = slicedArrOne.concat(newArr)

            newArr.forEach((el,i)=>{
              arr[i] = el
              })

            mergeOrder.push([i,j,k,[...arr],false])
            i+=1
            j+=1
            k+=1
            // mergeOrder.push([i,j,k,[...arr],false])
            
        }

    mergeOrder.push(["cycle done"])
}
}
export default merge_sort;