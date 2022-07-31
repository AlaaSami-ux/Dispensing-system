import React from "react";
import classes from "./App.module.css";
import { useState } from "react";
import { useDataQuery } from "@dhis2/app-service-data";
import { CircularLoader } from "@dhis2/ui";

import StockBalance from "./components/StockBalance";
import DispensingRegistry from "./components/DispensingRegistry";
import Dispense from "./components/Dispense";
import Navigation from "./components/Navigation";

import { getBasicData, prepareBasicData } from "./api/dataQueries/basicData";
import { commoditiesDict } from "./components/helpFunctions/helpFunctions";

function App() {
  const [activePage, setActivePage] = useState("StockBalance");

  const { data, loading, error } = useDataQuery(getBasicData);

  function activePageHandler(page) {
    setActivePage(page);
  }

  if (error) {
    return <span>Error loading basic data: {error.message}</span>
  }

  if (loading) {
    return <CircularLoader />
  }

  if (data) {
      const basicData = prepareBasicData(data);

      return (
        <div className={classes.container}>
          <div className={classes.left}>
            <Navigation
              activePage={activePage}
              activePageHandler={activePageHandler}
            />
          </div>
          <div className={classes.right}>
            {activePage === "StockBalance" && <StockBalance data={basicData} />}
            {activePage === "Dispense" && <Dispense basicData={basicData} />}
            {activePage === "DispensingRegistry" && <DispensingRegistry commodities={commoditiesDict(basicData)} />}
          </div>
        </div>
      );
  }
}

export default App;
