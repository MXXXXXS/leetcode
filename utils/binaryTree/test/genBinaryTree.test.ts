import genBinaryTree from '../genBinaryTree'

const arr0 = [1, 2, 3, 4, null, 6, null]

const binaryTree0 = genBinaryTree(arr0)

console.log(JSON.stringify(binaryTree0, null, 2))