 





AVLTree.prototype.remove = function(value) {
    return deleteRecursively(this, value);

    function deleteRecursively(root, value) {
        if (!root) {
            return null;
        } else if (value < root.value) {
            root.left = deleteRecursively(root.left, value);
        } else if (value > root.value) {
            root.right = deleteRecursively(root.right, value);
        } else {
            //no child
            if (!root.left && !root.right) {
                return null; // case 1
            } else if (!root.left) {
                root = root.right;
                return root;
            } else if (!root.right) {
                root = root.left;
                return root;
            } else {
                var temp = findMin(root.right);
                root.value = temp.value;
                root.right = deleteRecursively(root.right, temp.value);
                return root;
            }
        }
        root.setDepthBasedOnChildren(); // ONLY DIFFERENCE from the BST one
        return root;
    }

    function findMin(root) {
        while (root.left) root = root.left;
        return root;
    }
}
var avlTest = new AVLTree(1, '');
avlTest.insert(2);
avlTest.insert(3);
avlTest.insert(4);
avlTest.insert(5);
avlTest.insert(123);
avlTest.insert(203);
avlTest.insert(2222);
console.log(avlTest);



function findLowestCommonAncestor(root, value1, value2) {
    function findLowestCommonAncestorHelper(root, value1, value2) {
        if (!root)
            return;
        if (Math.max(value1, value2) < root.value)
            return findLowestCommonAncestorHelper(root.left, value1, value2);
        if (Math.min(value1, value2) > root.value)
            return findLowestCommonAncestorHelper(root.right, value1, value2);
        return root.value
    }
    return findLowestCommonAncestorHelper(root, value1, value2);
}
var node1 = {
    value: 1,
    left: {
        value: 0
    },
    right: {
        value: 2
    }
}

var node2 = {
    value: 1,
    left: {
        value: 0,
        left: {
            value: -1
        },
        right: {
            value: 0.5
        }
    },
    right: {
        value: 2
    }
}
console.log(findLowestCommonAncestor(node1, 0, 2)); // 1
console.log(findLowestCommonAncestor(node2, 0, 2)); // 1
console.log(findLowestCommonAncestor(node1, 0.5, -1)); // 0
function printKthLevels(root, k) {
    var arrayKth = [];
    queue = [];

    if (!root) return;

    // Breath first search for tree
    queue.push([root, 0]);

    while (queue.length) {
        var tuple = queue.shift(),
            temp = tuple[0],
            height = tuple[1];

        if (height == k) {
            arrayKth.push(temp.value);
        }
        if (temp.left) {
            queue.push([temp.left, height + 1]);
        }
        if (temp.right) {
            queue.push([temp.right, height + 1]);
        }
    }
    console.log(arrayKth);
}

var node1 = {
    value: 1,
    left: {
        value: 0
    },
    right: {
        value: 2
    }
}

var node2 = {
    value: 1,
    left: {
        value: 0,
        left: {
            value: -1
        },
        right: {
            value: 0.5
        }
    },
    right: {
        value: 2
    }
}

var node3 = {
    value: 1,
    left: {
        value: 0
    },
    right: {
        value: 2,
        left: {
            value: 1.5
        },
        right: {
            value: 3,
            left: {
                value: 3.25
            }
        }
    }
}

printKthLevels(node1, 1); // 1
printKthLevels(node1, 2); // [0,2]
function isSameTree(root1, root2) {
    if (root1 == null && root2 == null) {
        return true;
    }
    if (root1 == null || root2 == null) {
        return false;
    }

    return root1.value == root2.value &&
        isSameTree(root1.left, root2.left) &&
        isSameTree(root1.right, root2.right)
}

function checkIfSubTree(root, subtree) {
    // Breath first search
    var queue = [],
        counter = 0;

    // sanity check for root
    if (!root) {
        return;
    }

    queue.push(root);

    while (queue.length) {
        var temp = queue.shift();

        if (temp.data == subtree.data == isSameTree(temp, subtree)) {
            return true;
        }

        if (temp.left) {
            queue.push(temp.left);
        }
        if (temp.right) {
            queue.push(temp.right);
        }
    }
    return false;
}

var node1 = {
    value: 5,
    left: {
        value: 3,
        left: {
            value: 1
        },
        right: {
            value: 2
        }
    },
    right: {
        value: 7
    }
}

var node2 = {
    value: 3,
    left: {
        value: 1
    },
    right: {
        value: 2
    }
}


var node3 = {
    value: 3,
    left: {
        value: 1
    }
}

console.log(checkIfSubTree(node1, node2)); // true
console.log(checkIfSubTree(node1, node3)); // false
console.log(checkIfSubTree(node2, node3)); // false
function isMirrorTrees(tree1, tree2) {
    // Base case, both empty
    if (!tree1 && !tree2) {
        return true;
    }

    // One of them is empty, since only one is empty, not mirrored
    if (!tree1 || !tree2) {
        return false;
    }

    // Both non-empty, compare them recursively.
    // Pass left of one and right of the other

    var checkLeftwithRight = isMirrorTrees(tree1.left, tree2.right),
        checkRightwithLeft = isMirrorTrees(tree2.right, tree1.left);

    return tree1.value == tree2.value && checkLeftwithRight && checkRightwithLeft;
}

var node1 = {
    value: 3,
    left: {
        value: 1
    },
    right: {
        value: 2
    }
}

var node2 = {
    value: 3,
    left: {
        value: 2
    },
    right: {
        value: 1
    }
}

var node3 = {
    value: 3,
    left: {
        value: 1
    },
    right: {
        value: 2,
        left: {
            value: 2.5
        }
    }
}

console.log(isMirrorTrees(node1, node2)); // true
console.log(isMirrorTrees(node2, node3)); // false