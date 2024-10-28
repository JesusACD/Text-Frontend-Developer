import { faker } from "@faker-js/faker";

// Definimos un arreglo de países de LATAM para que Faker los use al generar los datos
const countriesLATAM = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Ecuador",
  "El Salvador",
  "Guatemala",
  "Honduras",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "Puerto Rico",
  "República Dominicana",
  "Uruguay",
  "Venezuela",
];

const data = [
  { branchOffice: "Argentina", currency: "ARS" },
  { branchOffice: "Bolivia", currency: "BOB" },
  { branchOffice: "Brasil", currency: "BRL" },
  { branchOffice: "Chile", currency: "CLP" },
  { branchOffice: "Colombia", currency: "COP" },
  { branchOffice: "Costa Rica", currency: "CRC" },
  { branchOffice: "Cuba", currency: "CUP" },
  { branchOffice: "Ecuador", currency: "USD" },
  { branchOffice: "El Salvador", currency: "USD" },
  { branchOffice: "Guatemala", currency: "GTQ" },
  { branchOffice: "Honduras", currency: "HNL" },
  { branchOffice: "México", currency: "MXN" },
  { branchOffice: "Nicaragua", currency: "NIO" },
  { branchOffice: "Panamá", currency: "USD" },
  { branchOffice: "Paraguay", currency: "PYG" },
  { branchOffice: "Perú", currency: "PEN" },
  { branchOffice: "Puerto Rico", currency: "USD" },
  { branchOffice: "República Dominicana", currency: "DOP" },
  { branchOffice: "Uruguay", currency: "UYU" },
  { branchOffice: "Venezuela", currency: "VES" },
];

faker.locale = "es_MX";

// Función para generar datos de usuarios con datos de LATAM
const mockUserDataLATAM = (qty = 1) =>
  [...Array(qty)].map(() => {
    const branchOffice = `${faker.helpers.arrayElement(countriesLATAM)}`;
    const branchId = faker.string.uuid();

    return {
      id: branchId,
      username: faker.internet.username(),
      currency: data.find((branch) => branch.branchOffice === branchOffice)
        .currency,
      branchOffice: branchOffice,
    };
  });

export const userDataMockeados = mockUserDataLATAM(1000);

function generateNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const mockProducts = () => {
  // Generar productos
  const products = [];
  for (let i = 0; i < 1000; i++) {
    const stock = generateNumberBetween(0, 1000);
    products.push({
      id: i + 1,
      name: faker.commerce.product(),
      price: faker.commerce.price(),
      stock: stock,
      branch: faker.helpers.arrayElement(countriesLATAM),
    });
  }
  return products;
};

export const products = mockProducts();
