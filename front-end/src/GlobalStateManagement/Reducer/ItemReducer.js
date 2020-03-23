const Reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_ITEMS":
      return {
        ...state,
        items: action.userItems
      };
    default:
      return state;
  }
};

export default Reducer;
