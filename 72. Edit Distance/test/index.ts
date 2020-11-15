import genMatrix, {getOps, Modification, Operation} from '../index'

const textA = "abcde"
const textB = "ace"

const matrix = genMatrix(textA, textB)

const opts: Modification[] = getOps(matrix, textA, textB)

function modify(textSrc: string[], opts: Modification[]) {
  opts.forEach(op => {
    switch (op.operation) {
      case Operation.sub: {
        textSrc[op.postion] = op.content
        break
      }
      case Operation.add: {
        textSrc.splice(op.postion, 0, op.content)
        break
      }
      case Operation.del: {
        textSrc.splice(op.postion, 1)
        break
      }
    }
    console.log(textSrc)
  })
  return textSrc
}

modify(textA.split(''), opts)
