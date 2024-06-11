function Node(data) {
    // let data = 0;
    let left = null;
    let right = null;

    const setData = (newData) => {
        data = newData;
    }

    const getData = () => data;
    
    const setLeft = (newLeft) => {
        left = newLeft;
    }

    const getLeft = () => left;
    
    const setRight = (newRight) => {
        right = newRight;
    }
    
    const getRight = () => right;

    return {
        setData,
        getData,
        setLeft,
        getLeft,
        setRight,
        getRight
    }
}

function Tree(initialArr) {
    const sortAndRemoveDuplicate = (array) => {
        array.sort((a, b) => a - b)

        for (let i = 0; i < array.length; i++) {
            if (array[i] === array[i + 1]) {
                array.splice(i, 1);
            }
        }

        return array;
    }

    const sortedArr = sortAndRemoveDuplicate(initialArr);

    const buildTree = (arr, start = 0, end = arr.length - 1) => {
        if (start > end) {
            return null;
        }
    
        const mid = Math.floor((start + end) / 2);
        const root = Node(arr[mid]);
    
        root.setLeft(buildTree(arr, start, mid - 1));
        root.setRight(buildTree(arr, mid + 1, end));
    
        return root;
    }

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
    
        if (node.getRight() !== null) {
            prettyPrint(node.getRight(), `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
    
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.getData()}`);
        if (node.getLeft() !== null) {
            prettyPrint(node.getLeft(), `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    const root = buildTree(sortedArr);
    prettyPrint(root);
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = Tree(arr);

