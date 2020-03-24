const initialState = {
  basket: []
};
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "APPEND_ITEM":
      return {
        ...state,
        basket: [...state.basket, action.newItem]
      };
    case "DELETE_ITEM":
      return {
        ...state,
        basket: state.basket.filter(item => item.id !== action.id)
      };
    default:
      return state;
  }
};

export default Reducer;
