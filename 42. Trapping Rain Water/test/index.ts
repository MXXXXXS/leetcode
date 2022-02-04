import { layerSlicer, scanPool, scanStep, trap } from "..";

const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

const layerSlices = layerSlicer(height);

console.log(layerSlices);

const layerSteps = layerSlices.map((layerSlice) => scanStep(layerSlice));

console.log(layerSteps);

const layerPools = layerSteps.map((layerStep) => scanPool(layerStep));

console.log(layerPools);

const rains = trap(height);

console.log(rains);
