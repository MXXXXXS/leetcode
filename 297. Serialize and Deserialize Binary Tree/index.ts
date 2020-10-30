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

/*
 * Encodes a tree to a single string.
 */
type PrettyTreeConfig = Array<Array<string>>

interface EnhancedTreeNode extends TreeNode {
  indent: number
  depth: number
  left: EnhancedTreeNode | null
  right: EnhancedTreeNode | null
}

function printTree(root: TreeNode | null): string[][] {
  function getH(t: TreeNode | null): number {
    if (t) {
      return Math.max(getH(t.left), getH(t.right)) + 1
    }
    return 0
  }

  const h = getH(root)

  function isNum(n: any) {
    return !Number.isNaN(n)
  }

  function enhanceTreeWithIndent(treeToEnhance: TreeNode | null) {
    const parentTree = treeToEnhance as EnhancedTreeNode

    if (!parentTree) return parentTree

    if (parentTree && isNum(parentTree.val)) {
      parentTree.depth = 1
      parentTree.indent = 2 ** (h - 1) - 1
    }

    function addIndent(eTreeNode: EnhancedTreeNode) {
      const parentETreeNode = eTreeNode
      const { depth } = parentETreeNode
      const indent = 2 ** (h - depth - 1)

      const { left } = parentETreeNode
      if (left && isNum(left.val)) {
        left.depth = depth + 1
        left.indent = parentETreeNode.indent - indent
        parentETreeNode.left = left
        addIndent(left)
      }
      const { right } = parentETreeNode
      if (right && isNum(right.val)) {
        right.depth = depth + 1
        right.indent = parentETreeNode.indent + indent
        parentETreeNode.right = right
        addIndent(right)
      }
    }

    addIndent(parentTree)

    return parentTree
  }

  const leafs: PrettyTreeConfig = []

  function collect(eTree: EnhancedTreeNode) {
    const val = String(eTree.val)
    if (val) {
      const index = eTree.depth - 1
      if (!Array.isArray(leafs[index])) {
        const leaf: Array<string> = Array(2 ** h - 1)
        leafs[index] = leaf.fill('')
      }

      const basePoint = eTree.indent

      leafs[index][basePoint] = val
    }
  }

  function walk(
    eTree: EnhancedTreeNode,
    fn: (eTree: EnhancedTreeNode) => void,
  ) {
    fn(eTree)
    if (eTree.left) {
      walk(eTree.left, fn)
    }
    if (eTree.right) {
      walk(eTree.right, fn)
    }
  }

  const enhancedTree = enhanceTreeWithIndent(root)

  if (enhancedTree)
    walk(enhancedTree, collect)

  return leafs
}

interface NestedArray extends Array<NestedArray | string | null> {}

function flatArr(arr: NestedArray) {
  const flattendArr: Array<any> = []

  function flat(arr: NestedArray) {
    arr.forEach(el => {
      if (Array.isArray(el)) {
        flat(el)
      } else {
        flattendArr.push(el)
      }
    })
  }

  flat(arr)

  return flattendArr
}

export function serialize(root: TreeNode | null): string {
  const resultArr = flatArr(printTree(root)).filter(el => el !== '')
  return JSON.stringify(resultArr)
};

/*
 * Decodes your encoded data to tree.
 */

enum Direction {
  left = "0",
  right = "1"
}

type binTreePath = Array<Direction>

class TreeNodeWithPath {
  val: number | null
  path: binTreePath
  constructor(val?: number, path: binTreePath = []) {
    this.val = val
    this.path = path
  }
}

function dec2bin(dec: number) {
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

function genBinaryTree(nodeVals: Array<number|null>) {
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

  function gen(t: TreeNode, path: binTreePath, val: number | null) {
    const direction = path.shift()
    if (direction === '0') {
      if (!t.left)
        t.left = new TreeNode()
      gen(t.left, path, val)
    } else if (direction === '1') {
      if (!t.right)
        t.right = new TreeNode()
      gen(t.right, path, val)
    } else if (val) {
      t.val = val
    }
  }

  codes.forEach(({ val, path }) => {
    gen(root, path, val)
  })

  return root
}

export function deserialize(data: string): TreeNode | null {
  const nodes = data.split(',').map(valStr => valStr === 'null' ? null : parseInt(valStr))
  return genBinaryTree(nodes)
};