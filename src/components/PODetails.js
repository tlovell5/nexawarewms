import React, { useState } from 'react';

function PODetails({ poData = {} }) {
  const [showComponents, setShowComponents] = useState(false);

  // Calculate the total price based on the products array
  const calculateTotalPrice = (products) => {
    return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  };

  return (
    <div className="po-details">
      <table>
        <thead>
          <tr>
            <th onClick={() => setShowComponents(!showComponents)}>PO Number</th>
            <th>Supplier</th>
            <th>Total Price</th>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {poData?.products?.map((product, index) => (
            <tr key={index}>
              {index === 0 && (
                <>
                  <td rowSpan={poData.products.length}>{poData.poNumber}</td>
                  <td rowSpan={poData.products.length}>{poData.supplier}</td>
                  <td rowSpan={poData.products.length}>${calculateTotalPrice(poData.products)}</td>
                </>
              )}
              <td>{product.productName}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}

          {/* Display the components below the PO if showComponents is true */}
          {showComponents && (
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
        </tbody>
      </table>
    </div>
  );
}

export default PODetails;
