import React, { useState } from "react";
import classes from "../App.module.css";
import { useDataMutation } from "@dhis2/app-runtime";
import { NoticeBox } from "@dhis2/ui";
import { useDataQuery } from "@dhis2/app-service-data";
import { Form } from "./Form"

import { formatTime } from "./helpFunctions/helpFunctions";
import { dispenseCommodity } from "../api/dataMutationQueries/createCommodityRegistration";
import { updateEndBalanceConsumption } from "../api/dataMutationQueries/updateEndBalanceConsumption";

import { commodityValues, mergeData } from "../api/dataQueries/commodityValues";
import { transactionLog } from "../api/dataQueries/transactionLog";

const dataQuery = { ...transactionLog, ...commodityValues };

let listOfTransactions = {transactions: []}
let listOfCommodities = [];

const NOTICE_STATES = {
  SUCCESS: "SUCCESS",
  NEGATIVE_WARNING: "NEGATIVE_WARNING",
  ERROR: "ERROR",
  NONE: "NONE"
};

function renderNotice(notice) {
  if (notice === NOTICE_STATES.SUCCESS) {
    return <NoticeBox
      title="Success: The commodity has been dispensed."
      className={classes.noticeBox}
    />;
  }

  if (notice === NOTICE_STATES.ERROR) {
    return <NoticeBox error
      title="Error: Transaction value cannot be grater than current stock"
      className={classes.noticeBox}
    />;
  }

  return null;
}

function renderWarning(warning) {
  if (warning === NOTICE_STATES.NEGATIVE_WARNING) {
    return <NoticeBox warning
      title= "Warning: Negative value. Negative value = Return of commodity."
      className={classes.noticeBox}
    />;
  }

  return null;
}

export default function Dispense(props) {
  const { basicData } = props;
  const uniqueKey = crypto.randomUUID();

  const [notice, setNotice] = useState(NOTICE_STATES.NONE);
  const [warning, setWarning] = useState(NOTICE_STATES.NONE);

  const { loading, error, data } = useDataQuery(dataQuery);

  if (error) {
    return <span>ERROR: {error.message}</span>
  }

  if (loading) {
    console.log('LOADING')
  }

  if (data) {
    listOfTransactions = data.dataStore;
    listOfCommodities = mergeData(basicData.commodityNames, data);
  }

  // Using the dispenseCommodity-query from createCommodityRegistration
  const [registerTransaction, { loadingRegistration, errorRegistration }] = useDataMutation(dispenseCommodity);
  const [mutateEndBalanceConsumption, { loadingEndBalanceConsumption, errorEndBalanceConsumption }] = useDataMutation(updateEndBalanceConsumption);

  function onSubmit(formInput) {
    const commodity = listOfCommodities.find(commodity => commodity.id === formInput.commodityId);

    const submittedAmount = parseInt(formInput.amount);
    const endBalance = parseInt(commodity.endBalance);

    if (submittedAmount < endBalance) {
      
      if (submittedAmount < 0 ) {
        console.warn("Warning: Negative value. Negative value = Return of commodity. Returning "
                      + (submittedAmount * -1) + "items");

        setWarning(NOTICE_STATES.NEGATIVE_WARNING);
      }

      registerTransaction(newTransaction(uniqueKey, formInput, basicData.user.name));
      mutateEndBalanceConsumption({
        dataElement: formInput.commodityId,
        amount: formInput.amount,
        elementEndBalance: commodity.endBalance,
        elementConsumption: commodity.consumption,
      });

      setNotice(NOTICE_STATES.SUCCESS)

      //Does not reset dispensedTo to assist rapid dispensation of multiple comodities
      formInput.amount = ""; //resets the amount to dispense
      formInput.commodityId = ""; //resets the comodity
      console.log("Form reset");

    } else {
      // ERROR:
      console.error("Error: Transaction value cannot be grater than : " + commodity.endBalance
                    + ", Transaction aborted. Requested dispensation of " + formInput.amount
                    + " of " + formInput.commodityId);

      setNotice(NOTICE_STATES.ERROR)

    }
  }

  return (
  <div>
    <h2 align='center'>Registrer new transaction</h2>
    <Form
      data={basicData}
      onSubmit={onSubmit}
    />

    <div>
      {renderWarning(warning)}
      {renderNotice(notice)}
    </div>
  </div>
  )
}


function newTransaction(transactionId, transactionDetails, dispensedBy) {
  const date = new Date();
  const currentDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear().toString().slice(2)}` 
  const currentTime = `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`
  const newTransaction = {
    timestamp: {time: currentTime, date: currentDate},
    commodity: {id: transactionDetails.commodityId,
                amount: transactionDetails.amount},
    dispensedTo: transactionDetails.dispensedTo,
    dispensedBy: dispensedBy,
    id: transactionId

  }
  
  listOfTransactions.transactions?.unshift(newTransaction); 
  listOfTransactions["transactions"] = listOfTransactions.transactions || [newTransaction]

  return listOfTransactions;
}