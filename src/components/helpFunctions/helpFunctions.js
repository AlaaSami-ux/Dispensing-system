export const formatDisplayname = displayName => displayName.includes('Commodities - ') ? displayName.split('-')[1].trimLeft() : displayName;

export const formatTime = time => ( (time.toString().length < 2) ? "0"+time : time );

export function commoditiesDict(basicData) {
  const commodities = {}
  for (const comodity of basicData.commodityNames) {
    commodities[comodity.id] = formatDisplayname(comodity.name);
  }
  return commodities;
}