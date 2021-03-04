import React, { useContext } from "react";
import { Icon } from "semantic-ui-react";
import {
    dispatchDeleteDir,
    EditFormsContext,
} from "../context/EditFormsContext";

const MetricsList = () => {
    const { state, dispatch } = useContext(EditFormsContext);

    return (
        <div className="metric-list bordered">
            {Array.from(state.selectedDir).map((el) => (
                <div key={el}>
                    <Icon
                        name="close"
                        className="clickable"
                        onClick={() => dispatch(dispatchDeleteDir(el))}
                    />
                    <p>{el}</p>
                </div>
            ))}
        </div>
    );
};

export default MetricsList;
