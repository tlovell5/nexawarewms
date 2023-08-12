import React from 'react';

function InventorySection({ inventory, setInventory }) {
  const exportToCSV = () => {
    const csvRows = [];
    const headers = ["ID", "Name", "Quantity"]; // Add other headers as necessary
    csvRows.push(headers.join(','));

    for(const product of inventory) {
      csvRows.push([product.id, product.name, product.quantity].join(','));
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
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            {/* ... other headers ... */}
          </tr>
        </thead>
        <tbody>
          {inventory.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              {/* ... other product properties ... */}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default InventorySection;
