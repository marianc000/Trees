//import { BinaryTreePrinterNode } from './BinaryTreePrinterNode.mjs';

function BinaryTreePrinter() {
}


function goDown(node, onLevel) {
    if (!node)
        return onLevel - 1;
    var nextLevel = onLevel + 1;
    return Math.max(goDown(node.left, nextLevel), goDown(node.right, nextLevel));
}

BinaryTreePrinter.prototype.findDeepestLevel = function (root) {
    return goDown(root, 0);
}


BinaryTreePrinter.prototype.traverseLevelOrderCreateLevels = function (root, deepestLevel) {
    // Breath first search
    if (!root) return [];
    var queue = [root];

    for (var c = 0; c <= getMaxNodeCount(deepestLevel); c++) {
        var temp = queue[c];
        if (temp) {
            queue.push(temp.left);
            queue.push(temp.right);
        } else {
            queue.push(temp);
            queue.push(temp);
        }
    }

    var levels = [];

    for (var c = 0; c <= deepestLevel; c++) {
        levels[c] = queue.splice(0, Math.pow(2, c));
    }

    return levels;
}


var SPACES_PER_NODE = 5;

function spaces(num) {
    var str = "";
    for (var c = 0; c < num; c++) {
        str += " ";
    }
    return str;
}

function nodeRow(nodesOfALevel, maxNodesInDeepestLevel) {
    return nodesOfALevel.reduce(function (total, val) {
        if (!val)// return total +"|"+ spaces(SPACES_PER_NODE);
            val = { value: 'X' };
        return total + centerValue(val.value,Math.floor( SPACES_PER_NODE * maxNodesInDeepestLevel / nodesOfALevel.length));
    }, "");
}

function centerValue(val, rowLength) {
    var valLength = val.toString().length;
    var prefixLength = Math.floor((rowLength - valLength) / 2);
    var suffixLength = rowLength - valLength - prefixLength;
    return spaces(prefixLength) + val + spaces(suffixLength);
}

function getMaxNodeCount(deepestLevel) {
    var totalNodesInAllLevels = 0;
    for (var c = 0; c <= deepestLevel; c++) {
        totalNodesInAllLevels += Math.pow(2, c);
    }
    return totalNodesInAllLevels;
}

BinaryTreePrinter.prototype.printTree = function (root) {
    var deepestLevel = this.findDeepestLevel(root);
    console.log(`deepestLevel = ${deepestLevel}`);
    var maxNodesInLevel = Math.pow(2, deepestLevel);
    console.log(`maxNodesInLevel = ${maxNodesInLevel}`);
    var maxSpaces = maxNodesInLevel * SPACES_PER_NODE;
    console.log(`maxSpaces = ${maxSpaces}`);
    var levels = this.traverseLevelOrderCreateLevels(root, deepestLevel);
    console.log(levels);
    for (var l = 0; l < levels.length; l++) {
        var row = centerValue(nodeRow(levels[l], maxNodesInLevel ), maxSpaces);
        console.log(row);
    }

}
export { BinaryTreePrinter };
