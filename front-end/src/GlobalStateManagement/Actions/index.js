export const setUserItems = (userItems) => ({
  type: "SET_USER_ITEMS",
  userItems,
});

export const setAllItems = (allItems) => ({
  type: "SET_ALL_ITEMS",
  allItems,
});

export const addItemToBasket = (newItem) => ({
  type: "APPEND_ITEM",
  newItem,
});

export const deleteItemToBasket = (id) => ({
  type: "DELETE_ITEM",
  id,
});

export const setBasket = (newItems) => ({
  type: "SET_BASKET",
  newItems,
});

export const setTotalPrice = (newPrice) => ({
  type: "SET_TOTAL_PRICE",
  newPrice,
});

export const setMessages = (messages) => ({
  type: "SET_MESSAGES",
  messages,
});

export const addMessage = (newMessage) => ({
  type: "ADD_MESSAGE",
  newMessage,
});
