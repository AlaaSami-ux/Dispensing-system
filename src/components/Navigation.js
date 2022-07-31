import React from "react";
import { Menu, MenuItem } from "@dhis2/ui";

export default function Navigation(props) {
  return (
    <Menu>
      <MenuItem
        label="Stock Balance"
        active={props.activePage == "StockBalance"}
        onClick={() => props.activePageHandler("StockBalance")}
      />
      <MenuItem
        label="Dispense"
        active={props.activePage == "Dispense"}
        onClick={() => props.activePageHandler("Dispense")}
      />
      <MenuItem
        label="Dispensing Registry"
        active={props.activePage == "DispensingRegistry"}
        onClick={() => props.activePageHandler("DispensingRegistry")}
      />
    </Menu>
  );
}
