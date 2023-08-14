import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "./supabaseClient";

function PODetails() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [activePOIndex, setActivePOIndex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPOData = async () => {
      const { data, error } = await supabase.from("purchaseOrders").select("*");
      if (error) {
        console.error("Error fetching purchase orders:", error);
        setError(
          "There was an error fetching the purchase orders. Please try again later."
        );
      } else {
        setPurchaseOrders(data);
      }
    };

    fetchPOData();
  }, []);

  const calculateTotalPrice = (products) => {
    return products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
  };

  const totalPriceMemo = useMemo(() => {
    return purchaseOrders.map((poData) => calculateTotalPrice(poData.products));
  }, [purchaseOrders]);

  return (
    <div className="po-details">
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>PO Number</th>
            <th>Supplier</th>
            <th>Total Price</th>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map((poData, poIndex) => (
            <React.Fragment key={poIndex}>
              {poData?.products?.map((product, index) => (
                <tr key={`${poIndex}-${index}`}>
                  {index === 0 && (
                    <>
                      <td
                        rowSpan={poData.products.length}
                        onClick={() =>
                          setActivePOIndex(
                            poIndex === activePOIndex ? null : poIndex
                          )
                        }
                        style={{ cursor: "pointer" }}
                        aria-label="Click to view associated components"
                      >
                        {poData.poNumber}
                      </td>
                      <td rowSpan={poData.products.length}>
                        {poData.supplier}
                      </td>
                      <td rowSpan={poData.products.length}>
                        ${totalPriceMemo[poIndex]}
                      </td>
                    </>
                  )}
                  <td>{product.productName}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}

              {/* Display the components below the PO if it's the active PO */}
              {poIndex === activePOIndex && (
                <tr>
                  <td colSpan="5">
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
                        {poData.components.map((component, compIndex) => (
                          <tr key={compIndex}>
                            <td>{component.sku}</td>
                            <td>{component.productName}</td>
                            <td>{component.quantity}</td>
                            <td>{component.uom}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PODetails;
