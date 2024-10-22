const { expect, describe, test } = require("@jest/globals");
const { revertBinaryTree } = require(".");
const { ArrayToTreeNode } = require("./treenode");

describe("Manual Binary Tree", () => {
  test("Problem 1: [5, 3, 8, 1, 7, 2, 6]", () => {
    expect(revertBinaryTree(ArrayToTreeNode([5, 3, 8, 1, 7, 2, 6]))).toEqual(
      ArrayToTreeNode([5, 8, 3, 6, 2, 7, 1])
    );
  });
  test("Problem 2:[6, 8, 9]", () => {
    expect(revertBinaryTree(ArrayToTreeNode([6, 8, 9]))).toEqual(
      ArrayToTreeNode([6, 9, 8])
    );
  });
  test("Problem 3:[5,3,8,1,7,2,6,100,3,-1,null,null,null,null,null]", () => {
    expect(
      revertBinaryTree(
        ArrayToTreeNode([
          5,
          3,
          8,
          1,
          7,
          2,
          6,
          100,
          3,
          -1,
          null,
          null,
          null,
          null,
          null,
        ])
      )
    ).toEqual(
      ArrayToTreeNode([
        5,
        8,
        3,
        6,
        2,
        7,
        1,
        null,
        null,
        null,
        null,
        null,
        -1,
        3,
        100,
      ])
    );
  });
  test("Problem 4:[]", () => {
    expect(revertBinaryTree(ArrayToTreeNode([]))).toEqual(ArrayToTreeNode([]));
  });
});
