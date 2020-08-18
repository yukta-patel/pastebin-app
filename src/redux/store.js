import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import LoginReducer from "../redux/login/_reducer";
import PasteReducer from "../redux/dashboard/_reducer";

const rootReducer = combineReducers({ LoginReducer, PasteReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
