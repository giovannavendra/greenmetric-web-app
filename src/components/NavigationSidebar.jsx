import React, { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { dispatchAddDir, EditFormsContext } from "../context/EditFormsContext";
import { metricsArrToDir } from "../utils/utils";
import DirectoryItem from "./DirectoryItem";

const NavigationSidebar = () => {
  const { state, dispatch } = useContext(AppContext);

  const dir = useMemo(
    () => metricsArrToDir(state.metrics, { name: "root", children: [] }),
    [state.metrics]
  );

  return dir.children.map((el) => <DirectoryItem item={el} key={el.name} />);
};

export default NavigationSidebar;
