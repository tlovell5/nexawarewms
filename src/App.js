import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';  

import Sidebar from './components/Sidebar';  
import ReceivingSection from './components/ReceivingSection';
import InventorySection from './components/InventorySection';
import CreatePOSection from './components/CreatePOSection';  // 1. Import the new component

function App() {
  const [inventory, setInventory] = useState([]);

  const onAddProduct = (product) => {
    setInventory(prevInventory => [...prevInventory, product]);
  };

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/receiving" element={<ReceivingSection onAddProduct={onAddProduct} />} />
          <Route path="/create-po" element={<CreatePOSection />} />  // 2. Add the new route here
          <Route path="/inventory" element={<InventorySection inventory={inventory} setInventory={setInventory} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
