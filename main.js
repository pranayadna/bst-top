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

        while (queue.length !== 0) {
            const node = queue.shift();

            if (callback) {
                callback(node);
            } else {
                valuesArr.push(node.getData());
            }

            if (node.getLeft()) {
                queue.push(node.getLeft());

            }

            if (node.getRight()) {
                queue.push(node.getRight());

            }
        }

        if (!callback) {
            
            return valuesArr;
        }

    }

    const inOrder = (callback) => {
        const current = root;
        const arr = [];
        
        const traverseInOrder = (current) => {
            if (!current) {
                return current;
            }

            traverseInOrder(current.getLeft());

            if (callback) {
                
                callback(current);
            } else {

                arr.push(current.getData());
            }

            traverseInOrder(current.getRight());
        }

        traverseInOrder(current)

        if (!callback) {
            return arr;
        }
    }
    
    const preOrder = (callback) => {
        const current = root;
        const arr = [];
        
        const traversePreOrder = (current) => {
            if (!current) {
                return current;
            }

            traversePreOrder(current.getLeft());

            if (callback) {
                
                callback(current);
            } else {

                arr.push(current.getData());
            }

            traversePreOrder(current.getRight());
        }

        traversePreOrder(current)

        if (!callback) {
            return arr;
        }
    }
    
    const postOrder = (callback) => {
        const current = root;
        const arr = [];
        
        const traversePostOrder = (current) => {
            if (!current) {
                return current;
            }

            traversePostOrder(current.getLeft());

            if (callback) {
                
                callback(current);
            } else {

                arr.push(current.getData());
            }

            traversePostOrder(current.getRight());
        }

        traversePostOrder(current)

        if (!callback) {
            return arr;
        }
    }

    const height = (node) => {
        if (!node) {
            return 0;
        }

        const current = node;
        const queue = []
        let count = 0;

        queue.push(current);

        while (queue.length !== 0) {
            let levelSize = queue.length;

            while (levelSize !== 0) {
                const node = queue.shift();
    
                if (node.getLeft()) {
                    queue.push(node.getLeft())
                } 
                
                if (node.getRight()) {
                    queue.push(node.getRight())
                }
                levelSize--;
            }

            count++;
        }

        return count - 1;
    }

    const depth = (node) => {
        let current = root;
        const nodeData = node.getData()
        let count = 0;

        while (current !== null) {
            if (nodeData === current.getData()) {
                return count;
            } else if (nodeData < current.getData()) {
                count++
                current = current.getLeft();
            } else if (nodeData > current.getData()) {
                count++
                current = current.getRight();
            }

        }

        return count;
    }

    const isBalanced = () => {
        const node = root;

        if (!node) return -1;
    
        const leftHeight = height(node.getLeft());
        const rightHeight = height(node.getRight());

        const result = Math.abs(leftHeight - rightHeight);

        console.log(result);
        if (result <= 1) {
            return true;
        } else if (result > 1) {
            return false;
        }
    
    }

    const reBalance = () => {
        const arrTree = inOrder();
        return buildTree(arrTree);
    }

    return {
        getRoot,
        setRoot,
        buildTree,
        prettyPrint,
        insertValue,
        deleteKey,
        find,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        reBalance
    }
}

const arr = [67, 6345, 324];
const tree = Tree(arr);
const root = tree.getRoot();