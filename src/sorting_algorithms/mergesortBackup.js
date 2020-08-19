function merge_sort(arr, mergeOrder){
    const valueIndexArray=[]
    arr.forEach((el, i) => { valueIndexArray.push([i,el])});
    console.log(valueIndexArray)
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

    while(j <= end){
        if(arr[i] <= arr[j]){
            //pass
            mergeOrder.push([i,j,k,arr[j],true])
            console.log(i, j, "true")
            console.log("-----------------------------------------------")
            i++
        }
        else{
            // mergeOrder.push([i,j,k,subsituteArr[j]])
            const ithEl = arr[i]
            const jthEl = arr[j]
            let subArr = [...arr]
            let newArr = []
            let slicedArrOne;
            let slicedArrTwo
            let slicedArrThree
            console.log(ithEl, jthEl, i , j)
            if(0!==i){
                slicedArrOne = subArr.slice(0,i)
            }
            else{
                slicedArrOne = []
            }
            if(i+2!==j){
                slicedArrTwo = subArr.slice(i+1,j)
            }
            else{
                slicedArrTwo =[]
            }

            slicedArrThree = subArr.splice(j+1, subArr.length)
            console.log([slicedArrOne,slicedArrTwo, slicedArrThree])

            newArr.push(jthEl)
            newArr.push(ithEl)
            newArr=newArr.concat(slicedArrTwo)
            newArr=newArr.concat(slicedArrThree)
            newArr = slicedArrOne.concat(newArr)

            newArr.forEach((el,i)=>{
              arr[i] = el
              })
            console.log(arr)
            i+=1
            console.log(1)
            j+=1
            console.log(j)
            k+=1

            console.log("-----------------------------------------------")
            
        }

    mergeOrder.push(["cycle done"])
}
}


merge_sort([7,4,5,6,9],[])