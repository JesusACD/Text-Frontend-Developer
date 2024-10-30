"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { userDataMockeados, products } from "@/utils/mockData";
import Autocomplete from "../../../components/AutocompleteForm/AutocompleteForm";
import { formatNumber, showSubtotal } from "@/utils/functions";
import Head from "../../../components/Head/Head";
import useOrderCRUD from "@/app/store/store";
import { toast } from "react-toastify";
import validationSchema from "@/app/validations/saleValidation";
import AddClientModal from "@/components/Modal/AddClientModal";

const NewSaleForm = () => {
  const { createOrder } = useOrderCRUD();
  const [clients, setClients] = useState([
    { id: 1, name: "Cliente Existente" },
  ]);
  const [showClientForm, setShowClientForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      saleId: "",
      client: "",
      branchOffice: "",
      currency: "",
      items: [{ name: "", quantity: 1, price: 0, subtotal: 0 }],
      total: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const total = formik.values.total;
  const items = formik.values.items;
  const currency = formik.values.currency;
  const branchOffice = formik.values.branchOffice;
  const saleId = formik.values.saleId;
  const client = formik.values.client;
  const errors = formik.errors;
  const touched = formik.touched;

  const setFieldValue = (field, value) => formik.setFieldValue(field, value);

  const addItem = () => {
    setFieldValue("items", [
      ...items,
      { name: "", quantity: 1, price: 0, subtotal: 0 },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setFieldValue("items", newItems);
    updateTotal(newItems);
  };

  const handleProductChange = (productName, index = undefined) => {
    if (typeof index !== "undefined") {
      const product = products.find((p) => p.name === productName);
      if (product) {
        const newItems = [...items];
        newItems[index] = {
          ...newItems[index],
          name: product.name,
          price: product.price,
          subtotal: newItems[index].quantity * product.price,
        };

        setFieldValue("items", newItems);
        updateTotal(newItems);
      } else {
        setFieldValue(`items[${index}].name`, productName);
      }
    }
  };

  const handleQuantityChange = (index, quantity) => {
    if (quantity < 1) {
      toast.error("La cantidad debe ser mayor a 0", { position: "top-right" });
      return;
    }

    const newItems = [...items];
    newItems[index].quantity = quantity;
    newItems[index].subtotal = formatNumber(quantity, newItems[index].price);
    setFieldValue("items", newItems);
    updateTotal(newItems);
  };

  const updateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.subtotal, 0);

    setFieldValue("total", parseFloat(total.toFixed(2)));
  };

  const handleBranchChange = (branch, preselected) => {
    if (preselected) {
      const currency =
        userDataMockeados.find((b) => b.branchOffice === branch).currency || "";
      const saleid = userDataMockeados.find(
        (bOffice) => bOffice.branchOffice === branch
      ).id;
      setFieldValue("currency", currency);
      setFieldValue("saleId", saleid);
    }
    setFieldValue("branchOffice", branch);
  };

  const handleAddClient = (newClient) => {
    if (
      !newClient.name ||
      !document.getElementById("clientRUT").value ||
      !document.getElementById("clientAddress").value ||
      !document.getElementById("clientPhone").value
    ) {
      toast.error("Todos los campos del cliente son obligatorios", {
        position: "top-right",
      });
      return;
    }
    setClients([...clients, newClient]);
    setClient(newClient.name);
    setShowClientForm(false);
  };

  const validateForm = () => {
    if (!client || !branchOffice || !currency) {
      toast.error("Todos los campos son obligatorios", {
        position: "top-right",
      });
      return false;
    }
    if (items.some((item) => !item.name || item.quantity < 1)) {
      toast.error("Debe seleccionar un producto y una cantidad válida", {
        position: "top-right",
      });
      return false;
    }
    if (total <= 0) {
      toast.error("El total de la venta debe ser mayor a 0", {
        position: "top-right",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    if (!validateForm()) return;

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
      toast.success("Venta guardada exitosamente", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Error al guardar la venta. Inténtelo de nuevo", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Head title="New Sale" />
      <div className="p-4 w-full mt-10 text-blueGray">
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <section className="mb-20">
            <h3 className="text-3xl font-bold mb-2 text-spaceCadet">
              Document
            </h3>
            <div className="flex gap-10">
              {/* Client Selection */}
              <div className="flex gap-3 items-center w-full">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="client" className="font-bold">
                    Client
                  </label>
                  <Autocomplete
                    options={userDataMockeados.map((user) => user.username)}
                    onSelect={(value) => setFieldValue("client", value)}
                    value={client}
                    error={touched.client && errors.client}
                    onBlur={formik.handleBlur}
                    name="client"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowClientForm(true)}
                  className="bg-backgroundBlue py-2 px-5 text-2xl font-bold text-white hover:bg-blue-600"
                >
                  +
                </button>
              </div>

              <AddClientModal
                isOpen={showClientForm}
                onClose={() => setShowClientForm(!showClientForm)}
              />

              {/* Modal para agregar cliente */}

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="branch-office" className="font-bold">
                  Branch office
                </label>
                <Autocomplete
                  options={userDataMockeados.map((user) => user.branchOffice)}
                  onSelect={handleBranchChange}
                  value={branchOffice}
                  onBlur={formik.handleBlur}
                  name="branchOffice"
                  error={
                    touched.branchOffice &&
                    errors.branchOffice &&
                    errors.branchOffice
                  }
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
                  className="p-3 outline-none border-none focus:border-transparent focus:ring-0"
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
              {items?.map((item, index) => (
                <div key={index} className="flex gap-10">
                  {/* Product Name */}
                  <div className="w-3/5">
                    <Autocomplete
                      options={products.map((product) => product.name)}
                      onSelect={(productName) => {
                        handleProductChange(productName, index);
                        formik.setFieldTouched(
                          `items[${index}].name`,
                          true,
                          false
                        );
                      }}
                      value={formik.values.items[index].name}
                      isProduct={index}
                      onBlur={() =>
                        formik.setFieldTouched(`items[${index}].name`, true)
                      }
                      name={`items[${index}].name`}
                      error={
                        touched.items?.[index]?.name &&
                        errors.items?.[index]?.name &&
                        errors.items[index].name
                      }
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
                  <div className="flex items-start">
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
              className={`${
                !client || !currency
                  ? "bg-blue-300"
                  : "bg-backgroundBlue hover:bg-blue-600"
              }  py-2 px-10 text-lg text-white `}
              disabled={!client || !currency}
              title={
                client && currency
                  ? ""
                  : "Select a customer and a branch to add"
              }
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
