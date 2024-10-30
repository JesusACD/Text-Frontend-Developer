import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  client: Yup.string().required("Client name is required"),
  branchOffice: Yup.string().required("Branch office is required"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("The product name is mandatory"),
        quantity: Yup.number()
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1"),
        price: Yup.number()
          .required("Price is required")
          .min(0, "Price cannot be negative"),
        subtotal: Yup.number()
          .required("Subtotal is required")
          .min(0, "Subtotal cannot be negative")
          .test(
            "subtotal-check",
            "Subtotal must equal quantity times price",
            function (value) {
              const { quantity, price } = this.parent;
              return value === quantity * price;
            }
          ),
      })
    )
    .min(1, "There must be at least one item in the sale"),
  total: Yup.number()
    .required("Total is required")
    .min(0, "Total cannot be negative")
    .test(
      "total-check",
      "Total must equal the sum of subtotals",
      function (value) {
        const items = this.parent.items || [];
        const calculatedTotal = items.reduce(
          (sum, item) => sum + item.subtotal,
          0
        );
        return value === calculatedTotal;
      }
    ),
});

export default validationSchema;
