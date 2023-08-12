import React, { useState } from 'react';

function ReceivingSection({ onAddProduct }) {
  const initialFormState = {
    licensePlate: '',
    sku: '',
    productName: '',
    lotNumber: '',
    expirationDate: '',
    quantity: '',
    location: '',
    uom: 'EA',
    customer: '',
    transactionBy: '',
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddProduct({
      ...formData,
      timestamp: new Date().toLocaleString(),
    });
    alert('Submission Successful!');
    setFormData(initialFormState);
  };

  return (
    <section className="add-product" id="receivingSection">
      <h3>Receive Product</h3>
      <form onSubmit={handleSubmit}>
        {/* ... your form elements ... */}
        <div className="form-group">
          <button type="submit">Add Product</button>
        </div>
      </form>
    </section>
  );
}

export default ReceivingSection;
