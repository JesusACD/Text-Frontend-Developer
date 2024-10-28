"use client";
import useOrderCRUD from "@/app/store/store";
import React, { useState } from "react";

const useSales = () => {
  const { readOrders } = useOrderCRUD();
  const [sales, setSales] = useState([]);

  return { sales };
};

export default useSales;
