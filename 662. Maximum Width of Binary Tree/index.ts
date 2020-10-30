class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

function isNum(n) {
  return !Number.isNaN(n)
}

class TreeNodeWithPath extends TreeNode {
  val: number | undefined
  path: binTreePath
  left: TreeNodeWithPath | null
  right: TreeNodeWithPath | null
}

enum Direction {
  left = "0",
  right = "1"
}

type binTreePath = Array<Direction>

function binTreePathToN

export default function widthOfBinaryTree(root: TreeNode | null): number {
  const levels: Array<Array<binTreePath>> = []

  function walk(tree: TreeNodeWithPath | null, path: binTreePath, depth: number) {
    if (!tree)
      return
    if (tree.left) {
      const leftPath = [Direction.left, ...path]
      if (Array.isArray(levels[leftPath.length])) {
        levels[leftPath.length] = []
      }
      levels[leftPath.length].push(leftPath)
      walk(tree.left, leftPath, depth + 1)
    }
    if (tree.right) {
      const rightPath = [Direction.right, ...path]
      if (Array.isArray(levels[rightPath.length])) {
        levels[rightPath.length] = []
      }
      levels[rightPath.length].push(rightPath)
      walk(tree.right, rightPath, depth + 1)
    }
  }

  const rootWithPath = root as TreeNodeWithPath
  rootWithPath.path = []
  walk(rootWithPath, [], 0)

  let maxWidth = 0

  levels.forEach((level, index) => {
    const leftIndex = level.indexOf(true)
    const rightIndex = level.reverse().indexOf(true)
    if (leftIndex > -1) {
      const width = level.length - rightIndex - leftIndex
      maxWidth = width > maxWidth ? width : maxWidth
    }
  })

  return maxWidth
};