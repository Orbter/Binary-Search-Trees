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
    let lastNode;
    while (current.left !== null || current.right !== null) {
      lastNode = current;
      if (current.data === newNode.data) return;
      else if (current.data > newNode.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    if (current.data === newNode.data) return;
    else if (current.data > newNode.data) {
      current.left = newNode;
    } else {
      current.right = newNode;
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
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const treeTest = new Tree(array);
const firstNode = treeTest.root;
treeTest.insert(323);
treeTest.prettyPrint(firstNode);
