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
    if (current === null) return;
    else if (current.left === null && current.right === null) {
      if (directionNode === 'right') {
        lastNode.right = null;
      } else {
        lastNode.left = null;
      }
    } else if (current.right !== null && current.left !== null) {
      replaceNode = current;
      replaceNode = replaceNode.right;
      while (replaceNode.left !== null) {
        lastNode = replaceNode;
        replaceNode = replaceNode.left;
      }
      const nodeValue = replaceNode.data;
      this.deleteItem(replaceNode.data);
      current.data = nodeValue;
    } else {
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
treeTest.insert(325);

treeTest.deleteItem(4);
treeTest.prettyPrint(firstNode);
