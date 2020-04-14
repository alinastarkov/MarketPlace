const initialState = {
  messages: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.newMessage],
      };
    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
};

export default Reducer;
