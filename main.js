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
        } else if(value < root.getData()) {
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
        let tmp = root;

        // while (tmp !== null) {
            
        //     // console.log(tmp.getRight());
        //     // console.log(tmp.getLeft());
            
        //     if (value === tmp.getData()) {
        //         return tmp;
        //     }
            
        //     tmp = tmp.getRight();
        // }

        while (tmp !== null) {
            
            if (value === tmp.getData()) {
                return tmp;
            }
            
            tmp = tmp.getLeft();
        }
    }

    return {
        getRoot,
        setRoot,
        buildTree,
        prettyPrint,
        insertValue,
        deleteKey,
        find
    }
}

const arr = [67,6345,324];
const tree = Tree(arr);

const root = tree.getRoot();

tree.prettyPrint(root);

// console.log(tree.find(324).getRight().getData());
// console.log(tree.find(324));
console.log(tree.find(67));

// tree.insertValue(root, 69);
// tree.insertValue(root, 6000);
// tree.insertValue(root, 7000);

// tree.deleteKey(root, 324)
