/*
    This dataQuery uses the "dataValueSets" resource.

    Read more on "dataValuesSets" on the project page:
    https://www.uio.no/studier/emner/matnat/ifi/IN5320/h21/project/case-1/index.html

    Loads the end balance of all the commodities.
*/

import {
    dataSetId, period, orgUnit,
    endBalanceCategoryOption, consumptionCategoryOption, quantityToBeOrderedCatagoryOption
} from "../dataMutationQueries/commonValues";

// A dataQuery for getting the values of each commodity
// TODO: Server-side filtering. Currently loads way too much excess information.
export const commodityValues = {
    commodityValues: {
        resource: 'dataValueSets',
        params: {
            orgUnit,
            dataSet: dataSetId,
            period: period,
            fields: [
                'value',
                'id',
                'name'
            ]
        }
    }
}

//Function to merge the names with the endBalance, consumtion and quantity left to be ordered values
export const mergeData = (commodityNames, commodityValues) => {
    const commodities = commodityNames.map(commodity => {
        const consumtion = commodityValues.commodityValues.dataValues.find(dataValue => {
            return commodity.id === dataValue.dataElement &&
                dataValue.categoryOptionCombo === consumptionCategoryOption
        }).value //Merge inn consumtion value
        const endBalance = commodityValues.commodityValues.dataValues.find(dataValue => {
            return commodity.id === dataValue.dataElement &&
                dataValue.categoryOptionCombo === endBalanceCategoryOption
        }).value //Merge inn the end balance
        const toBeOrdered = commodityValues.commodityValues.dataValues.find(dataValue => {
            return commodity.id === dataValue.dataElement &&
                dataValue.categoryOptionCombo === quantityToBeOrderedCatagoryOption
        }).value //Merge inn the quantity ?left? to be ordered
        return { id: commodity.id, name: commodity.name, endBalance, consumtion, toBeOrdered }
    }).sort((a, b) => (a.name >= b.name) ? 1 : -1)
    return commodities;
}
