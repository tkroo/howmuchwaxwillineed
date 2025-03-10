import type { Wax, Container, TempScale, TempUnit } from '$lib/types';
import { waxes, TempScales } from '$lib/appConstants';

export const s = $state({
  groups: [] as { type: any; quantity: number; id: string }[],
  waxType: waxes[0],
  tempUnit: TempScales[0].value,
});


export const TotalWaxNeeded = () => {
  const totalWater = s.groups.reduce((total, currentObject) => {
    return total + (currentObject.type.waterGrams * currentObject.quantity);
  }, 0);
  return (totalWater * s.waxType.specificGravity).toFixed(1);
};

// let groupsTotalWaterGrams = $derived.by(() => s.groups.reduce((total, currentObject) => {
//   return total + (currentObject.type.waterGrams * currentObject.quantity);
// }, 0));
