import React from 'react';

function InventorySection({ inventory, setInventory }) {
  
  const mappingKeys = {
    "License Plate": "licensePlate",
    "Sku #": "sku",
    "Product Name": "name",  
    "Lot Number": "lotNumber",
    "Expiration Date": "expirationDate",
    "Quantity": "quantity",
    "UOM": "uom",
    "Location": "location",
    "Customer": "customer",
    "Transaction By": "transactionBy",
    "Timestamp": "timestamp"
  };

  const exportToCSV = () => {
    const headers = [
      "License Plate", "Sku #", "Product Name", "Lot Number", "Expiration Date", 
      "Quantity", "UOM", "Location", "Customer", "Transaction By", "Timestamp"
    ];
    const csvRows = [headers.join(',')];

    for (const product of inventory) {
      const row = headers.map(header => product[mappingKeys[header]]);
      csvRows.push(row.join(','));
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'inventory.csv';
    link.click();
  }

  return (
    <section className="inventory-list" id="inventorySection">
      <h3>Inventory List</h3>
      <button className="export-btn" onClick={exportToCSV}>Export to CSV</button>
      <table id="inventoryTable">
        <thead>
          <tr>
            {["License Plate", "Sku #", "Product Name", "Lot Number", "Expiration Date", 
              "Quantity", "UOM", "Location", "Customer", "Transaction By", "Timestamp"].map(header => (
                <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inventory.map((product, index) => (
            <tr key={index}>
              {["License Plate", "Sku #", "Product Name", "Lot Number", "Expiration Date", 
                "Quantity", "UOM", "Location", "Customer", "Transaction By", "Timestamp"].map(header => (
                  <td key={header}>{product[mappingKeys[header]]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default InventorySection;
