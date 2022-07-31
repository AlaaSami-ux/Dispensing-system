import React, { useState } from "react";
import { useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader,
  Menu, MenuItem,
  DataTable,
  DataTableHead,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableColumnHeader,
} from '@dhis2/ui'

import classes from "../App.module.css";
import { transactionLog } from "../api/dataQueries/transactionLog";


export default function DispensingRegistry(props) {
  const { commodities } = props;
  const { loading, error, data } = useDataQuery(transactionLog)

  if (error) {
      return <span>ERROR: {error.message}</span>
  }

  if (loading) {
      return <CircularLoader />
  }

  if (data) {
      return renderTable(data, commodities)      
  }
}


function renderTable(data, commodities) {
  let transactions = data.dataStore.transactions;

  return (
    <div className={classes.datasetsTable}>
      <DataTable>
        <DataTableHead>
          {renderHeadRow()}
        </DataTableHead>
        <DataTableBody>
          {transactions?.map((transaction) => {
            return renderTableRow(commodities, transaction)
          })}
        </DataTableBody>
      </DataTable>
    </div>
  )
}


function renderHeadRow() {
  return (
    <DataTableRow large>
      <DataTableColumnHeader large fixed top="0">Commodity</DataTableColumnHeader>
      <DataTableColumnHeader large fixed top="0">Amount</DataTableColumnHeader>
      <DataTableColumnHeader large fixed top="0">Dispensed by</DataTableColumnHeader>
      <DataTableColumnHeader large fixed top="0">Dispensed to</DataTableColumnHeader>
      <DataTableColumnHeader large fixed top="0">Date</DataTableColumnHeader>
      <DataTableColumnHeader large fixed top="0">Time</DataTableColumnHeader>
    </DataTableRow>
  )
}


function renderTableRow(commodities, transaction) {
  return (
    <DataTableRow key={transaction.id}>
      <DataTableCell>{commodities[transaction.commodity.id]}</DataTableCell>
      <DataTableCell>{transaction.commodity.amount}</DataTableCell>
      <DataTableCell>{transaction.dispensedBy}</DataTableCell>
      <DataTableCell>{transaction.dispensedTo}</DataTableCell>
      <DataTableCell>{transaction.timestamp.date}</DataTableCell>
      <DataTableCell>{transaction.timestamp.time}</DataTableCell>
    </DataTableRow>
  )
}
