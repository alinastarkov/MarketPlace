const Reducer = (state = [], action) => {
  switch (action.type) {
    case "APPEND_ITEM":
      return {
        ...state,
        basket: [...state.basket, action.newItem]
      };
    default:
      return state;
  }
};

export default Reducer;
