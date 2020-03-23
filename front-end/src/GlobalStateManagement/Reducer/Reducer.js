import { combineReducers } from "redux";
import ItemReducer from "./ItemReducer";
import BasketReducer from "./BasketReducer";

export default combineReducers({
  ItemReducer,
  BasketReducer
});
