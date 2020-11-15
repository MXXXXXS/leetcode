import print2dArray from '../utils/print2dArray'

enum Path {
  left,
  up,
  leftUp,
  none,
}

interface lcsMatrixEl {
  len: number;
  path: Path;
}

function longestCommonSubsequence(text1: string, text2: string): number {
  const lcsMatrix: Array<Array<lcsMatrixEl>> = [];

  for (let indexA = 0; indexA <= text1.length; indexA++) {
    if (indexA === 0) {
      lcsMatrix.push(
        new Array(text2.length + 1).fill({
          len: 0,
          path: Path.none,
        })
      );
    } else {
      lcsMatrix.push(
        new Array(text2.length + 1).fill(
          {
            len: 0,
            path: Path.none,
          },
          0,
          1
        )
      );
    }
  }

  function lcs(strA: string, strB: string) {
    for (let indexA = 1; indexA <= strA.length; indexA++) {
      const wordA = strA[indexA - 1];
      for (let indexB = 1; indexB <= strB.length; indexB++) {
        const wordB = strB[indexB - 1];
        if (wordA === wordB) {
          lcsMatrix[indexA][indexB] = {
            len: lcsMatrix[indexA - 1][indexB - 1].len + 1,
            path: Path.leftUp,
          };
        } else if (
          lcsMatrix[indexA][indexB - 1].len >= lcsMatrix[indexA - 1][indexB].len
        ) {
          lcsMatrix[indexA][indexB] = {
            len: lcsMatrix[indexA][indexB - 1].len,
            path: Path.left,
          };
        } else {
          lcsMatrix[indexA][indexB] = {
            len: lcsMatrix[indexA - 1][indexB].len,
            path: Path.up,
          };
        }
      }
    }
  }

  let lcsStr = "";

  function printlcs(indexA: number, indexB: number) {
    if (indexA === 0 || indexB === 0) return;
    if (lcsMatrix[indexA][indexB].path === Path.leftUp) {
      printlcs(indexA - 1, indexB - 1);
      lcsStr += text1[indexA - 1];
    } else if (lcsMatrix[indexA][indexB].path === Path.left) {
      printlcs(indexA, indexB - 1);
    } else {
      printlcs(indexA - 1, indexB);
    }
  }

  lcs(text1, text2)

  print2dArray<lcsMatrixEl>(lcsMatrix, (el) => el.len)

  printlcs(text1.length, text2.length)
  console.log(lcsStr)

  return lcsMatrix[text1.length][text2.length].len
}

export default longestCommonSubsequence