/*
    This dataQuery uses the "dataStore" resource.
    Documentation for "Data Store":
    https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-236/data-store.html
*/
import { namespace } from "../dataMutationQueries/commonValues"
const key = 'TRANSACTIONS'

export const transactionLog = {
    dataStore: {
      resource: `dataStore/${namespace}/${key}`
    }
}
