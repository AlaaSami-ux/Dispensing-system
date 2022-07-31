// TODO: Add Search field

import React from "react";
import { useDataQuery } from '@dhis2/app-runtime'
import { useEffect, useState} from "react";
import { CircularLoader,
  DataTable,
  DataTableHead,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableColumnHeader,
  Button
} from '@dhis2/ui'

import { formatDisplayname } from "./helpFunctions/helpFunctions";
import { commodityValues, mergeData } from "../api/dataQueries/commodityValues";
import Modul from "./Modul";

function renderHeadRow() {
  return (
    <DataTableRow large >
      <DataTableColumnHeader large fixed top="0">Commodity</DataTableColumnHeader>
      <DataTableColumnHeader large fixed top="0">End Balance</DataTableColumnHeader>
    </DataTableRow>
  )
}

//Sending data over to the modul
function renderModal(modalCommodity, closeModal){
  return <Modul
    commodityId = {modalCommodity.id}
    displayName = {formatDisplayname(modalCommodity.name)}
    value = {modalCommodity.endBalance} // The current balance of the consumtion
    consumption = {modalCommodity.consumtion} // The consumtion up unitl now
    close = {closeModal}
  />
}

export default function StockBalance(props) {
  const basicData = props.data;
  const { data, loading, error, refetch } = useDataQuery(commodityValues)
  const [modalCommodity, setModalCommodity] = useState(null)

  useEffect(() => {
    if (!modalCommodity) {
      setTimeout(() => {
        refetch();
      }, 2000); // Waiting to avoid race condition
    }
  }, [modalCommodity])

  const closeModal = () => {
    setModalCommodity(null);
  }

  if (error) {
    return <span>Error loading basic data: {error.message}</span>
  }

  if (loading) {
    return <CircularLoader />
  }

  if (data) {
    const mergedData = mergeData(basicData.commodityNames, data);

    return <DataTable>
      <DataTableHead>
        {renderHeadRow()}
      </DataTableHead>
        <DataTableBody>
          {mergedData.map((commodity, index) => (
            <DataTableRow key={index}>
              <DataTableCell onClick = {() => setModalCommodity(commodity)}>
                {formatDisplayname(commodity.name)}
              </DataTableCell>
              <DataTableCell onClick = {() => setModalCommodity(null)}>
                {commodity.endBalance}
              </DataTableCell>
            </DataTableRow>
          ))}
      </DataTableBody>
      {(modalCommodity) ? renderModal(modalCommodity, closeModal) : null}
    </DataTable>
  }
}
