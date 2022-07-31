/*
    This dataQuery uses the "me" and "dataSets" resources.
    Documentation for "me":
    https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-236/users.html#webapi_current_user_information

    Read more on "dataSets" on the project page:
    https://www.uio.no/studier/emner/matnat/ifi/IN5320/h21/project/case-1/index.html

    The data returned by this query is all the data that should be loaded into the app
    when the site is loaded. It should always be available to all components through props.
*/

const lifeSavingCommodities = "ULowA8V3ucd"; // Hard Coded for simplicity

export const getBasicData = {
    user: {
        resource: 'me',
        params: {
            fields: [
                'id',
                'name',
                'organisationUnits'
            ],
        },
    },
    commodities: {
        resource: `dataSets/${lifeSavingCommodities}`,
        params: {
            fields: [
            'id',
            'name',
            'dataSetElements[dataElement[name,id,categoryCombo[name,id,categoryOptionCombos[name,id]]]'
            ]
        }
    }
}

export const prepareBasicData = (data) => {
    const user = {
        id: data.user.id,
        name: data.user.name
    };

    const orgUnitId = data.user.organisationUnits[0].id;

    const commodityNames = data.commodities.dataSetElements.map((item) => {
        const element = item.dataElement;
        return {
            id: element.id,
            name: element.name
        }
    }).sort((a, b) => (a.name >= b.name) ? 1 : -1);

    const categoryCombo = data.commodities.dataSetElements[0].dataElement.categoryCombo;

    return { user, orgUnitId, commodityNames, categoryCombo };
} 