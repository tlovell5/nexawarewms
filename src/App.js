import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';  
import Sidebar from './components/Sidebar';  
import ReceivingSection from './components/ReceivingSection';
import InventorySection from './components/InventorySection';
import CreatePOSection from './components/CreatePOSection';
import PODetails from './components/PODetails';

function App() {
  const [inventory, setInventory] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const onAddProduct = (product) => {
    setInventory(prevInventory => [...prevInventory, product]);
  };

  const onSubmitPO = (poData) => {
    setPurchaseOrders(prevPOs => [...prevPOs, poData]);
  };

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/receiving" element={<ReceivingSection onAddProduct={onAddProduct} />} />
          <Route path="/create-po" element={<CreatePOSection onSubmitPO={onSubmitPO} />} />
          <Route path="/inventory" element={<InventorySection inventory={inventory} setInventory={setInventory} />} />
          <Route path="/po-details" element={<PODetails poData={purchaseOrders[purchaseOrders.length - 1]} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
