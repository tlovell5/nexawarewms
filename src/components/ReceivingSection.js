import React, { useState } from "react";
import { supabase } from "./supabaseClient";

function ReceivingSection({ onAddProduct }) {
  const initialFormState = {
    licensePlate: "",
    sku: "",
    name: "",
    lotNumber: "",
    expirationDate: "",
    quantity: "",
    location: "",
    uom: "EA",
    customer: "",
    transactionBy: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    // Insert the product data into Supabase's inventory table
    const { data, error } = await supabase
      .from("inventory")
      .insert([productData]);

    if (error) {
      console.error("Error inserting data:", error);
      alert("Submission failed!");
    } else {
      alert(`Submission Successful! Added ${formData.name} to inventory.`);
      setFormData(initialFormState);
    }
  };

  return (
    <section className="add-product" id="receivingSection">
      <h3>Receive Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="licensePlate">License Plate:</label>
          <input
            type="text"
            id="licensePlate"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sku">SKU#:</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lotNumber">Lot Number:</label>
          <input
            type="text"
            id="lotNumber"
            name="lotNumber"
            value={formData.lotNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input
            type="date"
            id="expirationDate"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="uom">UOM:</label>
          <select
            id="uom"
            name="uom"
            value={formData.uom}
            onChange={handleChange}
            required
          >
            <option value="EA">EA</option>
            <option value="G">G</option>
            <option value="KG">KG</option>
            <option value="LB">LB</option>
            <option value="OZ">OZ</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customer">Customer:</label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="transactionBy">Transaction By:</label>
          <input
            type="text"
            id="transactionBy"
            name="transactionBy"
            value={formData.transactionBy}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Add Product</button>
        </div>
      </form>
    </section>
  );
}

export default ReceivingSection;
