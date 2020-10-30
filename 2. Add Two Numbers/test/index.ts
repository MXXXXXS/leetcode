import addTwoNumbers, { ListNode } from '../index'

function genListNode(listNodesVals: Array<number>) {
  const result = new ListNode()
  listNodesVals.reduce((listNodes, num, index) => {
    listNodes.val = num
    if (index !== listNodesVals.length - 1) {
      listNodes.next = new ListNode()
    }
    return listNodes.next
  }, result)
  return result
}

const l0: ListNode = genListNode([1, 9, 4])
const l1: ListNode = genListNode([1, 2, 7])
const result0 = addTwoNumbers(l0, l1)

console.log(JSON.stringify(result0))
