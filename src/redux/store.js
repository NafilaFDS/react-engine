import { createStore } from "redux";
import viewReducer from "./reducers/viewReducer";

const store = createStore(viewReducer);

export default store;