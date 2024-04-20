class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor(treeArray) {
    this.treeArray = treeArray;
    this.root = this.buildTree(treeArray);
  }
  buildTree(array) {
    let copyArray = array;
    copyArray.sort((a, b) => a - b);
    copyArray = [...new Set(copyArray)];

    let start = 0;
    let end = copyArray.length - 1;
    const tree = this.createTree(copyArray, start, end);
    return tree;
  }
  createTree(array, start, end) {
    if (start > end) return null;
    const mid = Math.floor((end + start) / 2);
    const newNode = new Node(array[mid]);
    newNode.left = this.createTree(array, start, mid - 1);
    newNode.right = this.createTree(array, mid + 1, end);
    return newNode;
  }
  insert(value) {
    const newNode = new Node(value);
    let current = this.root;
    while (current.left !== null || current.right !== null) {
      if (current.data === newNode.data) return;
      else if (current.data > newNode.data) {
        if (current.left === null) {
          current.left = newNode;
        } else {
          current = current.left;
        }
      } else {
        if (current.right === null) {
          current.right = newNode;
        } else {
          current = current.right;
        }
      }
    }

    if (current.data === newNode.data) return;
    else if (current.data > newNode.data) {
      current.left = newNode;
    } else {
      current.right = newNode;
    }
  }

  deleteItem(value) {
    let current = this.root;
    let lastNode;
    let replaceNode;
    let directionNode;
    while (current !== null && current.data !== value) {
      lastNode = current;
      if (current.data > value) {
        current = current.left;
        directionNode = 'left';
      } else {
        current = current.right;
        directionNode = 'right';
      }
    }
    // no value found
    if (current === null) return;
    // no children
    else if (current.left === null && current.right === null) {
      if (directionNode === 'right') {
        lastNode.right = null;
      } else {
        lastNode.left = null;
      }
    }
    // two children
    else if (current.right !== null && current.left !== null) {
      replaceNode = current;
      replaceNode = replaceNode.right;
      while (replaceNode.left !== null) {
        lastNode = replaceNode;
        replaceNode = replaceNode.left;
      }
      const nodeValue = replaceNode.data;
      this.deleteItem(replaceNode.data);
      current.data = nodeValue;
    }
    // one children
    else {
      if (directionNode === 'left') {
        if (current.left === null) {
          lastNode.left = current.right;
        } else {
          lastNode.left = current.left;
        }
      } else {
        if (current.left === null) {
          lastNode.right = current.right;
        } else {
          lastNode.right = current.left;
        }
      }
    }
  }
  find(value) {
    let current = this.root;
    while (current !== null && current.data !== value) {
      if (current.data > value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return current;
  }
  levelOrder(callback) {
    let answerArray = [];
    let notDiscoverArray = [];
    let current = this.root;
    function levelOrderRecursive(node) {
      console.log(answerArray);
      console.log(notDiscoverArray);
      if (callback) {
        callback(node);
      } else {
        if (node !== undefined) notDiscoverArray.push(node);
        if (notDiscoverArray.length === 0) return;
        if (node.left !== null) notDiscoverArray.push(node.left);
        if (node.right !== null) notDiscoverArray.push(node.right);
      }
      const firstNode = notDiscoverArray.shift();
      answerArray.push(firstNode);
      levelOrderRecursive(notDiscoverArray[0]);
    }
    levelOrderRecursive(current);
    if (!callback) {
      return answerArray;
    }
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

function addTwo(node) {
  node.data = node.data + 2;
}
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const exerciseArray = [36, 34, 32, 40, 20, 30, 50, 70, 60, 65, 80, 75, 85];
const treeTest = new Tree(array);
const firstNode = treeTest.root;
treeTest.insert(323);
treeTest.insert(325);
console.log(treeTest.levelOrder());
treeTest.prettyPrint(firstNode);
let test = [];
console.log(test[0]);
