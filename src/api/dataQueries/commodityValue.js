/*
    This dataQuery uses the "dataValues" resource.

    Read more on "dataValues" on the project page:
    https://www.uio.no/studier/emner/matnat/ifi/IN5320/h21/project/case-1/index.html

    Loads the end balance of one commodity.
*/


// Not complete.
// This file can be seen as a template for how to write a "dynamic dataQuery".
// It's a function that returns a dataQuery depending on specific parameters.
// These functions cannot be called within the render-loop.

// Returns a dataQuery for getting a specific commodity value
// categoryOption: J2Qf1jtZuj8
export const getCommodityValue = (orgUnitId, period, dataElement, categoryOption) => ({
    commodityValue: {
        resource: 'dataValues',
        params: {
            de: dataElement,
            pe: period,
            ou: orgUnitId,
            co: categoryOption,
        }
    }
})

export const prepareCommodityValue = (data) => {
    // Present the commodity value in a clean way.
    return data;
}