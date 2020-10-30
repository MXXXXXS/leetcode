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

enum Direction {
  left = "0",
  right = "1"
}

type binTreePath = Array<Direction>

class TreeNodeWithPath {
  val: number | undefined
  path: binTreePath
}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function padding(str: string, n: number) {
  const strLen = str.length
  if (strLen >= n)
    return str.slice(0, n).split('') as binTreePath
  let paddedStr = str
  for (let index = 0; index < n - strLen; index++) {
    paddedStr = "0" + paddedStr
  }
  return paddedStr.split('') as binTreePath
}

export default function genBinaryTree(nodeVals: number[]) {
  const root = new TreeNode()
  const codes: Array<TreeNodeWithPath> = []
  // const prefix = Direction.left

  for (let index = 0, start = 0, end = 0; end < nodeVals.length; index += 1) {
    start = end
    end = 2 ** (index + 1) - 1

    const nodes = nodeVals.slice(start, end)

    for (let indexOfNodes = 0; indexOfNodes < nodes.length; indexOfNodes++) {
      const binIndex = dec2bin(indexOfNodes)
      const code = padding(binIndex, index)
      const nodeWithPath: TreeNodeWithPath = {
        val: nodeVals[start + indexOfNodes],
        path: [...code]
      }
      codes.push(nodeWithPath)
    }
  }

  function gen(t: TreeNode, path: binTreePath, val: number) {
    const direction = path.shift()
    if (direction === '0') {
      if (!t.left)
        t.left = new TreeNode()
      gen(t.left, path, val)
    } else if (direction === '1') {
      if (!t.right)
        t.right = new TreeNode()
      gen(t.right, path, val)
    } else {
      t.val = val
    }
  }

  codes.forEach(({ val, path }) => {
    gen(root, path, val)
  })

  return root
}