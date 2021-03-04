import React, { useReducer } from "react";
import NavigationSidebar from "../components/NavigationSidebar";
import ContextMenu from "../components/ContextMenu";
import {
    EditFormsContext,
    editFormsReducer,
    defaultEditFormsContext,
    dispatchAddDir,
    dispatchDeleteDir,
    dispatchSetEdit,
    dispatchReset,
} from "../context/EditFormsContext";
import MetricsList from "../components/MetricsList";
import FormsEditor from "../components/FormsEditor";
import FormsList from "../components/FormsList";
import { Button } from "semantic-ui-react";

const PageEditForms = () => {
    const [state, dispatch] = useReducer(
        editFormsReducer,
        defaultEditFormsContext
    );

    const onCancel = () => {
        dispatch(dispatchReset());
    };

    const addToForm = (e, id, setShowMenu) => {
        e.stopPropagation();
        dispatch(dispatchAddDir(id));
        setShowMenu(false)
    };

    return (
        <EditFormsContext.Provider value={{ state, dispatch }}>
            {state.edit ? (
                <div className="sidebar-page">
                    <ContextMenu triggersList={[".metric", ".directory"]}>
                        {({ target, setShowMenu }) =>
                            <div>
                                {target?.classList.contains("directory") && (
                                    <div>
                                        <p className="clickable" onClick={(e) => addToForm(e, target?.id, setShowMenu)}>
                                            Adicionar diretório {target?.id} ao formulário
					                    </p>
                                    </div>
                                )}
                                {target?.classList.contains("metric") && (
                                    <p className="clickable" onClick={(e) => addToForm(e, target?.id, setShowMenu)}>
                                        Adicionar métrica {target?.id} ao formulário
                                    </p>
                                )}
                            </div>
                        }
                    </ContextMenu>
                    <div>
                        <NavigationSidebar />
                    </div>
                    <div>
                        <MetricsList />
                        <FormsEditor />
                    </div>
                    <div />
                    <div className='app-sidebar-r'>
                        <Button
                            onClick={onCancel}
                            icon="arrow left"
                            color="red"
                            floated="right"
                            content='Cancelar'
                        />
                    </div>
                </div>
            ) : (
                    <FormsList />
                )}
        </EditFormsContext.Provider>
    );
};

export default PageEditForms;
