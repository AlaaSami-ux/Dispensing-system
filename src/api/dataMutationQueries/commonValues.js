export const dataSetId = "ULowA8V3ucd";
export const orgUnit = "ImspTQPwCqd";
export const period = "202110"; // Hard-coded
export const namespace = "in5320-G30"; // This is the dataStore namespace for this project.

export const endBalanceCategoryOption = "J2Qf1jtZuj8";
export const quantityToBeOrderedCatagoryOption = "KPP63zJPkOu"
export const consumptionCategoryOption = "rQLFnNXXIL0";

/*
Function to make a random key.
This function is a mathimatical expresion that uses tha date and time to make a random integer.
The integer is then multiplied by 10 to make room for a integer between 0 and 9 for collition resistance.
*/
function newKey() {
  const date = new Date();
  const keyValue = ((date.getFullYear() * 10000000000) + (date.getMonth() * 100000000) +
                (date.getDate() * 1000000) + (date.getHours() * 10000 ) +
                (date.getMinutes() * 100) + date.getSeconds()) * 10 +
                Math.floor(Math.random() * 10);
  return keyValue.toString(16); //Return hex value of the key value
}
export const key = newKey();

export const formatDisplayname = displayName => displayName.includes('Commodities - ') ? displayName.split('-')[1].trimLeft() : displayName;
export const formatTime = time => ( (time.toString().length < 2) ? "0"+time : time );

export function commoditiesDict(basicData) {
  const commodities = {}
  for (const comodity of basicData.commodityNames) {
    commodities[comodity.id] = formatDisplayname(comodity.name);
  }
  return commodities;
}
