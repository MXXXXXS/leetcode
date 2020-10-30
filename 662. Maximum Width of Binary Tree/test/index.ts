import genBinaryTree from '../../utils/binaryTree/genBinaryTree'
import widthOfBinaryTree from '../index'

const binaryTree0Vals = [1,3,2,5,3,null,9]

const binaryTree0 = genBinaryTree(binaryTree0Vals)

const widthOfbinaryTree0 = widthOfBinaryTree(binaryTree0)

console.log(JSON.stringify(binaryTree0, null, 2))
console.log(widthOfbinaryTree0)
