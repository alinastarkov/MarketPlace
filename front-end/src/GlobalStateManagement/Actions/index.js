export const setUserItems = userItems => ({
  type: "SET_USER_ITEMS",
  userItems
});

export const addItemToBasket = newItem => ({
  type: "APPEND_ITEM",
  newItem
});

export const deleteItemToBasket = id => ({
  type: "DELETE_ITEM",
  id
});
