import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePOSection({ onSubmitPO }) {
  const [supplier, setSupplier] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [products, setProducts] = useState([{ productName: "", quantity: "", price: "" }]);
  const [components, setComponents] = useState([{ sku: "", productName: "", quantity: "", uom: "" }]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const poData = {
      supplier,
      poNumber,
      products,
      components
    };

    onSubmitPO(poData);  // Pass data to App.js state

    navigate('/po-details');  // Navigate to the details page
  }

  const addProduct = () => {
    setProducts([...products, { productName: "", quantity: "", price: "" }]);
  };

  const addComponent = () => {
    setComponents([...components, { sku: "", productName: "", quantity: "", uom: "" }]);
  };

  return (
    <div className="create-po">
      <h2>Create Purchase Order</h2>
      <form id="poForm" onSubmit={handleSubmit}>

        {/* Supplier Details */}
        <div className="form-group">
          <label htmlFor="supplier">Supplier:</label>
          <input 
            type="text" 
            id="supplier" 
            name="supplier" 
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)} 
            placeholder="Supplier Name" 
          />
        </div>

        {/* PO Number */}
        <div className="form-group">
          <label htmlFor="poNumber">PO#:</label>
          <input 
            type="text" 
            id="poNumber" 
            name="poNumber" 
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)} 
            placeholder="PO Number" 
          />
        </div>

        {/* Products Details */}
        {products.map((product, index) => (
          <div key={index} className="product-details">
            <div className="form-group">
              <label htmlFor={`product-${index}`}>Product:</label>
              <input 
                type="text" 
                id={`product-${index}`} 
                name={`product-${index}`} 
                value={product.productName}
                onChange={(e) => {
                  const newProducts = [...products];
                  newProducts[index].productName = e.target.value;
                  setProducts(newProducts);
                }} 
                placeholder="Product Name" 
              />
            </div>

            <div className="form-group">
              <label htmlFor={`quantity-${index}`}>Quantity:</label>
              <input 
                type="number" 
                id={`quantity-${index}`} 
                name={`quantity-${index}`} 
                value={product.quantity}
                onChange={(e) => {
                  const newProducts = [...products];
                  newProducts[index].quantity = e.target.value;
                  setProducts(newProducts);
                }} 
                placeholder="Enter Quantity" 
              />
            </div>

            <div className="form-group">
              <label htmlFor={`price-${index}`}>Price:</label>
              <input 
                type="text" 
                id={`price-${index}`} 
                name={`price-${index}`} 
                value={product.price}
                onChange={(e) => {
                  const newProducts = [...products];
                  newProducts[index].price = e.target.value;
                  setProducts(newProducts);
                }} 
                placeholder="Enter Price" 
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addProduct}>+ Add Product</button>
        <br />

        {/* Required Components for PO */}
        <h3>Required Components to fulfill PO</h3>
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>UOM</th>
            </tr>
          </thead>
          <tbody>
            {components.map((component, index) => (
              <tr key={index}>
                <td>
                  <input 
                    type="text" 
                    value={component.sku}
                    onChange={(e) => {
                      const newComponents = [...components];
                      newComponents[index].sku = e.target.value;
                      setComponents(newComponents);
                    }} 
                    placeholder="SKU" 
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    value={component.productName}
                    onChange={(e) => {
                      const newComponents = [...components];
                      newComponents[index].productName = e.target.value;
                      setComponents(newComponents);
                    }} 
                    placeholder="Product Name" 
                  />
                </td>
                <td>
                  <input 
                    type="number" 
                    value={component.quantity}
                    onChange={(e) => {
                      const newComponents = [...components];
                      newComponents[index].quantity = e.target.value;
                      setComponents(newComponents);
                    }} 
                    placeholder="Quantity" 
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    value={component.uom}
                    onChange={(e) => {
                      const newComponents = [...components];
                      newComponents[index].uom = e.target.value;
                      setComponents(newComponents);
                    }} 
                    placeholder="UOM" 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addComponent}>+ Add Component</button>
        <br />

        <button type="submit">Submit PO</button>
      </form>
    </div>
  );
}

CreatePOSection.defaultProps = {
  onSubmitPO: () => { console.warn("onSubmitPO not provided!") }
};

export default CreatePOSection;
