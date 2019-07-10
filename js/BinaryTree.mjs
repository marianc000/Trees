import { BinaryTreeNode } from './BinaryTreeNode.mjs';

function BinaryTree(root) {
    this._root = root;
}

function traversePreOrderHelper(node) {
    if (!node)
        return;
    console.log(node.value);
    traversePreOrderHelper(node.left);
    traversePreOrderHelper(node.right);
}

BinaryTree.prototype.traversePreOrder = function () {
    traversePreOrderHelper(this._root);
}


function traverseInOrderHelper(node) {
    if (!node)
        return;
    traverseInOrderHelper(node.left);
    console.log(node.value);
    traverseInOrderHelper(node.right);
}

BinaryTree.prototype.traverseInOrder = function () {
    traverseInOrderHelper(this._root);
}

function traversePostOrderHelper(node) {
    if (node.left)
        traversePostOrderHelper(node.left);
    if (node.right)
        traversePostOrderHelper(node.right);
    console.log(node.value);
}

BinaryTree.prototype.traversePostOrder = function () {
    traversePostOrderHelper(this._root);
}
 
BinaryTree.prototype.traverseLevelOrder = function() {
    // Breath first search
    var root = this._root,
        queue = [];

    if (!root)
        return;
    queue.push(root);

    while (queue.length) {
        var temp = queue.shift();
        console.log(temp.value);
        if (temp.left)
            queue.push(temp.left);
        if (temp.right)
            queue.push(temp.right);
    }
}

export { BinaryTree };
