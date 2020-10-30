import {serialize, deserialize} from '../index'
import genBinaryTree from '../../utils/binaryTree/genBinaryTree'

const nodesStr0 = '1,2,3,null,null,4,5'

const tree0 = deserialize(nodesStr0)

console.log(JSON.stringify(tree0))
console.log(serialize(tree0))