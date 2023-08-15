import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function PODetails() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [activePOIndex, setActivePOIndex] = useState(null);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    poNumber: "",
    supplier: "",
    totalPrice: "",
    product: "",
    quantity: "",
  });

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
        console.log(data);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
        setError(
          "There was an error fetching the purchase orders. Please try again later."
        );
      }
    };

    fetchPOData();
  }, []);

  const filteredPurchaseOrders = purchaseOrders.filter((po) => {
    return (
      (filters.poNumber === "" || po.poNumber.includes(filters.poNumber)) &&
      (filters.supplier === "" || po.supplier.includes(filters.supplier)) &&
      (filters.totalPrice === "" ||
        po.total_price === parseFloat(filters.totalPrice)) &&
      (filters.product === "" || po.product.includes(filters.product)) &&
      (filters.quantity === "" || po.quantity === parseInt(filters.quantity))
    );
  });

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

          {/* Filter Inputs Row */}
          <tr>
            <td>
              <input
                type="text"
                placeholder="Filter by PO Number"
                value={filters.poNumber}
                onChange={(e) =>
                  setFilters({ ...filters, poNumber: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Filter by Supplier"
                value={filters.supplier}
                onChange={(e) =>
                  setFilters({ ...filters, supplier: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Filter by Total Price"
                value={filters.totalPrice}
                onChange={(e) =>
                  setFilters({ ...filters, totalPrice: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Filter by Product"
                value={filters.product}
                onChange={(e) =>
                  setFilters({ ...filters, product: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Filter by Quantity"
                value={filters.quantity}
                onChange={(e) =>
                  setFilters({ ...filters, quantity: e.target.value })
                }
              />
            </td>
          </tr>
        </thead>
        <tbody>
          {filteredPurchaseOrders &&
            filteredPurchaseOrders.map((poData, poIndex) => (
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
