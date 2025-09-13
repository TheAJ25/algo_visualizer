// "use client";

// // Animated merge sort that tracks all operations
// export const getMergeSortAnimations = (array) => {
//   const animations = [];
//   const auxiliaryArray = array.slice();
//   const mainArray = array.slice();
  
//   mergeSortHelper(mainArray, 0, array.length - 1, auxiliaryArray, animations);
//   return animations;
// };

// const mergeSortHelper = (mainArray, startIdx, endIdx, auxiliaryArray, animations) => {
//   if (startIdx === endIdx) return;
  
//   const middleIdx = Math.floor((startIdx + endIdx) / 2);
  
//   // Recursively sort both halves
//   mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
//   mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  
//   // Merge the sorted halves
//   merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
// };

// const merge = (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) => {
//   let k = startIdx;
//   let i = startIdx;
//   let j = middleIdx + 1;
  
//   while (i <= middleIdx && j <= endIdx) {
//     // Animation: Compare two elements
//     animations.push({
//       type: 'compare',
//       indices: [i, j],
//     });
    
//     if (auxiliaryArray[i] <= auxiliaryArray[j]) {
//       // Animation: Select element from left half
//       animations.push({
//         type: 'select',
//         indices: [i],
//       });
      
//       mainArray[k++] = auxiliaryArray[i++];
//     } else {
//       // Animation: Select element from right half  
//       animations.push({
//         type: 'select',
//         indices: [j],
//       });
      
//       mainArray[k++] = auxiliaryArray[j++];
//     }
    
//     // Animation: Reset comparison colors
//     animations.push({
//       type: 'reset',
//       indices: [i - 1, j - 1],
//     });
//   }
  
//   // Copy remaining elements from left half
//   while (i <= middleIdx) {
//     animations.push({
//       type: 'select',
//       indices: [i],
//     });
    
//     mainArray[k++] = auxiliaryArray[i++];
//   }
  
//   // Copy remaining elements from right half
//   while (j <= endIdx) {
//     animations.push({
//       type: 'select',
//       indices: [j],
//     });
    
//     mainArray[k++] = auxiliaryArray[j++];
//   }
  
//   // Animation: Show the merged sub-array
//   const mergedValues = [];
//   for (let idx = startIdx; idx <= endIdx; idx++) {
//     mergedValues.push(mainArray[idx]);
//   }
  
//   animations.push({
//     type: 'overwrite',
//     values: mergedValues,
//     range: { start: startIdx, end: endIdx },
//   });
// };

// // Quick Sort with animations
// export const getQuickSortAnimations = (array) => {
//   const animations = [];
//   const arr = array.slice();
  
//   quickSortHelper(arr, 0, arr.length - 1, animations);
//   return animations;
// };

// const quickSortHelper = (arr, low, high, animations) => {
//   if (low < high) {
//     // Partition the array and get the pivot index
//     const pi = partition(arr, low, high, animations);
    
//     // Recursively sort elements before and after partition
//     quickSortHelper(arr, low, pi - 1, animations);
//     quickSortHelper(arr, pi + 1, high, animations);
//   }
// };

// const partition = (arr, low, high, animations) => {
//   // Select the rightmost element as pivot
//   const pivot = arr[high];
  
//   // Animation: Highlight pivot
//   animations.push({
//     type: 'pivot',
//     indices: [high],
//   });
  
//   let i = low - 1; // Index of smaller element
  
//   for (let j = low; j < high; j++) {
//     // Animation: Compare current element with pivot
//     animations.push({
//       type: 'compare',
//       indices: [j, high],
//     });
    
//     if (arr[j] <= pivot) {
//       i++;
      
//       // Animation: Swap elements
//       animations.push({
//         type: 'swap',
//         indices: [i, j],
//         values: [arr[j], arr[i]]
//       });
      
//       // Swap elements
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
    
//     // Animation: Reset comparison colors
//     animations.push({
//       type: 'reset',
//       indices: [j, high],
//     });
//   }
  
//   // Animation: Swap pivot with element at i+1
//   animations.push({
//     type: 'swap',
//     indices: [i + 1, high],
//     values: [arr[high], arr[i + 1]]
//   });
  
//   // Place pivot in correct position
//   [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
//   // Animation: Mark pivot as sorted
//   animations.push({
//     type: 'sorted',
//     indices: [i + 1],
//   });
  
//   return i + 1;
// };

// // Bubble Sort with animations
// export const getBubbleSortAnimations = (array) => {
//   const animations = [];
//   const arr = array.slice();
//   const n = arr.length;
  
//   for (let i = 0; i < n - 1; i++) {
//     for (let j = 0; j < n - i - 1; j++) {
//       // Animation: Compare adjacent elements
//       animations.push({
//         type: 'compare',
//         indices: [j, j + 1],
//       });
      
//       if (arr[j] > arr[j + 1]) {
//         // Animation: Swap elements
//         animations.push({
//           type: 'swap',
//           indices: [j, j + 1],
//           values: [arr[j + 1], arr[j]]
//         });
        
//         // Swap elements
//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//       }
      
//       // Animation: Reset comparison colors
//       animations.push({
//         type: 'reset',
//         indices: [j, j + 1],
//       });
//     }
    
//     // Animation: Mark the last element as sorted
//     animations.push({
//       type: 'sorted',
//       indices: [n - i - 1],
//     });
//   }
  
//   // Animation: Mark all elements as sorted
//   animations.push({
//     type: 'allSorted',
//     indices: Array.from({length: n}, (_, i) => i),
//   });
  
//   return animations;
// };

// // Heap Sort with animations
// export const getHeapSortAnimations = (array) => {
//   const animations = [];
//   const arr = array.slice();
//   const n = arr.length;
  
//   // Build a max heap
//   for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
//     heapify(arr, n, i, animations);
//   }
  
//   // Extract elements from heap one by one
//   for (let i = n - 1; i > 0; i--) {
//     // Animation: Swap root with last element
//     animations.push({
//       type: 'swap',
//       indices: [0, i],
//       values: [arr[i], arr[0]]
//     });
    
//     // Move current root to end
//     [arr[0], arr[i]] = [arr[i], arr[0]];
    
//     // Animation: Mark the sorted element
//     animations.push({
//       type: 'sorted',
//       indices: [i],
//     });
    
//     // Call max heapify on the reduced heap
//     heapify(arr, i, 0, animations);
//   }
  
//   // Animation: Mark the first element as sorted
//   animations.push({
//     type: 'sorted',
//     indices: [0],
//   });
  
//   // Animation: Mark all elements as sorted
//   animations.push({
//     type: 'allSorted',
//     indices: Array.from({length: n}, (_, i) => i),
//   });
  
//   return animations;
// };

// const heapify = (arr, n, i, animations) => {
//   let largest = i; // Initialize largest as root
//   const left = 2 * i + 1;
//   const right = 2 * i + 2;
  
//   // Animation: Compare root with left child
//   if (left < n) {
//     animations.push({
//       type: 'compare',
//       indices: [largest, left],
//     });
    
//     if (arr[left] > arr[largest]) {
//       largest = left;
//     }
    
//     animations.push({
//       type: 'reset',
//       indices: [largest, left],
//     });
//   }
  
//   // Animation: Compare root with right child
//   if (right < n) {
//     animations.push({
//       type: 'compare',
//       indices: [largest, right],
//     });
    
//     if (arr[right] > arr[largest]) {
//       largest = right;
//     }
    
//     animations.push({
//       type: 'reset',
//       indices: [largest, right],
//     });
//   }
  
//   // If largest is not root
//   if (largest !== i) {
//     // Animation: Swap root with largest
//     animations.push({
//       type: 'swap',
//       indices: [i, largest],
//       values: [arr[largest], arr[i]]
//     });
    
//     [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
//     // Recursively heapify the affected sub-tree
//     heapify(arr, n, largest, animations);
//   }
// };

// // Simple implementations without animations (for comparison)
// export const quickSort = (array) => {
//   if (array.length <= 1) return array;
  
//   const pivot = array[array.length - 1];
//   const left = [];
//   const right = [];
  
//   for (let i = 0; i < array.length - 1; i++) {
//     if (array[i] < pivot) {
//       left.push(array[i]);
//     } else {
//       right.push(array[i]);
//     }
//   }
  
//   return [...quickSort(left), pivot, ...quickSort(right)];
// };

// export const bubbleSort = (array) => {
//   const arr = array.slice();
//   const n = arr.length;
  
//   for (let i = 0; i < n - 1; i++) {
//     for (let j = 0; j < n - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//       }
//     }
//   }
  
//   return arr;
// };

// export const heapSort = (array) => {
//   const arr = array.slice();
//   const n = arr.length;
  
//   // Build max heap
//   for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
//     heapifySimple(arr, n, i);
//   }
  
//   // Extract elements from heap
//   for (let i = n - 1; i > 0; i--) {
//     [arr[0], arr[i]] = [arr[i], arr[0]];
//     heapifySimple(arr, i, 0);
//   }
  
//   return arr;
// };

// const heapifySimple = (arr, n, i) => {
//   let largest = i;
//   const left = 2 * i + 1;
//   const right = 2 * i + 2;
  
//   if (left < n && arr[left] > arr[largest]) {
//     largest = left;
//   }
  
//   if (right < n && arr[right] > arr[largest]) {
//     largest = right;
//   }
  
//   if (largest !== i) {
//     [arr[i], arr[largest]] = [arr[largest], arr[i]];
//     heapifySimple(arr, n, largest);
//   }
// };



"use client";

// Animated merge sort that tracks all operations
export const getMergeSortAnimations = (array) => {
  const animations = [];
  const auxiliaryArray = array.slice();
  const mainArray = array.slice();
  
  mergeSortHelper(mainArray, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
};

const mergeSortHelper = (mainArray, startIdx, endIdx, auxiliaryArray, animations) => {
  if (startIdx === endIdx) return;
  
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  
  // Recursively sort both halves
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  
  // Merge the sorted halves
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
};

const merge = (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) => {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  
  while (i <= middleIdx && j <= endIdx) {
    // Animation: Compare two elements
    animations.push({
      type: 'compare',
      indices: [i, j],
    });
    
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // Animation: Select element from left half
      animations.push({
        type: 'select',
        indices: [i],
      });
      
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // Animation: Select element from right half  
      animations.push({
        type: 'select',
        indices: [j],
      });
      
      mainArray[k++] = auxiliaryArray[j++];
    }
    
    // Animation: Reset comparison colors
    animations.push({
      type: 'reset',
      indices: [i - 1, j - 1],
    });
  }
  
  // Copy remaining elements from left half
  while (i <= middleIdx) {
    animations.push({
      type: 'select',
      indices: [i],
    });
    
    mainArray[k++] = auxiliaryArray[i++];
  }
  
  // Copy remaining elements from right half
  while (j <= endIdx) {
    animations.push({
      type: 'select',
      indices: [j],
    });
    
    mainArray[k++] = auxiliaryArray[j++];
  }
  
  // Animation: Show the merged sub-array
  const mergedValues = [];
  for (let idx = startIdx; idx <= endIdx; idx++) {
    mergedValues.push(mainArray[idx]);
  }
  
  animations.push({
    type: 'overwrite',
    values: mergedValues,
    range: { start: startIdx, end: endIdx },
  });
};

// Quick Sort with animations
export const getQuickSortAnimations = (array) => {
  const animations = [];
  const arr = array.slice();
  
  quickSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
};

const quickSortHelper = (arr, low, high, animations) => {
  if (low < high) {
    // Partition the array and get the pivot index
    const pi = partition(arr, low, high, animations);
    
    // Recursively sort elements before and after partition
    quickSortHelper(arr, low, pi - 1, animations);
    quickSortHelper(arr, pi + 1, high, animations);
  }
};

const partition = (arr, low, high, animations) => {
  // Select the rightmost element as pivot
  const pivot = arr[high];
  
  // Animation: Highlight pivot
  animations.push({
    type: 'pivot',
    indices: [high],
  });
  
  let i = low - 1; // Index of smaller element
  
  for (let j = low; j < high; j++) {
    // Animation: Compare current element with pivot
    animations.push({
      type: 'compare',
      indices: [j, high],
    });
    
    if (arr[j] <= pivot) {
      i++;
      
      // Animation: Swap elements
      animations.push({
        type: 'swap',
        indices: [i, j],
        values: [arr[j], arr[i]]
      });
      
      // Swap elements
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    
    // Animation: Reset comparison colors
    animations.push({
      type: 'reset',
      indices: [j, high],
    });
  }
  
  // Animation: Swap pivot with element at i+1
  animations.push({
    type: 'swap',
    indices: [i + 1, high],
    values: [arr[high], arr[i + 1]]
  });
  
  // Place pivot in correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  // Animation: Mark pivot as sorted
  animations.push({
    type: 'sorted',
    indices: [i + 1],
  });
  
  return i + 1;
};

// Bubble Sort with animations
export const getBubbleSortAnimations = (array) => {
  const animations = [];
  const arr = array.slice();
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Animation: Compare adjacent elements
      animations.push({
        type: 'compare',
        indices: [j, j + 1],
      });
      
      if (arr[j] > arr[j + 1]) {
        // Animation: Swap elements
        animations.push({
          type: 'swap',
          indices: [j, j + 1],
          values: [arr[j + 1], arr[j]]
        });
        
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
      
      // Animation: Reset comparison colors
      animations.push({
        type: 'reset',
        indices: [j, j + 1],
      });
    }
    
    // Animation: Mark the last element as sorted
    animations.push({
      type: 'sorted',
      indices: [n - i - 1],
    });
  }
  
  // Animation: Mark all elements as sorted
  animations.push({
    type: 'allSorted',
    indices: Array.from({length: n}, (_, i) => i),
  });
  
  return animations;
};

// Heap Sort with animations
export const getHeapSortAnimations = (array) => {
  const animations = [];
  const arr = array.slice();
  const n = arr.length;
  
  // Build a max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animations);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Animation: Swap root with last element
    animations.push({
      type: 'swap',
      indices: [0, i],
      values: [arr[i], arr[0]]
    });
    
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Animation: Mark the sorted element
    animations.push({
      type: 'sorted',
      indices: [i],
    });
    
    // Call max heapify on the reduced heap
    heapify(arr, i, 0, animations);
  }
  
  // Animation: Mark the first element as sorted
  animations.push({
    type: 'sorted',
    indices: [0],
  });
  
  // Animation: Mark all elements as sorted
  animations.push({
    type: 'allSorted',
    indices: Array.from({length: n}, (_, i) => i),
  });
  
  return animations;
};

const heapify = (arr, n, i, animations) => {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  // Animation: Compare root with left child
  if (left < n) {
    animations.push({
      type: 'compare',
      indices: [largest, left],
    });
    
    if (arr[left] > arr[largest]) {
      largest = left;
    }
    
    animations.push({
      type: 'reset',
      indices: [largest, left],
    });
  }
  
  // Animation: Compare root with right child
  if (right < n) {
    animations.push({
      type: 'compare',
      indices: [largest, right],
    });
    
    if (arr[right] > arr[largest]) {
      largest = right;
    }
    
    animations.push({
      type: 'reset',
      indices: [largest, right],
    });
  }
  
  // If largest is not root
  if (largest !== i) {
    // Animation: Swap root with largest
    animations.push({
      type: 'swap',
      indices: [i, largest],
      values: [arr[largest], arr[i]]
    });
    
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest, animations);
  }
};

// Insertion Sort with animations
export const getInsertionSortAnimations = (array) => {
  const animations = [];
  const arr = array.slice();
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    
    // Animation: Highlight the current element being inserted
    animations.push({
      type: 'select',
      indices: [i],
    });
    
    while (j >= 0 && arr[j] > key) {
      // Animation: Compare elements
      animations.push({
        type: 'compare',
        indices: [j, i],
      });
      
      // Animation: Shift element to the right
      animations.push({
        type: 'overwrite',
        indices: [j + 1],
        value: arr[j],
      });
      
      arr[j + 1] = arr[j];
      j--;
      
      // Animation: Reset comparison
      animations.push({
        type: 'reset',
        indices: [j + 1, i],
      });
    }
    
    // Animation: Place the key in its correct position
    animations.push({
      type: 'overwrite',
      indices: [j + 1],
      value: key,
    });
    
    arr[j + 1] = key;
    
    // Animation: Reset selection
    animations.push({
      type: 'reset',
      indices: [i],
    });
    
    // Animation: Mark sorted elements
    if (i === n - 1) {
      animations.push({
        type: 'allSorted',
        indices: Array.from({length: i + 1}, (_, idx) => idx),
      });
    }
  }
  
  return animations;
};

// Selection Sort with animations
export const getSelectionSortAnimations = (array) => {
  const animations = [];
  const arr = array.slice();
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    // Animation: Mark current minimum
    animations.push({
      type: 'select',
      indices: [minIdx],
    });
    
    for (let j = i + 1; j < n; j++) {
      // Animation: Compare with current minimum
      animations.push({
        type: 'compare',
        indices: [minIdx, j],
      });
      
      if (arr[j] < arr[minIdx]) {
        // Animation: Reset previous minimum
        animations.push({
          type: 'reset',
          indices: [minIdx],
        });
        
        minIdx = j;
        
        // Animation: Mark new minimum
        animations.push({
          type: 'select',
          indices: [minIdx],
        });
      }
      
      // Animation: Reset comparison
      animations.push({
        type: 'reset',
        indices: [j],
      });
    }
    
    if (minIdx !== i) {
      // Animation: Swap elements
      animations.push({
        type: 'swap',
        indices: [i, minIdx],
        values: [arr[minIdx], arr[i]]
      });
      
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    
    // Animation: Mark sorted element
    animations.push({
      type: 'sorted',
      indices: [i],
    });
    
    // Animation: Reset selection
    animations.push({
      type: 'reset',
      indices: [minIdx],
    });
  }
  
  // Animation: Mark last element as sorted
  animations.push({
    type: 'sorted',
    indices: [n - 1],
  });
  
  // Animation: Mark all elements as sorted
  animations.push({
    type: 'allSorted',
    indices: Array.from({length: n}, (_, i) => i),
  });
  
  return animations;
};

// Radix Sort with animations
export const getRadixSortAnimations = (array) => {
  const animations = [];
  const arr = array.slice();
  const n = arr.length;
  
  // Find the maximum number to know number of digits
  const maxNum = Math.max(...arr);
  
  // Do counting sort for every digit
  for (let exp = 1; Math.floor(maxNum / exp) > 0; exp *= 10) {
    countingSort(arr, n, exp, animations);
  }
  
  // Animation: Mark all elements as sorted
  animations.push({
    type: 'allSorted',
    indices: Array.from({length: n}, (_, i) => i),
  });
  
  return animations;
};

const countingSort = (arr, n, exp, animations) => {
  const output = new Array(n);
  const count = new Array(10).fill(0);
  
  // Store count of occurrences in count[]
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
    
    // Animation: Highlight digit being processed
    animations.push({
      type: 'select',
      indices: [i],
    });
    
    // Animation: Reset highlight
    animations.push({
      type: 'reset',
      indices: [i],
    });
  }
  
  // Change count[i] so that count[i] contains actual position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
    
    // Animation: Show element being placed in bucket
    animations.push({
      type: 'select',
      indices: [i],
    });
  }
  
  // Copy the output array to arr[], so that arr[] contains sorted numbers according to current digit
  for (let i = 0; i < n; i++) {
    // Animation: Update array with sorted values
    animations.push({
      type: 'overwrite',
      indices: [i],
      value: output[i],
    });
    
    arr[i] = output[i];
    
    // Animation: Reset highlight
    animations.push({
      type: 'reset',
      indices: [i],
    });
    
    // Animation: Show partially sorted array
    animations.push({
      type: 'sorted',
      indices: [i],
    });
  }
};

// Shell Sort with animations
export const getShellSortAnimations = (array) => {
  const animations = [];
  const arr = array.slice();
  const n = arr.length;
  
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;
      
      // Animation: Highlight elements being compared
      animations.push({
        type: 'compare',
        indices: [i, i - gap],
      });
      
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        // Animation: Shift element
        animations.push({
          type: 'overwrite',
          indices: [j],
          value: arr[j - gap],
        });
        
        arr[j] = arr[j - gap];
        
        // Animation: Reset comparison
        animations.push({
          type: 'reset',
          indices: [j, j - gap],
        });
        
        // Animation: Compare next elements
        if (j - gap >= gap) {
          animations.push({
            type: 'compare',
            indices: [j - gap, j - 2 * gap],
          });
        }
      }
      
      // Animation: Place temp in correct location
      animations.push({
        type: 'overwrite',
        indices: [j],
        value: temp,
      });
      
      arr[j] = temp;
      
      // Animation: Reset all comparisons
      animations.push({
        type: 'reset',
        indices: Array.from({length: n}, (_, idx) => idx),
      });
    }
  }
  
  // Animation: Mark all elements as sorted
  animations.push({
    type: 'allSorted',
    indices: Array.from({length: n}, (_, i) => i),
  });
  
  return animations;
};

// Simple implementations without animations (for comparison)
export const quickSort = (array) => {
  if (array.length <= 1) return array;
  
  const pivot = array[array.length - 1];
  const left = [];
  const right = [];
  
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
};

export const bubbleSort = (array) => {
  const arr = array.slice();
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
};

export const heapSort = (array) => {
  const arr = array.slice();
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifySimple(arr, n, i);
  }
  
  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapifySimple(arr, i, 0);
  }
  
  return arr;
};

const heapifySimple = (arr, n, i) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapifySimple(arr, n, largest);
  }
};

export const insertionSort = (array) => {
  const arr = array.slice();
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
  
  return arr;
};

export const selectionSort = (array) => {
  const arr = array.slice();
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  
  return arr;
};

export const radixSort = (array) => {
  const arr = array.slice();
  const n = arr.length;
  
  // Find the maximum number to know number of digits
  const maxNum = Math.max(...arr);
  
  // Do counting sort for every digit
  for (let exp = 1; Math.floor(maxNum / exp) > 0; exp *= 10) {
    countingSortSimple(arr, n, exp);
  }
  
  return arr;
};

const countingSortSimple = (arr, n, exp) => {
  const output = new Array(n);
  const count = new Array(10).fill(0);
  
  // Store count of occurrences in count[]
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  
  // Change count[i] so that count[i] contains actual position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  // Copy the output array to arr[]
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
};

export const shellSort = (array) => {
  const arr = array.slice();
  const n = arr.length;
  
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;
      
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      
      arr[j] = temp;
    }
  }
  
  return arr;
};