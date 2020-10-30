export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

function construct(nums: number[], tree: TreeNode) {
  if (nums.length <= 0)
    return
  const maxNum = Math.max(...nums)
  const maxNumIndex = nums.indexOf(maxNum)

  tree.val = maxNum

  if (maxNumIndex > 0) {
    const leftPartNums = nums.slice(0, maxNumIndex)
    if (leftPartNums.length > 0) {
      tree.left = new TreeNode()
      construct(leftPartNums, tree.left)
    }
  }

  if (maxNumIndex < nums.length - 1) {
    const rightPartNums = nums.slice(maxNumIndex + 1)
    if (rightPartNums.length > 0) {
      tree.right = new TreeNode()
      construct(rightPartNums, tree.right)
    }
  }
}

export default function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  const result = new TreeNode()
  construct(nums, result)

  return result
};
