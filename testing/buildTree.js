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

function buildTree(arr, start = 0, end = arr.length - 1) {    
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
 
const arr = [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345];
const root = buildTree(arr);
prettyPrint(root);
// console.log(root.getData());
// console.log(root.getLeft().getData());
// console.log(root.getRight().getData());

