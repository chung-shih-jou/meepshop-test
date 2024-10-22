class TreeNode {
  constructor(value) {
    // The value of the node.
    this.value = value;
    // The left child of the node.
    this.left = null;
    // The right child of the node.
    this.right = null;
  }
}

function ArrayToTreeNode(arr = []) {
  if (!arr.length) return null;
  const root = new TreeNode(arr[0]);
  const tns = [root];
  for (let i = 1; i < arr.length; i += 2) {
    const tn = tns.shift();
    if (tn) {
      tn.left = new TreeNode(arr[i]);
      tn.right = new TreeNode(arr[i + 1]);
      tns.push(tn.left);
      tns.push(tn.right);
    }
  }
  return root;
}

module.exports = { TreeNode, ArrayToTreeNode };
