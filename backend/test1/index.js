function revertBinaryTree(binaryTree) {
  let arr = [binaryTree];
  while (arr.length) {
    const current = arr.pop();
    if (current) {
      let tmp = current.left;
      current.left = current.right;
      current.right = tmp;
      arr.push(current.left);
      arr.push(current.right);
    }
  }
  return binaryTree;
}

// Constraints:
// The number of nodes in the tree is in the range [0, 100].
// -100 <= Node.val <= 100

module.exports = { revertBinaryTree };
