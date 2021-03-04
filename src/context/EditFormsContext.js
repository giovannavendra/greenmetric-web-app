import { createContext } from "react";

export const defaultEditFormsContext = () => ({
    edit: false,
    selectedDir: new Set(),
    id: "",
    title: "",
});

export const EditFormsContext = createContext(defaultEditFormsContext);

export const editFormsReducer = (state, action) => {
    switch (action.type) {
        case "SET_EDIT":
            return { ...state, edit: action.edit };
        case "ADD_DIR":
            return { ...state, selectedDir: state.selectedDir.add(action.dir) };
        case "DELETE_DIR":
            state.selectedDir.delete(action.dir);
            return { ...state };
        case "SET_ID":
            return { ...state, id: action.id };
        case "SET_TITLE":
            return { ...state, title: action.title };
        case "RESET":
            return { ...defaultEditFormsContext() };
        default:
            return state;
    }
};

export const dispatchSetEdit = (edit) => ({
    type: "SET_EDIT",
    edit,
});

export const dispatchAddDir = (dir) => ({
    type: "ADD_DIR",
    dir,
});

export const dispatchDeleteDir = (dir) => ({
    type: "DELETE_DIR",
    dir,
});

export const dispatchSetId = (id) => ({
    type: "SET_ID",
    id,
});

export const dispatchSetTitle = (title) => ({
    type: "SET_TITLE",
    title,
});

export const dispatchReset = () => ({
    type: "RESET",
});
