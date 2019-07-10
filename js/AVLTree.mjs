import { printer } from './BinaryTreePrinter.mjs';

function AVLTree(value) {
    this.left = null;
    this.right = null;
    this.value = value;
    this.depth = 1;
}

AVLTree.prototype.setLeft = function (node) {
    if (node == this.left)
        console.log("same left node");
    this.left = node;
    if (node)
        node.parent = this;
}

AVLTree.prototype.getRoot = function (e) {
    return this;
}

AVLTree.prototype.setRight = function (node) {
    if (node == this.right)
        console.log("same right node");
    this.right = node;
    if (node)
        node.parent = this;
}
AVLTree.prototype.setDepthBasedOnChildren = function () {

    this.depth = 1;

    if (this.left != null) {
        this.depth = this.left.depth + 1;
    }
    if (this.right != null && this.depth <= this.right.depth) {
        this.depth = this.right.depth + 1;
    }
}
AVLTree.prototype.rotateRR = function () {
    // the right side is too long => rotate from the right (_not_ rightwards)
    console.log(">rotateRR: " + this.value);
    var valueBefore = this.value;
    var leftBefore = this.left;
    this.value = this.right.value;

    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.value = valueBefore;

    this.left.setDepthBasedOnChildren();
    this.setDepthBasedOnChildren();
}
AVLTree.prototype.rotateLL = function () {
    console.log(">rotateLL: " + this.value);
    var valueBefore = this.value;
    var rightBefore = this.right;
    this.value = this.left.value;

    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.value = valueBefore;

    this.right.setDepthBasedOnChildren();
    this.setDepthBasedOnChildren();
};

AVLTree.prototype.balance = function () {
    console.log(">balance: " + this.value);
    printer.printTree(this);
    var ldepth = this.left == null ? 0 : this.left.depth;
    var rdepth = this.right == null ? 0 : this.right.depth;

    if (ldepth > rdepth + 1) {
        // LR or LL rotation
        var lldepth = this.left.left == null ? 0 : this.left.left.depth;
        var lrdepth = this.left.right == null ? 0 : this.left.right.depth;

        if (lldepth < lrdepth) {
            // LR rotation consists of a RR rotation of the left child
            this.left.rotateRR();
            // plus a LL rotation of this node, which happens anyway
        }
        this.rotateLL();
    } else if (ldepth + 1 < rdepth) {
        // RR or RL rorarion
        var rrdepth = this.right.right == null ? 0 : this.right.right.depth;
        var rldepth = this.right.left == null ? 0 : this.right.left.depth;

        if (rldepth > rrdepth) {
            // RR rotation consists of a LL rotation of the right child
            this.right.rotateLL();
            // plus a RR rotation of this node, which happens anyway
        }
        this.rotateRR();
    }
}

AVLTree.prototype.insert = function (value) {
    console.log(">insert: " + value);
    var childInserted = false;
    if (value == this.value) {
        return false; // should be all unique
    } else if (value < this.value) {
        if (this.left == null) {
            this.left = new AVLTree(value);
            childInserted = true;
        } else {
            childInserted = this.left.insert(value);
            if (childInserted == true) this.balance();
        }
    } else if (value > this.value) {
        if (this.right == null) {
            this.right = new AVLTree(value);
            childInserted = true;
        } else {
            childInserted = this.right.insert(value);

            if (childInserted == true) this.balance();
        }
    }
    if (childInserted == true) this.setDepthBasedOnChildren();
    return childInserted;
}

AVLTree.prototype.remove = function (value) {

    return deleteRecursively(this, value);

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
        root.setDepthBasedOnChildren();
        return root;
    }

    function findMin(root) {
        while (root.left) {
            root = root.left;
        }
        return root;
    }
}

AVLTree.prototype.findNode = function (value) {
    var currentRoot = this,
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

AVLTree.prototype.traverseLevelOrder = function () {
    // Breath first search
    var root = this,
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


export { AVLTree };
