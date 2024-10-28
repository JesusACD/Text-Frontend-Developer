"use client";
import { Store } from "pullstate";

const DataStore = new Store({
  orders: [],
});

// Create a new order
const createOrder = (newOrder) => {
  DataStore.update((s) => {
    s.orders = [...s.orders, newOrder];
  });
};

// Update an order by index
const updateOrder = (index, updatedOrder) => {
  DataStore.update((s) => {
    s.orders[index] = { ...s.orders[index], ...updatedOrder };
  });
};

// Delete an order by index
const deleteOrder = (index) => {
  DataStore.update((s) => {
    s.orders.splice(index, 1);
  });
};

function useOrderCRUD() {
  const orders = DataStore.useState((s) => s.orders);

  return { orders, createOrder, updateOrder, deleteOrder };
}

export default useOrderCRUD;
