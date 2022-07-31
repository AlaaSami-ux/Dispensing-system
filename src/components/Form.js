import {
    ReactFinalForm,
    InputFieldFF,
    Button,
    SingleSelectFieldFF,
    hasValue,
    number,
    alphaNumeric,
    composeValidators,
} from '@dhis2/ui';
import classes from "../App.module.css";
import { namespace, formatDisplayname } from "../api/dataMutationQueries/commonValues"

export function Form(props) {
    const { data, onSubmit } = props;

    const commodityOptions = data.commodityNames.map(element => {
      return { label: formatDisplayname(element.name), value: element.id }
    })

    return (
      <ReactFinalForm.Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>

            <ReactFinalForm.Field
              name="commodityId"
              label="Commodity"
              component={SingleSelectFieldFF}
              validate={hasValue}
              options={commodityOptions}
            />

            <ReactFinalForm.Field
              name="amount"
              label="Amount"
              component={InputFieldFF}
              validate={composeValidators(hasValue, number)} // Add validator for maxValue == endBalance
            />

            <ReactFinalForm.Field
              name="dispensedTo"
              label="Dispensed to"
              component={InputFieldFF}
              validate={composeValidators(hasValue, alphaNumeric)}
            />

            <Button type="submit" primary className={classes.dispenseSubmit}>
              Submit
            </Button>

          </form>
        )}
      </ReactFinalForm.Form>
    )
}
