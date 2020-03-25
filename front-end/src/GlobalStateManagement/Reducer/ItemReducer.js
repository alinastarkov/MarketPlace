const initialState = {
  items: {
    userItems: [],
    allItems: [],
    totalPrice: 0
  }
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_ITEMS":
      return {
        ...state,
        items: {
          ...state.items,
          userItems: action.userItems
        }
      };
    case "SET_ALL_ITEMS":
      return {
        ...state,
        items: {
          ...state.items,
          allItems: action.allItems
        }
      };
    case "SET_TOTAL_PRICE":
      return {
        ...state,
        items: {
          ...state.items,
          totalPrice: action.newPrice
        }
      };

    default:
      return state;
  }
};

export default Reducer;
