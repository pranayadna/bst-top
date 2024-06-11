function Node(data) {
    let left = null;
    let right = null;

    const setData = (newData) => {
        data = newData;
    };

    const getData = () => data;

    const setLeft = (newLeft) => {
        left = newLeft;
    };

    const getLeft = () => left;

    const setRight = (newRight) => {
        right = newRight;
    };

    const getRight = () => right;

    return {
        setData,
        getData,
        setLeft,
        getLeft,
        setRight,
        getRight,
    };
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

// Example usage:
const root = Node(10);
const leftChild = Node(5);
const rightChild = Node(15);

root.setLeft(leftChild);
root.setRight(rightChild);

prettyPrint(root);
