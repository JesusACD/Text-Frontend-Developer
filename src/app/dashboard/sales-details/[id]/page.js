"use client";
import useOrderCRUD from "@/app/store/store";
import Head from "@/components/Head/Head";
import React from "react";

const SaleDetailsPage = ({ params }) => {
  const { orders } = useOrderCRUD();
  const sale = orders.find((order) => order.id === params.id);

  if (!sale) {
    return (
      <>
        <Head title="Sale Details" />
        <div className="bg-background text-blueGray p-6 rounded-lg shadow-md mt-20 text-center">
          <h2 className="flex justify-center p-4 w-full mt-10 font-extrabold text-3xl text-spaceCadet">
            Error: Sale not found.
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Head title="Sale Details" />
      <div className="bg-background text-blueGray p-6 rounded-lg shadow-md mt-20">
        <div className="mb-6">
          <p>Sale ID: {sale.id}</p>
          <p>Client: {sale.client}</p>
          <p>Branch Office: {sale.branchOffice}</p>
          <p>Currency: {sale.currency}</p>
        </div>

        <div className="p-4 rounded-lg text-spaceCadet">
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          {sale.details.map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-2 border-b border-[var(--blueGray)]"
            >
              <span className="text-spaceCadet font-medium">{item.name}</span>
              <span>Qty: {item.quantity}</span>
              <span>Price: {item.price}</span>
              <span>Subtotal: {item.subtotal}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6 text-lg font-semibold text-spaceCadet">
          <span>Total:</span>
          <span>
            {sale.total} {sale.currency}
          </span>
        </div>
      </div>
    </>
  );
};

export default SaleDetailsPage;
