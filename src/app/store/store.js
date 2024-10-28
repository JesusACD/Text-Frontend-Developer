// store.js
import { Store } from "pullstate";

export const DataStore = new Store({
  orders: [
    {
      id: "8d8b2dab-7af7-4ac7-8a96-49c08c786204",
      client: "Lauretta46",
      branchOffice: "Argentina",
      currency: "ARS",
      total: 2817.66,
      details: [
        { name: "Computer", quantity: 1, price: "876.20", subtotal: 876.2 },
        { name: "Chicken", quantity: 2, price: "74.13", subtotal: 148.26 },
        { name: "Towels", quantity: 4, price: "448.30", subtotal: 1793.2 },
      ],
    },
    {
      id: "8d8b2dab-7af7-4ac7-8a96-49c08c786211",
      client: "Lauretta46",
      branchOffice: "Argentina",
      currency: "ARS",
      total: 2817.66,
      details: [
        { name: "Computer", quantity: 1, price: "876.20", subtotal: 876.2 },
        { name: "Chicken", quantity: 2, price: "74.13", subtotal: 148.26 },
        { name: "Towels", quantity: 4, price: "448.30", subtotal: 1793.2 },
      ],
    },
  ],
});

const useOrderCRUD = () => {
  const orders = DataStore.useState((s) => s.orders);

  // Create a new order
  const createOrder = (newOrder) => {
    DataStore.update((s) => {
      s.orders.push(newOrder);
    });
  };

  // Read all orders
  const readOrders = () => orders;

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

  return { orders, createOrder, readOrders, updateOrder, deleteOrder };
};

export default useOrderCRUD;
