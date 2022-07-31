import {
    dataSetId, orgUnit, period,
    endBalanceCategoryOption
} from "./commonValues";


export const updateEndBalance = {
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
                value: data.receivedAmount
            }
        ]
    })
 
}