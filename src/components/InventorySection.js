import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function InventorySection() {
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
    timestamp: "",
  };

  const [inventory, setInventory] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const mappingKeys = {
    "License Plate": "licensePlate",
    "Sku #": "sku",
    "Product Name": "name",
    "Lot Number": "lotNumber",
    "Expiration Date": "expirationDate",
    Quantity: "quantity",
    UOM: "uom",
    Location: "location",
    Customer: "customer",
    "Transaction By": "transactionBy",
    Timestamp: "timestamp",
  };

  useEffect(() => {
    async function fetchInventory() {
      const { data, error } = await supabase.from("inventory").select("*");
      if (data) {
        setInventory(data);
      } else if (error) {
        console.error("Error fetching inventory:", error);
      }
    }
    fetchInventory();
  }, []);

  const handleFilterChange = (e, key) => {
    setFilters({
      ...filters,
      [key]: e.target.value,
    });
  };

  const filteredInventory = inventory.filter((product) => {
    for (let key in filters) {
      if (
        filters[key] &&
        !product[key]
          .toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase())
      ) {
        return false;
      }
    }
    return true;
  });

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingProduct({ ...inventory[index] });
  };

  const handleProductChange = (header, value) => {
    setEditingProduct((prev) => ({
      ...prev,
      [mappingKeys[header]]: value,
    }));
  };

  const handleSave = async (index) => {
    const updatedProduct = editingProduct;

    try {
      const response = await supabase
        .from("inventory")
        .update(updatedProduct)
        .eq("id", updatedProduct.id)
        .select();
      console.log(response);
      if (response && response.data) {
        const updatedInventory = [...inventory];
        updatedInventory[index] = response.data[0];
        setInventory(updatedInventory);
        setEditingIndex(null);
        setEditingProduct(null);
      } else {
        console.error("Error updating inventory:", response.error);
      }
    } catch (error) {
      console.error("An error occurred during update:", error);
    }
  };

  const handleDelete = async (index) => {
    if (
      window.confirm("Are you sure you want to permanently delete this row?")
    ) {
      const product = inventory[index];

      // Update the local state first
      const newInventory = [...inventory];
      newInventory.splice(index, 1);
      setInventory(newInventory);

      // Then perform the database operation
      const { data, error } = await supabase
        .from("inventory")
        .delete()
        .eq("id", product.id);

      if (!data && error) {
        console.error("Error deleting from inventory:", error);

        // If there's an error, revert to the old inventory
        setInventory(inventory);
      }
    }
  };

  const exportToCSV = () => {
    const element = document.createElement("a");
    const headers = Object.keys(mappingKeys);
    const csvData = [
      headers.join(","),
      ...filteredInventory.map((row) =>
        headers.map((header) => row[mappingKeys[header]]).join(",")
      ),
    ].join("\n");

    element.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`;
    element.target = "_blank";
    element.download = "inventory.csv";
    element.click();
  };

  return (
    <section className="inventory-list" id="inventorySection">
      <button className="export-btn" onClick={exportToCSV}>
        Export to CSV
      </button>
      <h3>Inventory List</h3>
      <table id="inventoryTable">
        <thead>
          <tr>
            {Object.keys(mappingKeys).map((header) => (
              <th key={header}>
                {header}
                <input
                  type="text"
                  placeholder={`Filter by ${header}`}
                  value={filters[mappingKeys[header]]}
                  onChange={(e) => handleFilterChange(e, mappingKeys[header])}
                  className="filter-input"
                />
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((product, index) => (
            <tr key={product.sku} id={`row-${product.sku}`}>
              {Object.keys(mappingKeys).map((header) => (
                <td key={header}>
                  {index === editingIndex ? (
                    <input
                      type="text"
                      value={editingProduct[mappingKeys[header]]}
                      onChange={(e) =>
                        handleProductChange(header, e.target.value)
                      }
                    />
                  ) : (
                    product[mappingKeys[header]]
                  )}
                </td>
              ))}
              <td>
                {index === editingIndex ? (
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
