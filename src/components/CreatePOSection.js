import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

function CreatePOSection() {
  const [supplier, setSupplier] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [components, setComponents] = useState([
    { sku: "", productName: "", quantity: "", uom: "" },
  ]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Input validation
    if (
      !supplier ||
      !poNumber ||
      !product ||
      isNaN(parseFloat(quantity)) ||
      isNaN(parseFloat(price))
    ) {
      alert("Please fill in all fields with valid data.");
      return;
    }

    const parsedQuantity = parseInt(quantity);
    const parsedPrice = parseFloat(price);

    // Calculate the total price
    const totalPrice = parsedQuantity * parsedPrice;

    const { data: poResponse, error: poError } = await supabase
      .from("purchase_orders")
      .insert([
        {
          supplier,
          poNumber,
          product,
          quantity: parsedQuantity, // using parsedQuantity
          price: parsedPrice, // using parsedPrice
          total_price: totalPrice,
        },
      ])
      .select();

    if (poError) {
      alert("Error inserting purchase order: " + poError.message);
      return;
    }

    const poId = poResponse[0].id;

    // Inserting components
    const { error: componentError } = await supabase.from("components").insert(
      components.map((component) => ({
        po_id: poId,
        sku: component.sku,
        productName: component.productName,
        quantity: parseInt(component.quantity), // Parsing to integer
        uom: component.uom,
      }))
    );

    if (componentError) {
      alert("Error inserting components: " + componentError.message);
      return;
    }

    navigate("/po-details"); // Navigate to the details page
  };

  const addComponent = () => {
    setComponents([
      ...components,
      { sku: "", productName: "", quantity: "", uom: "" },
    ]);
  };

  return (
    <div className="create-po">
      <h2>Create Purchase Order</h2>
      <form id="poForm" onSubmit={handleSubmit}>
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

        <div className="form-group">
          <label htmlFor="product">Product:</label>
          <input
            type="text"
            id="product"
            name="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Product Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter Quantity"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
          />
        </div>

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

        <button type="button" onClick={addComponent}>
          + Add Component
        </button>
        <br />

        <button type="submit">Submit PO</button>
      </form>
    </div>
  );
}

export default CreatePOSection;
