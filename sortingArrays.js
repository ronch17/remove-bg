let arr = [1, 0, 0, 1, 1, 0, 0, 1];

const myFunction = (arr) => {
  let arr1 = [];
  let arr2 = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      arr1.push(arr[i]);
    } else {
      arr2.push(arr[i]);
    }
  }
  let concatedArr = arr1.concat(arr2);

  return concatedArr;
};

console.log(myFunction(arr));

let arr = [1, 0, 0, 1, 1, 0, 0, 1];

[0, 0, 1, 0, 1, 0, 1, 1];

for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] > arr[j]) {
      temp = arr[i]; // 1 0
      arr[i] = arr[j]; // 0 1
      arr[j] = temp; // 1 0
    }
  }
}
console.log("Sorted array=>", arr);

///////////////////////////////////////////////////////

function sortArr(n, arr) {
  let i = 0;
  let j = n - 1;
  while (i <= j) {
    if (Math.sign(arr[i] - arr[j]) == 1) {
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    if (i === j) {
      i++;
      j = n;
    }
    j--;
  }
  return arr;
}

console.log(sortArr(6, [100, 23, 43, 64, 12, 3]));

//////////////////////////////////////////////////////////////////

// function bubbleSort(arr) {
//   let n = arr.length;
//   for (let i = 0; i < n - 1; i++) {
//     for (let j = 0; j < n - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         // Swap arr[j] and arr[j+1]
//         let temp = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = temp;
//       }
//     }
//   }
//   return arr;
// }

// let unsortedArray = [64, 34, 25, 12, 22, 11, 90];
// let sortedArray = bubbleSort(unsortedArray);

// console.log(sortedArray);

// ////////////////////////////////////////////////////////////////////

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === Math.floor(arr.length / 2)) {
      continue;
    }

    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = quickSort(unsortedArray);

console.log(sortedArray);
