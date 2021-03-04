import React, { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import {
    dispatchReset,
    dispatchSetTitle,
    EditFormsContext,
} from "../context/EditFormsContext";
import Question from "./Question";
import { Form, Segment } from "semantic-ui-react";
import { genFormsList } from "../utils/utils";
import { postForms, putForms } from "../utils/data";

const FormsEditor = () => {
    const { state } = useContext(AppContext);
    const { state: stateEF, dispatch: dispatchEF } = useContext(EditFormsContext);

    const [idList, setIdList] = useState([]);

    useEffect(() => {
        setIdList(genFormsList(state.metrics, Array.from(stateEF.selectedDir)));
    }, [state, stateEF.selectedDir.size]);

    const onSubmit = async () => {
        const idListFiltered = idList.map(el => el.id)
        if (stateEF.id) {
            await putForms(stateEF.id, stateEF.title, idListFiltered);
        } else {
            await postForms(stateEF.title, idListFiltered);
        }

        window.location.reload();
    };

    const questionList = useMemo(() => idList.map((el) => {
        return <Question key={el.id} q={el} disabled />;
    }), [idList])

    return (
        <Form>
            <Segment>
                <Form.Input
                    name="title"
                    label="Nome do fomulário"
                    value={stateEF.title}
                    onChange={({ target }) => dispatchEF(dispatchSetTitle(target.value))}
                />
                {questionList}
                <div className='app-footer'>
                    <Form.Button
                        primary
                        className="centered"
                        color="black"
                        type="submit"
                        onClick={onSubmit}
                    >
                        Enviar
                    </Form.Button>
                </div>
            </Segment>
        </Form>
    );
};

export default FormsEditor;
