import {namespace} from "./commonValues.js"

export const updateTolerances = {
    resource: `dataStore/${namespace}/TOLERANCES`,
    type: 'update',
    data: data => data
}
