import { waxes } from '$lib/containersAndWaxes';

export const s = $state({
  groups: [] as { type: any; quantity: number; id: string }[],
  waxType: waxes[0]
});


export const TotalWaxNeeded = () => {
  const totalWater = s.groups.reduce((total, currentObject) => {
    return total + (currentObject.type.waterGrams * currentObject.quantity);
  }, 0);
  return totalWater * s.waxType.specificGravity;
};

// let groupsTotalWaterGrams = $derived.by(() => s.groups.reduce((total, currentObject) => {
//   return total + (currentObject.type.waterGrams * currentObject.quantity);
// }, 0));
