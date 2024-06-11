function sortArray(arr) {
    const compare = (a, b) => {
        return a - b;
    }

    return arr.sort(compare);
}  

const sortedArr = sortArray([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(sortedArr);

function removeDuplicate(sortedArr) {
    for (let i = 0; i < sortedArr.length; i++) {
        if (sortedArr[i] === sortedArr[i + 1]) {
            sortedArr.splice(i, 1);
        }
    }

    return sortedArr;
}

console.log(removeDuplicate(sortedArr));