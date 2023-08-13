import React, { useState } from 'react';

function PODetails({ purchaseOrders = [] }) {
  const [activePOIndex, setActivePOIndex] = useState(null); // to keep track of which PO's details to show

  const calculateTotalPrice = (products) => {
    return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  };

  return (
    <div className="po-details">
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
            <>
              {poData?.products?.map((product, index) => (
                <tr key={`${poIndex}-${index}`}>
                  {index === 0 && (
                    <>
                      <td rowSpan={poData.products.length} onClick={() => setActivePOIndex(poIndex === activePOIndex ? null : poIndex)}>
                        {poData.poNumber}
                      </td>
                      <td rowSpan={poData.products.length}>{poData.supplier}</td>
                      <td rowSpan={poData.products.length}>${calculateTotalPrice(poData.products)}</td>
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
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PODetails;
