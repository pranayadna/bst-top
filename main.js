function Node(initialData) {
    let data = initialData;
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

    let root = buildTree(sortedArr);

    const getRoot = () => root;

    const setRoot = (newRoot) => {
        root = newRoot;
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

    // prettyPrint(root);

    const insertValue = (root, value) => {
        if (!root) {
            return Node(value);
        }

        if (value > root.getData()) {
            root.setRight(insertValue(root.getRight(), value));
        } else if (value < root.getData()) {
            root.setLeft(insertValue(root.getLeft(), value));
        }

        return root;
    }

    const deleteKey = (root, key) => {
        if (!root) {
            return root;
        }

        if (key < root.getData()) {
            root.setLeft(deleteKey(root.getLeft(), key));
        } else
            if (key > root.getData()) {
                root.setRight(deleteKey(root.getRight(), key));
            }
            else {
                if (root.getLeft() === null) {
                    return root.getRight();
                } else
                    if (root.getRight() === null) {
                        return root.getLeft();
                    }

                let minValueNode = getMinValueNode(root.getRight());

                root.setData(minValueNode.getData());

                root.setRight(deleteKey(root.getRight(), minValueNode.getData()))
            }

        return root;
    }

    const getMinValueNode = (node) => {
        let current = node;
        while (current.getLeft()) {
            current = current.getLeft()
        }

        return current;
    }

    const find = (value) => {
        let current = root;

        // while (current !== null) {

        //     // console.log(current.getRight());
        //     // console.log(current.getLeft());

        //     if (value === current.getData()) {
        //         return current;
        //     }

        //     current = current.getRight();
        // }

        while (current !== null) {

            if (value === current.getData()) {
                return current;
            }
            else if (value < current.getData()) {
                current = current.getLeft();
            }
            else if (value > current.getData()) {
                current = current.getRight();
            }

        }
        return null;
    }

    const levelOrder = (callback) => {
        const queue = [];
        const valuesArr = [];
        const current = root;

        queue.push(current);

        // console.log(queue);
        // console.log(queue.shift(current));

        // valuesArr.push(current.getLeft().getData());
        // console.log(queue);
        // console.log(valuesArr);
        // queue.push(null)
        // console.log(queue);

        while (queue.length !== 0) {

            // // queue.push(current.getLeft());

            const node = queue.shift();

            callback(node);

            valuesArr.push(node.getData());

            // //     // console.log(node.getData());
            // //     // queue.push(node);

            if (node.getLeft()) {
                queue.push(node.getLeft());

            }

            if (node.getRight()) {
                queue.push(node.getRight());

            }
            // if (node.getLeft() === null) {
            //     // queue.shift();
            //     break;
            // } else {

            // }


            // if (queue.length === 0) {
            //     break;
            // } else {

            // }



            //     // else

        }

        return valuesArr;

    }
    //     // if (current.getLeft() !== null) {
    //     //     current = current.getLeft();

    //     // }
    //     // else if (current.getRight() !== null) {

    //     //     // queue.push(current.getRight().getData());
    //     //     current = current.getRight();
    //     // } else {
    //     //     current = root;
    //     // }

    //     // if (current.getRight() === null && current.getLeft() === null) {

    //     //     current = null;
    //     // }


    // const 

    // enqueue
    // queue.push(root.getData());
    // queue.push(root.getLeft().getData());
    // queue.push(root.getRight().getData());

    // dequeue
    // queue.shift()

    // return queue;


    return {
        getRoot,
        setRoot,
        buildTree,
        prettyPrint,
        insertValue,
        deleteKey,
        find,
        levelOrder
    }
}

const arr = [67, 6345, 324];
const tree = Tree(arr);

const root = tree.getRoot();


// console.log(tree.find(324).getRight().getData());

tree.insertValue(root, 50);
tree.insertValue(root, 35);
tree.insertValue(root, 61);
tree.insertValue(root, 69);
tree.insertValue(root, 6000);
tree.insertValue(root, 6011);
tree.insertValue(root, 6001);
tree.insertValue(root, 7000);

// console.log(tree.find(324).getData());
// console.log(tree.find(6000).getData());
// console.log(tree.find(6345).getData());
// console.log(tree.find(7000).getData());
// console.log(tree.find(67).getData());
// console.log(tree.find(69));

// tree.deleteKey(root, 324)

tree.prettyPrint(root);

function printNode(node) {
    console.log(node.getData());
}

console.log(tree.levelOrder(printNode));
