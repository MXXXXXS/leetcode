/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

class ExListNode extends ListNode {
  index: number
  carry: boolean
  next: ExListNode | null
  constructor(val?: number, next?: ListNode | null, index?: number, carry?: boolean) {
    super(val, next)
    this.next = null
    this.index = index || 0
    this.carry = Boolean(carry)
  }
}

export default function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const result = new ExListNode(0, null, 0, false)

  function isNum(n: any) {
    return !Number.isNaN(n)
  }

  function extendsListNode(l: ListNode | null) {
    if (!l) {
      return null
    }
    const exL = l as ExListNode
    exL.index = 0
    exL.carry = false
    function ex(l: ExListNode | null, index: number) {
      if (l && isNum(l.val)) {
        l.index = index
        l.carry = false
        ex(l.next, index + 1)
      }
    }

    ex(exL.next, 1)

    return exL
  }

  function add(result: ExListNode, subL1: ExListNode | null, subL2: ExListNode | null) {
    const sum = (subL1?.val || 0) + (subL2?.val || 0)
    result.carry = sum > 9
    result.val = sum % 10

    if (subL1?.next || subL2?.next) {
      result.next = new ExListNode(0, null, result.index + 1, false)
      add(result.next, subL1?.next || null, subL2?.next || null)
    }
  }

  const exL1 = extendsListNode(l1)
  const exL2 = extendsListNode(l2)

  add(result, exL1, exL2)

  function addCarry(result: ExListNode | null) {
    if (result) {
      if (result.carry || result.val > 9) {
        if (!result.next) {
          result.next = new ExListNode(0, null, result.index + 1, false)
        }
        result.next.val += 1
      }
      if (result.carry) {
        result.carry = false
      }
      if (result.val > 9) {
        result.val %= 10
      }
      addCarry(result.next)
    }
    
    return result
  }

  return addCarry(result)
};