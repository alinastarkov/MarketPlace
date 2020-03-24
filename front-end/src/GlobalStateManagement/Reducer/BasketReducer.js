const initialState = {
  basket: []
};
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "APPEND_ITEM":
      let index, foundItem;
      state.basket.forEach((item, i) => {
        if (item.id === action.newItem.id) {
          index = i;
          foundItem = item;
        }
      });
      let newArray = state.basket.slice();
      if (foundItem) {
        foundItem.quantity = foundItem.quantity + 1;
        newArray[index] = foundItem;
      } else {
        action.newItem.quantity = 1;
        newArray.push(action.newItem);
      }
      return {
        ...state,
        basket: newArray
      };
    case "DELETE_ITEM":
      return {
        ...state,
        basket: state.basket.filter(item => item.id !== action.id)
      };
    case "SET_BASKET":
      return {
        ...state,
        basket: action.newItems
      };
    default:
      return state;
  }
};

export default Reducer;
