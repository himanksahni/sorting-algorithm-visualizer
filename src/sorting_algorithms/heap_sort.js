// function PARENT(i){
//     i = Math.ceil(Math.floor(i/2))
//     return i-1
// }

function LEFT_CHILD(i){
    return 2*i + 1
}

function RIGHT_CHILD(i){
    return 2*i + 2
}

function MAX_HEAPIFY(A,i,size, heapOrder){
    const lc = LEFT_CHILD(i)
    const rc = RIGHT_CHILD(i)
    let largest = i

    //if index lc > size or rc > size if statement doesnot satisfy as index exceed the index of A
    if(lc < size && A[lc] > A[i]){
        // heapOrder.push([lc, A[lc]])
        largest = lc
    }

    //Check if the right child is greater than the parent or the left child
    if(rc < size && A[rc] > A[largest]){
        // heapOrder.push([rc, A[rc]])
        largest = rc
    }

    if(largest!=i){
        heapOrder.push([i,A[largest], largest, A[i], lc, rc, false])
        const notParent = A[i]
        A[i] = A[largest]
        A[largest] = notParent

        MAX_HEAPIFY(A,largest, size, heapOrder)
    }

    else{
        heapOrder.push([i, A[i], lc, rc, true])
    }
}


function BUILD_MAX_HEAP(A, heapOrder){
    const A_size = A.length
    const m = (Math.floor(A.length/2)) -1
    for(let i= m; i >-1; i--){
        MAX_HEAPIFY(A,i,A_size, heapOrder)
    }
}

function heapSort(A, heapOrder){
    let size = A.length
    BUILD_MAX_HEAP(A, heapOrder)
    for(let i =A.length -1; i>0; i--){
        heapOrder.push([i, A[0], 0, A[i], "swapping last and first"])
        const largest = A[0]
        A[0] = A[i]
        A[i] = largest
        size = size - 1
        MAX_HEAPIFY(A,0,size, heapOrder)
    }
}

export default heapSort