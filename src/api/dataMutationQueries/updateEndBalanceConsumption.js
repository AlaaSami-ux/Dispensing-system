import {
    dataSetId, orgUnit, period,
    endBalanceCategoryOption, consumptionCategoryOption
} from "./commonValues";

export const updateEndBalanceConsumption = {
    dataSet: dataSetId,
    resource: "dataValueSets",
    type: "create",
    data: data => ({
       orgUnit,
       period,
       dataValues: [
            {
                dataElement: data.dataElement,
                categoryOptionCombo: endBalanceCategoryOption,
                value: parseInt(data.elementEndBalance) - parseInt(data.amount)
            },
            {
                dataElement: data.dataElement,
                categoryOptionCombo: consumptionCategoryOption,
                value: parseInt(data.elementConsumption) + parseInt(data.amount)
            }
        ]
    })
 
}