import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function PODetails() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [activePOIndex, setActivePOIndex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPOData = async () => {
      try {
        const { data, error } = await supabase.from("purchase_orders").select(`
            *,
            components: components (sku, productName, quantity, uom)
          `);

        if (error) {
          throw error;
        }

        setPurchaseOrders(data);
        console.log(data); // For debugging: to inspect the data structure received from Supabase
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
        setError(
          "There was an error fetching the purchase orders. Please try again later."
        );
      }
    };

    fetchPOData();
  }, []);

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
          {purchaseOrders &&
            purchaseOrders.map((poData, poIndex) => (
              <React.Fragment key={poIndex}>
                <tr
                  onClick={() =>
                    setActivePOIndex(poIndex === activePOIndex ? null : poIndex)
                  }
                  style={{ cursor: "pointer" }}
                  aria-label="Click to view more details"
                >
                  <td>{poData.poNumber}</td>
                  <td>{poData.supplier}</td>
                  <td>${poData.total_price}</td>
                  <td>{poData.product}</td>
                  <td>{poData.quantity}</td>
                </tr>

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
                          {poData?.components?.map((component, compIndex) => (
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
