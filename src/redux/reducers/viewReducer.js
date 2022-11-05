import { EDIT_INPUT, EDIT_MODE } from "../actionTypes";
import sampleData from "../../data_sample";

const initialState = {
    data: sampleData,
    mode: false
};

const viewReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_INPUT:
            console.log(state.data.data[action.id])
            const tempData = {
                ...state.data.data[action.id],
                settings: {
                    ...state.data.data[action.id].settings,
                    general: {
                        ...state.data.data[action.id].settings.general,
                        text: action.text
                    },
                    style: {
                        ...state.data.data[action.id].settings.style,
                        desktop: { ...state.data.data[action.id].settings.style.desktop, color: action.color },
                    }
                }
            }
            delete state.data.data[action.id]
            return {
                ...state,
                data: {
                    ...state.data,
                    data: {
                        ...state.data.data,
                        [action.id]: tempData
                    }
                },
            };

        case EDIT_MODE:
            return {
                ...state,
                mode: action.mode,
            };
        default:
            return state;
    }
};
export default viewReducer
