import React from 'react'
import {  useState} from 'react'
import { useDataQuery, useDataMutation } from "@dhis2/app-runtime";
import {
  DataTable,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
  Button,
  ButtonStrip,
  Input,
  Tooltip
} from '@dhis2/ui'

import { getTolerances } from "../api/dataQueries/tolerances.js";

import { updateEndBalance } from "../api/dataMutationQueries/updateEndBalance";
import { updateTolerances } from '../api/dataMutationQueries/updateTolerances';

function Modul(props) {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(null);

  const { data, loading, error } = useDataQuery(getTolerances)

  const [mutateEndBalance, { loadingEndBalanceChange, errorEndBalanceChange}] = useDataMutation(updateEndBalance);
  const [mutateTolerances, { loadingTolerancesChange, errorTolerancesChange}] = useDataMutation(updateTolerances);


  const handleMinValueChange = (event) => {
    setMinValue(parseInt(event.value));
  };

  const handleMaxValueChange = (event) => {
    setMaxValue(parseInt(event.value));
  };

  const handleNewValueChange = (event) => {
    setReceivedAmount(parseInt(event.value));
  };

  const onClickhandler = (data) => {

    mutateEndBalance({
      dataElement: props.commodityId,
      receivedAmount: receivedAmount + parseInt(props.value)
    });

    data[props.commodityId] = { minValue, maxValue };
    mutateTolerances(data);

    props.close()
    // location.reload(); // HACK!!!
  }

  if (data) {
    const tolerances = data.dataStore[props.commodityId]
    if (!minValue || !maxValue) {
      setMinValue(tolerances.minValue)
      setMaxValue(tolerances.maxValue)
    }

    return (
<Modal large>
  <ModalTitle>Change Commodity Details</ModalTitle>
    <ModalContent>
      <DataTable>
        <DataTableBody>
          <DataTableRow>
            <DataTableCell>Comodity : {props.displayName}</DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell>Current Stock : {props.value}</DataTableCell>
            <DataTableCell>Consumption : {props.consumption}</DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell colSpan="2">
              <Tooltip content="These tolerances are used to warn you when you are running low." placement="right">
                Tolerances
              </Tooltip>
            </DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell>
              <Tooltip content="What is a dangerously low amount of this commodity?" placement="right">
                Minumum amount
              </Tooltip>
            </DataTableCell>
            <DataTableCell>
              <Tooltip content="How much do you need of this commodity to comforably last the month?" placement="right">
                Prefered amount
              </Tooltip>
            </DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell>
              <Input dense type="number" name ="min" min="1" value={minValue.toString()} onChange={handleMinValueChange} placeholder={tolerances.minValue.toString()} />
            </DataTableCell>
            <DataTableCell >
              <Input dense type="number" name ="max"  min="1" value={maxValue.toString()} onChange={handleMaxValueChange} placeholder={tolerances.maxValue.toString()} />
            </DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell>
              <Tooltip content="How much more of this commodity have you received?" placement="right">
                Received Amount
              </Tooltip>
            </DataTableCell>
            <DataTableCell >
              <Input dense type="number" name ="Received Amount" min="1" onChange ={handleNewValueChange}/>
            </DataTableCell>
          </DataTableRow>
        </DataTableBody>
        </DataTable>
    </ModalContent>
    <ModalActions>
        <ButtonStrip end>
        <Button primary onClick ={() => onClickhandler(data.dataStore)}>
                Save Changes
            </Button>
            <Button secondary  onClick = {() => props.close()}>
              Cancel
            </Button>
        </ButtonStrip>
    </ModalActions>
</Modal>
  )
  } else {
    return null;
  }
}
export default Modul
