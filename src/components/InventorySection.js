import React, { useState } from 'react';

function InventorySection({ inventory, setInventory }) {

  const initialFilters = {
    licensePlate: "",
    sku: "",
    name: "",
    lotNumber: "",
    expirationDate: "",
    quantity: "",
    uom: "",
    location: "",
    customer: "",
    transactionBy: "",
    timestamp: ""
  };

  const [filters, setFilters] = useState(initialFilters);

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

  const handleFilterChange = (e, key) => {
    setFilters({
      ...filters,
      [key]: e.target.value
    });
  };

  const filteredInventory = inventory.filter(product => {
    for (let key in filters) {
      if (filters[key] && !product[key].toString().toLowerCase().includes(filters[key].toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  const handleEdit = (index) => {
    const newInventory = [...inventory];
    newInventory[index].isEditing = true;
    setInventory(newInventory);
  };

  const handleSave = (index) => {
    const newInventory = [...inventory];
    const row = document.getElementById(`row-${index}`).querySelectorAll('td input');
    Object.keys(mappingKeys).forEach((header, headerIndex) => {
      if (header !== "Timestamp") {
        newInventory[index][mappingKeys[header]] = row[headerIndex].value;
      }
    });

    delete newInventory[index].isEditing;
    setInventory(newInventory);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to permanently delete this row?")) {
      const newInventory = [...inventory];
      newInventory.splice(index, 1);
      setInventory(newInventory);
    }
  };

  const exportToCSV = () => {
    const element = document.createElement('a');
    const headers = Object.keys(mappingKeys);
    const csvData = [
      headers.join(','),
      ...filteredInventory.map(row => headers.map(header => row[mappingKeys[header]]).join(','))
    ].join('\n');

    element.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`;
    element.target = '_blank';
    element.download = 'inventory.csv';
    element.click();
  };

  return (
    <section className="inventory-list" id="inventorySection">
      <button className="export-btn" onClick={exportToCSV}>Export to CSV</button>
      <h3>Inventory List</h3>
      <table id="inventoryTable">
        <thead>
          <tr>
            {Object.keys(mappingKeys).map(header => (
              <th key={header}>
                {header}
                <input 
                  type="text"
                  placeholder={`Filter by ${header}`}
                  value={filters[mappingKeys[header]]}
                  onChange={e => handleFilterChange(e, mappingKeys[header])}
                  className="filter-input"
                />
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((product, index) => (
            <tr key={index} id={`row-${index}`}>
              {Object.keys(mappingKeys).map(header => (
                <td key={header}>
                  {product.isEditing && header !== "Timestamp" ? (
                    <input type="text" defaultValue={product[mappingKeys[header]]} />
                  ) : (
                    product[mappingKeys[header]]
                  )}
                </td>
              ))}
              <td>
                {product.isEditing ? (
                  <>
                    <button onClick={() => handleSave(index)}>Save</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default InventorySection;
