import * as Yup from "yup";
const addClienValidationSchema = Yup.object({
  nombre: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .required("El nombre es obligatorio"),
  rut: Yup.string()
    .matches(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/, "Formato de RUT no válido")
    .required("El RUT es obligatorio"),
  direccion: Yup.string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .required("La dirección es obligatoria"),
  telefono: Yup.string()
    .matches(/^\d+$/, "El teléfono debe contener solo números")
    .min(8, "El teléfono debe tener al menos 8 dígitos")
    .required("El teléfono es obligatorio"),
});

export default addClienValidationSchema;
