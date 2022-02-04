type Layer = boolean[];

type Step = ["up" | "down", number];

type Pool = [poolStart: number, poolEnd: number];

export function calcPool(pool: Pool) {
  return pool[1] - pool[0];
}

export function scanPool(layerSteps: Step[]): Pool[] {
  let isPool = false;
  let poolStart = -1;
  const pools = [];
  layerSteps.forEach((step) => {
    if (step[0] === "down") {
      isPool = true;
      poolStart = step[1];
    } else {
      if (isPool) {
        isPool = false;
        pools.push([poolStart, step[1]]);
        poolStart = -1;
      }
    }
  });
  return pools;
}

export function scanStep(layer: Layer): Step[] {
  let previousBlockState = false;
  const results = [];
  layer.forEach((isBlock, index) => {
    if (isBlock) {
      if (!previousBlockState) {
        // 空块 -> 实块
        results.push(["up", index]);
      }
    } else {
      if (previousBlockState) {
        // 实块 -> 空块
        results.push(["down", index]);
      }
    }
    previousBlockState = isBlock;
  });
  return results;
}

export function layerSlicer(heightArray: number[]) {
  const layers = Math.max(...heightArray);
  const layerSlices: Layer[] = [];
  for (let layer = 0; layer <= layers; layer++) {
    const layerSlice = heightArray.map((height) => height >= layer);
    layerSlices.push(layerSlice);
  }
  return layerSlices;
}

export function trap(heights) {
  const layerSlices = layerSlicer(heights);
  const layerSteps = layerSlices.map((layerSlice) => scanStep(layerSlice));
  const layerPools = layerSteps.map((layerStep) => scanPool(layerStep));

  return layerPools.flat().reduce((rains, pool) => {
    rains += calcPool(pool);
    return rains;
  }, 0);
}
