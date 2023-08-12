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

  return (
    <section className="inventory-list" id="inventorySection">
      <h3>Inventory List</h3>
      <table id="inventoryTable">
        <thead>
          <tr>
            {Object.keys(mappingKeys).map(header => (
                <th key={header}>{header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((product, index) => (
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
