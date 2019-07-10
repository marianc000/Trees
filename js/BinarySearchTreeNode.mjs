
function BinarySearchTreeNode(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
}
BinarySearchTreeNode.prototype.setLeft = function (node) {
    if (node == this.left)
        console.log("same left node");
    this.left = node;
    if (node)
        node.parent = this;
}
BinarySearchTreeNode.prototype.setRight = function (node) {
    if (node == this.right)
        console.log("same right node");
    this.right = node;
    if (node)
        node.parent = this;
}
BinarySearchTreeNode.prototype.getLevel = function () { // starts from 0
    var l = 0;
    var temp = this;
    while (temp.parent) {
        l++;
        temp = temp.parent;
    }
    return l;
}

BinarySearchTreeNode.prototype.toString = function () {
    return this.getLevel() + " " + this.value;
}
export { BinarySearchTreeNode };