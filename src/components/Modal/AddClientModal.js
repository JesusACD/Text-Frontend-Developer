import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import addClienValidationSchema from "@/app/validations/addClientValidation";

const AddClientModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Esquema de validación con Yup

  const initialValues = {
    nombre: "",
    rut: "",
    direccion: "",
    telefono: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4">Add Client</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={addClienValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <Field
                  name="nombre"
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="nombre"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">RUT</label>
                <Field
                  name="rut"
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="rut"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Dirección
                </label>
                <Field
                  name="direccion"
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="direccion"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Teléfono
                </label>
                <Field
                  name="telefono"
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="telefono"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-3 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {isSubmitting ? "Agregando..." : "Agregar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddClientModal;
