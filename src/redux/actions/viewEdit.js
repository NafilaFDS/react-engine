import { EDIT_INPUT, EDIT_MODE } from "../actionTypes";

const editInput = () => {
    return {
        type: EDIT_INPUT,
    };
};

const editMode = () => {
    return {
        type: EDIT_MODE,
    };
};

export { editInput, editMode };
