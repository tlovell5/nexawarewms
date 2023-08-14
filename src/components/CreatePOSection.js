import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

function CreatePOSection() {
  const [supplier, setSupplier] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [products, setProducts] = useState([
    { productName: "", quantity: "", price: "" },
  ]);
  const [components, setComponents] = useState([
    { sku: "", productName: "", quantity: "", uom: "" },
  ]);
  const navigate = useNavigate();

  const updateArrayField = (array, setArray, index, field, value) => {
    const newArray = [...array];
    newArray[index][field] = value;
    setArray(newArray);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const poData = {
      supplier,
      poNumber,
      products,
      components,
    };

    const { data: poResponse, error: poError } = await supabase
      .from("purchase_orders")
      .insert([{ supplier, poNumber }]);

    if (poError) {
      console.error("Error inserting purchase order:", poError);
      // TODO: Show user-friendly error message
      return;
    }

    const poId = poResponse[0].id;

    const { error: productError } = await supabase.from("products").insert(
      products.map((product) => ({
        po_id: poId,
        name: product.productName,
        quantity: product.quantity,
        price: product.price,
      }))
    );

    if (productError) {
      console.error("Error inserting products:", productError);
      // TODO: Show user-friendly error message
      return;
    }

    // Inserting components
    const { error: componentError } = await supabase.from("components").insert(
      components.map((component) => ({
        po_id: poId,
        sku: component.sku,
        productName: component.productName,
        quantity: component.quantity,
        uom: component.uom,
      }))
    );

    if (componentError) {
      console.error("Error inserting components:", componentError);
      // TODO: Show user-friendly error message
      return;
    }

    navigate("/po-details"); // Navigate to the details page
  };

  const addProduct = () => {
    setProducts([...products, { productName: "", quantity: "", price: "" }]);
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
                value={product.productName}
                onChange={(e) =>
                  updateArrayField(
                    products,
                    setProducts,
                    index,
                    "productName",
                    e.target.value
                  )
                }
                placeholder="Product Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`quantity-${index}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${index}`}
                value={product.quantity}
                onChange={(e) =>
                  updateArrayField(
                    products,
                    setProducts,
                    index,
                    "quantity",
                    e.target.value
                  )
                }
                placeholder="Enter Quantity"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`price-${index}`}>Price:</label>
              <input
                type="text"
                id={`price-${index}`}
                value={product.price}
                onChange={(e) =>
                  updateArrayField(
                    products,
                    setProducts,
                    index,
                    "price",
                    e.target.value
                  )
                }
                placeholder="Enter Price"
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addProduct}>
          + Add Product
        </button>
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
                    onChange={(e) =>
                      updateArrayField(
                        components,
                        setComponents,
                        index,
                        "sku",
                        e.target.value
                      )
                    }
                    placeholder="SKU"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={component.productName}
                    onChange={(e) =>
                      updateArrayField(
                        components,
                        setComponents,
                        index,
                        "productName",
                        e.target.value
                      )
                    }
                    placeholder="Product Name"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={component.quantity}
                    onChange={(e) =>
                      updateArrayField(
                        components,
                        setComponents,
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                    placeholder="Quantity"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={component.uom}
                    onChange={(e) =>
                      updateArrayField(
                        components,
                        setComponents,
                        index,
                        "uom",
                        e.target.value
                      )
                    }
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
