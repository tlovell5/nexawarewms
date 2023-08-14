import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Sidebar from "./components/Sidebar";
import ReceivingSection from "./components/ReceivingSection";
import InventorySection from "./components/InventorySection";
import CreatePOSection from "./components/CreatePOSection";
import PODetails from "./components/PODetails";
import { supabase } from "./components/supabaseClient";

function App() {
  const [inventory, setInventory] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const onAddProduct = async (product) => {
    try {
      // Add to local state
      setInventory((prevInventory) => [...prevInventory, product]);

      // Add to Supabase
      const { error } = await supabase.from("inventory").insert([product]);
      if (error) throw error;
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const onSubmitPO = async (poData) => {
    try {
      // Add to local state
      setPurchaseOrders((prevPOs) => [...prevPOs, poData]);

      // Add to Supabase
      const { error } = await supabase.from("purchaseOrders").insert([poData]);
      if (error) throw error;
    } catch (error) {
      console.error("Error submitting PO:", error);
    }
  };

  useEffect(() => {
    // Fetch data from Supabase and set to the state
    const fetchData = async () => {
      try {
        // Fetch inventory
        const { data: inventoryData, error: invError } = await supabase
          .from("inventory")
          .select("*");
        if (invError) throw invError;
        setInventory(inventoryData || []);

        // Fetch purchase orders
        const { data: purchaseOrderData, error: poError } = await supabase
          .from("purchaseOrders")
          .select("*");
        if (poError) throw poError;
        setPurchaseOrders(purchaseOrderData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div>
          <Routes>
            <Route
              path="/receiving"
              element={<ReceivingSection onAddProduct={onAddProduct} />}
            />
            <Route
              path="/create-po"
              element={<CreatePOSection onSubmitPO={onSubmitPO} />}
            />
            <Route
              path="/inventory"
              element={
                <InventorySection
                  inventory={inventory}
                  setInventory={setInventory}
                />
              }
            />
            <Route
              path="/po-details"
              element={<PODetails purchaseOrders={purchaseOrders} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
