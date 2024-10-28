"use client";
import { useState } from "react";
import { userDataMockeados, products } from "@/utils/mockData";
import Autocomplete from "../../../components/AutocompleteForm/AutocompleteForm";
import { formatNumber, showSubtotal } from "@/utils/functions";
import Head from "../../../components/Head/Head";
import useOrderCRUD from "@/app/store/store";
import { toast } from "react-toastify";

const NewSaleForm = () => {
  const { createOrder } = useOrderCRUD();
  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0, subtotal: 0 },
  ]);
  const [client, setClient] = useState("");
  const [saleId, setSaleId] = useState("");
  const [branchOffice, setBranchOffice] = useState("");
  const [currency, setCurrency] = useState("");
  const [total, setTotal] = useState(0);
  const [clients, setClients] = useState([
    { id: 1, name: "Cliente Existente" },
  ]);
  const [showClientForm, setShowClientForm] = useState(false);

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0, subtotal: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    updateTotal(newItems);
  };

  const handleProductChange = (index, productId) => {
    const product = products.find((p) => p.name === productId);
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      name: product.name,
      price: product.price,
      subtotal: newItems[index].quantity * product.price,
    };

    setItems(newItems);
    updateTotal(newItems);
  };

  const handleQuantityChange = (index, quantity) => {
    if (quantity < 1) {
      return;
    }
    const newItems = [...items];
    newItems[index].quantity = quantity;
    newItems[index].subtotal = formatNumber(quantity, newItems[index].price);
    setItems(newItems);
    updateTotal(newItems);
  };

  const updateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.subtotal, 0);
    setTotal(parseFloat(total.toFixed(2)));
  };

  const handleBranchChange = (branch) => {
    setBranchOffice(branch);
  };

  const handleCurrency = (branch) => {
    // setCurrency(
    //   bigData.find((user) => user.branchOffice === branch).currency || ""
    // );
    setCurrency(
      userDataMockeados.find((user) => user.branchOffice === branch).currency ||
        ""
    );
    setBranchOffice(branch);
    setSaleId(
      userDataMockeados.find((user) => user.branchOffice === branch).id
    );
  };

  const handleAddClient = (newClient) => {
    setClients([...clients, newClient]);
    setClient(newClient.name);
    setShowClientForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: saleId,
      client,
      branchOffice,
      currency,
      total,
      details: items,
    };
    createOrder(data);
    try {
      toast.success("Form sent successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Error sending the form. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <Head title="New Sale" />
      <div className="p-4 w-full mt-10 text-blueGray">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <section className="mb-20">
            <h3 className="text-3xl font-bold mb-2 text-spaceCadet">
              Document
            </h3>
            <div className="flex gap-10">
              {/* Client Selection */}
              <div className="flex gap-3 items-end w-full">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="client" className="font-bold">
                    Client
                  </label>
                  <Autocomplete
                    options={userDataMockeados.map((user) => user.username)}
                    onSelect={setClient}
                    onChange={setClient}
                    value={client}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowClientForm(true)}
                  className="bg-backgroundBlue py-2 px-5 text-2xl font-bold text-white hover:bg-blue-600 mt-4"
                >
                  +
                </button>
              </div>

              {/* Modal para agregar cliente */}
              {showClientForm && (
                <div className="z-50 fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                  <div className="bg-white p-6 rounded-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Agregar Cliente</h2>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Nombre"
                        id="clientName"
                        className="p-2 w-full outline-none border"
                      />
                      <input
                        type="text"
                        placeholder="RUT"
                        id="clientRUT"
                        className="p-2 w-full outline-none border"
                      />
                      <input
                        type="text"
                        placeholder="Dirección"
                        id="clientAddress"
                        className="p-2 w-full outline-none border"
                      />
                      <input
                        type="text"
                        placeholder="Teléfono"
                        id="clientPhone"
                        className="p-2 w-full outline-none border"
                      />
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => setShowClientForm(false)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const newClient = {
                            id: clients.length + 1,
                            name: document.getElementById("clientName").value,
                          };
                          handleAddClient(newClient);
                        }}
                        className="px-4 py-2 bg-backgroundBlue text-white rounded hover:bg-blue-600"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="branch-office" className="font-bold">
                  Branch office
                </label>
                <Autocomplete
                  // options={bigData.map((user) => user.branchOffice)}
                  options={userDataMockeados.map((user) => user.branchOffice)}
                  onSelect={handleCurrency}
                  onChange={handleBranchChange}
                  value={branchOffice}
                />
              </div>
              {/* Currency */}
              <div className="flex flex-col gap-1">
                <label htmlFor="currency" className="font-bold">
                  Currency
                </label>
                <input
                  type="text"
                  value={currency}
                  readOnly
                  className="p-3 outline-none outline-none border-none focus:border-transparent focus:ring-0"
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-3xl font-bold mb-2 text-spaceCadet">Details</h3>
            <div className="flex gap-10 mr-[85px]">
              <div className="w-3/5 font-bold">Name</div>
              <div className="w-1/4 font-bold">Quantity</div>
              <div className="w-1/4 font-bold">Price</div>
              <div className="w-1/4 font-bold">Subtotal</div>
            </div>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex gap-10">
                  {/* Product Name */}
                  <div className="w-3/5">
                    <Autocomplete
                      options={products.map((user) => user.name)}
                      onSelect={handleProductChange}
                      value={item.name}
                      isProduct={index}
                    />
                  </div>
                  {/* Quantity */}
                  <div className="w-1/4">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, Number(e.target.value))
                      }
                      className="p-3 w-full border-none focus:border-transparent focus:ring-0"
                    />
                  </div>
                  {/* Price */}
                  <div className="w-1/4">
                    <input
                      type="text"
                      value={showSubtotal(item.price, currency)}
                      readOnly
                      className="p-3 w-full outline-none border-none focus:border-transparent focus:ring-0"
                    />
                  </div>
                  {/* Subtotal */}
                  <div className="w-1/4">
                    <input
                      type="text"
                      value={showSubtotal(item.subtotal, currency)}
                      readOnly
                      className="p-3 w-full outline-none border-none focus:border-transparent focus:ring-0"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="bg-backgroundBlue py-2 px-5 text-2xl font-bold text-white hover:bg-blue-600"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addItem}
              className="bg-backgroundBlue py-2 px-10 text-lg text-white hover:bg-blue-600 mt-4"
            >
              Add
            </button>
          </section>

          <div className="flex justify-end items-center gap-5 mt-4">
            <label htmlFor="total" className="font-bold">
              Total
            </label>
            <input
              type="text"
              value={showSubtotal(total, currency)}
              readOnly
              className="p-3 outline-none border-none focus:border-transparent focus:ring-0"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-backgroundBlue py-2 px-10 text-lg text-white hover:bg-blue-600 mt-4"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewSaleForm;
