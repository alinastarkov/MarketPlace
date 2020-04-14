import { combineReducers } from "redux";
import ItemReducer from "./ItemReducer";
import BasketReducer from "./BasketReducer";
import MessageReducer from "./MessageReducer";

export default combineReducers({
  ItemReducer,
  BasketReducer,
  MessageReducer,
});
