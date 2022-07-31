/*
    This dataMutationQuery uses the "dataStore" resource.
    Documentation for "Data Store":
    https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-236/data-store.html

    Read more on the project page:
    https://www.uio.no/studier/emner/matnat/ifi/IN5320/h21/project/case-1/index.html
*/

import {namespace, key} from "./commonValues.js"

// TODO: Maybe store all information in key (provides faster data access).

/*
// A dataMutationQuery for registering a dispensed commodity
export const registrateCommodityByKey = {
    resource: `dataStore/${namespace}/`,
    type: 'update',
    data: data => data
}*/

// A dataMutationQuery for registering a dispensed commodity
export const dispenseCommodity = {
    resource: `dataStore/${namespace}/TRANSACTIONS`,
    type: 'update',
    data: data => data
}
