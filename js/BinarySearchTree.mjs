import { BinarySearchTreeNode } from './BinarySearchTreeNode.mjs';

function BinarySearchTree() {
    this._root = null;
}
BinarySearchTree.prototype.getRoot = function (value) {
    return this._root;
}
BinarySearchTree.prototype.insert = function (value) {
    var thisNode = new BinarySearchTreeNode(value);
    if (!this._root) {
        //if there is no root value yet
        this._root = thisNode;
    } else {
        //loop traverse until
        var currentRoot = this._root;
        while (true) {
            if (currentRoot.value > value) {
                //let's increment if it's not a null and insert if it is a null
                if (currentRoot.left != null) {
                    currentRoot = currentRoot.left;
                } else {
                    currentRoot.setLeft(thisNode);
                    break;
                }
            } else if (currentRoot.value < value) {
                //if bigger than current, put it on the right
                //let's increment if it's not a null and insert if it is a null
                if (currentRoot.right != null) {
                    currentRoot = currentRoot.right;
                } else {
                    currentRoot.setRight(thisNode);
                    break;
                }
            } else {
                //case that both are the same
                console.log(`${value} already included, do nothing`);
                break;
            }
        }
    }
}

BinarySearchTree.prototype.remove = function (value) {

    return deleteRecursively(this._root, value);

    function deleteRecursively(root, value) {
        if (!root) {
            return null;
        } else if (value < root.value) {
            console.log("less");
            root.setLeft(deleteRecursively(root.left, value));
        } else if (value > root.value) {
            console.log("more");
            root.setRight(deleteRecursively(root.right, value));
        } else {
            console.log("equal");
            //no child

            if (!root.left && !root.right) {
                console.log("case 1");
                return null; // case 1
            } else if (!root.left) { // case 2
                // root = root.right;
                // return root;
                console.log("case 21");
                return root.right;
            } else if (!root.right) { // case 2
                // root = root.left;
                // return root;
                console.log("case 22");
                return root.left;
            } else {
                console.log("case 3");
                var temp = findMin(root.right); // case 3
                root.value = temp.value;
                root.setRight(deleteRecursively(root.right, temp.value));
                return root;
            }
        }
        return root;
    }

    function findMin(root) {
        while (root.left) {
            root = root.left;
        }
        return root;
    }
}

BinarySearchTree.prototype.findNode = function (value) {
    var currentRoot = this._root,
        found = false;
    while (currentRoot) {
        if (currentRoot.value > value) {
            currentRoot = currentRoot.left;
        } else if (currentRoot.value < value) {
            currentRoot = currentRoot.right;
        } else {
            //we've found the node
            found = true;
            break;
        }
    }
    return found;
}

BinarySearchTree.prototype.traverseLevelOrder = function () {
    // Breath first search
    var root = this._root,
        queue = [];

    if (!root)
        return;
    queue.push(root);
    var temp;
    while (queue.length) {
        temp = queue.shift();
        console.log(temp.toString());
        if (temp.left)
            queue.push(temp.left);
        if (temp.right)
            queue.push(temp.right);
    }
}




BinarySearchTree.prototype.traverseLevelOrderCreateLevels = function (totalNodesInAllLevels) {
    // Breath first search
    var root = this._root,
        queue = [root];


    var temp;
    for (var c = 0; c <= totalNodesInAllLevels; c++) {
        temp = queue[c];
        if (temp) {
            queue.push(temp.left);
            queue.push(temp.right);
        } else {
            queue.push(temp);
            queue.push(temp);
        }
    }


    return queue;
}


var SPACES_PER_NODE = 5;

function spaces(num) {
    var str = "";
    for (var c = 0; c < num; c++) {
        str += " ";
    }
    return str;
}

function nodeRow(nodesOfALevel) {
    return nodesOfALevel.reduce(function (total, val) {
        if (!val) return total + spaces(SPACES_PER_NODE);
        return total + centerValue(val, SPACES_PER_NODE);
    }, "");
}
function centerValue(val, rowLength) {
    var valLength = val.toString().length;
    var prefixLength = Math.floor((rowLength - valLength) / 2);
    var suffixLength = rowLength - valLength - prefixLength;
    return spaces(prefixLength) + val + spaces(suffixLength);
}
function generateArrayOfLevels(deepestLevel) {
    var levels = [];
    for (var c = 0; c <= deepestLevel; c++) {
        levels[c] = Array(Math.pow(2, c));
        console.log(c + "\t" + levels[c].length);
    }
    console.log("total levels:" + levels.length);
}


BinarySearchTree.prototype.printTree = function () {
    var deepestLevel = this.traverseLevelOrderToFindDeepestNode();
    console.log("deepestLevel=" + deepestLevel);
    var maxNodesInLevel = Math.pow(2, deepestLevel);
    var maxSpaces = maxNodesInLevel * SPACES_PER_NODE;
    var totalNodesInAllLevels = 0;
    for (var c = 0; c <= deepestLevel; c++) {
        totalNodesInAllLevels += Math.pow(2, c);
    }
    console.log(this.traverseLevelOrderCreateLevels(totalNodesInAllLevels));
    generateArrayOfLevels(deepestLevel);
}
export { BinarySearchTree };
