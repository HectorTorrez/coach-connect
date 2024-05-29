export function convertWeight(weight: number, originalUnit: string, newUnit: string): number {
  if (newUnit === originalUnit) {
    return weight;
  }

  if (newUnit === "kg" && originalUnit === "lbs") {
    const result = weight / 2.20462;

    return result.toFixed(0) as unknown as number;
  } else if (newUnit === "lbs" && originalUnit === "kg") {
    const result = weight * 2.20462;

    return result.toFixed(0) as unknown as number;
  }

  return weight.toFixed(0) as unknown as number;
}
