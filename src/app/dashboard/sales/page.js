"use client";
import useOrderCRUD from "@/app/store/store";
import Head from "@/components/Head/Head";

const Sales = () => {
  const { orders } = useOrderCRUD();
  console.log("ordersPAGES", orders);

  return (
    <>
      <Head title="Sales" />
      {orders.length <= 0 ? (
        <div className="flex justify-center items-center h-screen font-extrabold text-3xl text-spaceCadet">
          No orders to display.
        </div>
      ) : null}

      <div className="p-4 w-full mt-10 text-blueGray">
        <div className="container mx-auto px-4 py-4">
          <ul className="divide-y divide-blueGray">
            {orders?.map((sale, index) => {
              if (!sale) {
                return null;
              }

              return (
                <li key={sale.id} className="py-4">
                  <div className="flex justify-between">
                    <h3 className="text-spaceCadet text-xl font-bold">
                      {sale.client}
                    </h3>
                    <p className="text-spaceCadet text-sm">{sale?.date}</p>
                  </div>
                  <p className="text-spaceCadet text-sm mb-2">
                    {sale.branchOffice} - {sale.currency}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-spaceCadet text-sm">
                      Total: {sale.total}
                    </p>
                  </div>
                  <h4 className="text-spaceCadet text-lg font-bold mb-2">
                    Detalles de la venta
                  </h4>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-spaceCadet text-sm">Nombre</th>
                        <th className="text-spaceCadet text-sm">Cantidad</th>
                        <th className="text-spaceCadet text-sm">Precio</th>
                        <th className="text-spaceCadet text-sm">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sale.details?.map((detail, index) => (
                        <tr key={`${sale.id}-${index}`}>
                          <td className="text-spaceCadet text-sm">
                            {detail.name}
                          </td>
                          <td className="text-spaceCadet text-sm">
                            {detail.quantity}
                          </td>
                          <td className="text-spaceCadet text-sm">
                            {detail.price}
                          </td>
                          <td className="text-spaceCadet text-sm">
                            {detail.subtotal}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sales;
