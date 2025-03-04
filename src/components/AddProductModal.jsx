import React, { useEffect, useState } from 'react';
import avatar from '../assets/avatar.png'
import bellIcon from '../assets/bell-icon.png'

const AddProductModal = ({ isOpen, onClose, onSubmit, editingProduct }) => {
  const [formData, setFormData] = useState({
    widget: null,
    brand: '',
    category: '',
    productName: '',
    price: '',
    sku: '',
    location: ''
  });

  const [preview, setPreview] = useState(null);


  // When editingProduct changes or modal opens/closes, update the form
  useEffect(() => {
    if (editingProduct) {
      // Extract numeric price value (remove "Php" and trim)
      const priceValue = editingProduct.price ? 
        editingProduct.price.replace('Php', '').trim() : '';
      
      setFormData({
        brand: editingProduct.brand || '',
        category: editingProduct.category || '',
        productName: editingProduct.name || '',
        price: priceValue,
        sku: editingProduct.sku || '',
        location: editingProduct.location || '',
        widget: null // Can't restore the file object, but we can show the preview
      });
      
      // Set the preview image
      setPreview(editingProduct.image || null);
    } else if (isOpen) {
      // Reset form when opening for a new product
      setFormData({
        widget: null,
        brand: '',
        category: '',
        productName: '',
        price: '',
        sku: '',
        location: ''
      });
      setPreview(null);
    }
  }, [isOpen, editingProduct]);


  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'brand') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        category: '',
        productName: '',
        price: '',
        sku: editingProduct ? prev.sku : '' // Keep existing SKU when editing
      }));
    } else if (name === 'category') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        productName: '',
        price: '',
        sku: editingProduct ? prev.sku : '' 
      }));
    } else if (name === 'productName') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        price: productPrices[value] || '',
        sku: editingProduct ? prev.sku : prev.sku || generateSKU() // Generate new SKU
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  // Category options based on brand
  const categoryOptions = {
    Nike: ['Jeans', 'Tees', 'Shoes'],
    Gucci: ['Suit', 'Jeans', 'Tees', 'Shoes'],
    Balenciaga: ['Pants', 'Jeans', 'Tees', 'Shoes'],
    MSE: ['Glasses', 'Jewelries', 'Ring', 'Bracelet'],
    Natasha: ['Swim wears', 'Bikini']
  };

  // Product name options based on Categories
  const productNameOptions = {
    Tees: ['Black Tees', 'Red Tees', 'Blue Tees'],
    Jeans: ['Black Jeans', 'Red Jeans', 'Blue Jeans'],
    Shoes: ['Black Shoes', 'Red Shoes', 'Blue Shoes'],
    Suit: ['Black Suit', 'Red Suit', 'Blue Suit'],
    Pants: ['Black Pants', 'Red Pants', 'Blue Pants'],
    Glasses: ['Black Glasses', 'Red Glasses', 'Blue Glasses'],
    Jewelries: ['Gold Jewelry', 'Silver Jewelry', 'Diamond Jewelry'],
    Ring: ['Gold Ring', 'Silver Ring', 'Diamond Ring'],
    Bracelet: ['Gold Bracelet', 'Silver Bracelet', 'Diamond Bracelet'],
    'Swim wears': ['Blue Swimwear', 'Red Swimwear', 'Green Swimwear'],
    Bikini: ['Black Bikini', 'Red Bikini', 'Blue Bikini']
  };

  // Product Prices
// Product Prices
  const productPrices = {
    'Black Tees': '100.00',
    'Red Tees': '100.00',
    'Blue Tees': '100.00',
    'Black Jeans': '150.00',
    'Red Jeans': '150.00',
    'Blue Jeans': '150.00',
    'Black Shoes': '200.00',
    'Red Shoes': '200.00',
    'Blue Shoes': '200.00',
    'Black Suit': '300.00',
    'Red Suit': '300.00',
    'Blue Suit': '300.00',
    'Black Pants': '120.00',
    'Red Pants': '120.00',
    'Blue Pants': '120.00',
    'Black Glasses': '80.00',
    'Red Glasses': '80.00',
    'Blue Glasses': '80.00',
    'Gold Jewelry': '500.00',
    'Silver Jewelry': '350.00',
    'Diamond Jewelry': '1000.00',
    'Gold Ring': '250.00',
    'Silver Ring': '150.00',
    'Diamond Ring': '800.00',
    'Gold Bracelet': '180.00',
    'Silver Bracelet': '130.00',
    'Diamond Bracelet': '600.00',
    'Black Bikini': '90.00',
    'Red Bikini': '90.00',
    'Blue Bikini': '90.00',
    'Blue Swimwear': '130.00',
    'Red Swimwear': '130.00',
    'Green Swimwear': '130.00'
  };


  // Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        widget: file
      }));

  // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Include the original ID when editing
    const submissionData = {
      ...formData,
      id: editingProduct ? editingProduct.id : undefined
    };

    onSubmit(formData);

    // Reset form data
    setFormData({
      widget: null,
      brand: '',
      category: '',
      productName: '',
      price: '',
      sku: prev.sku || generateSKU(),
      location: ''
    });
    setPreview(null);
    onClose();
  };

  // Handle Discard 
  const handleDiscard = (e) => {
    e.preventDefault()
    // Reset form data
    setFormData({
      widget: null,
      brand: '',
      category: '',
      productName: '',
      price: '',
      sku: '',
      location: ''
    });
    setPreview(null);
    onClose();
  }


  // Handle Drag and Drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        widget: file
      }));


      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  // Function to generate a random 10-digit SKU
const generateSKU = () => {
  return Math.floor(1000000000 + Math.random() * 999999999).toString();
};

  // If modal is not open, don't render anything
  if (!isOpen) return null;




  return (
    <div className="fixed top-0 left-[270px] right-0 bottom-0 bg-[rgba(25,26,25,1)] z-50">

        {/* Top with Avatar */}
              <div className='h-[70px] flex justify-end items-center gap-15 px-10 border-b-1 border-[rgba(44,44,44,1)]'>
                <img src={bellIcon} alt="" />
                <img src={avatar} alt="" />
              </div>

      <div className="w-full h-full overflow-y-auto p-10">
        
        <form onSubmit={handleSubmit} className="max-w-4xl my-0 mx-auto space-y-6">
            <h2 className="text-xl text-white font-medium mb-8">Add Product</h2>

          {/* Widget Upload */}
          <div>
            <label className="block text-gray-400 mb-2">
              Widget<span className="text-red-500">*</span>
            </label>
            <div
              className="w-24 h-24 bg-[#2C2C2C] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#363636] relative"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx"
                required={!editingProduct}
              />
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="text-center text-gray-400">
                  <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-xs mt-2 block">Add Widget</span>
                </div>
              )}
            </div>
            {formData.widget && (
              <p className="text-sm text-gray-400 mt-2">
                {formData.widget.name}
              </p>
            )}
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-2 gap-y-8 gap-x-12">
            {/* Brand */}
            <div>
              <label className="block text-gray-400 mb-2">
                Brand<span className="text-red-500">*</span>
              </label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full h-[70%] bg-[#2C2C2C] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8946A6]"
                required
              >
                <option value="" disabled>Select Brand</option>
                <option value="Nike">Nike</option>
                <option value="Gucci">Gucci</option>
                <option value="Balenciaga">Balenciaga</option>
                <option value="MSE">MSE</option>
                <option value="Natasha">Natasha</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-400 mb-2">
                Category<span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full h-[70%] bg-[#2C2C2C] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8946A6]"
                disabled={!formData.brand}
                required
              >
                <option value="" disabled>Select Category</option>
                {categoryOptions[formData.brand]?.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-gray-400 mb-2">
                Product Name<span className="text-red-500">*</span>
              </label>
              <select 
              name="productName" 
              value={formData.productName} 
              onChange={handleChange} 
              className="w-full h-[70%] bg-[#2C2C2C] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8946A6]"
              disabled={!formData.category}
              required
              >
                <option value="" disabled>Select Product</option>
                {productNameOptions[formData.category]?.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-400 mb-2">
                Price<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                readOnly
                // step="0.01"
                className="w-full h-[70%] bg-[#2C2C2C] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8946A6]"
                required
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-gray-400 mb-2">
                Stock Keeping Unit (SKU)
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                readOnly
                className="w-full h-[70%] bg-[#2C2C2C] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8946A6]"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-400 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full h-[70%] bg-[#2C2C2C] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8946A6]"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={handleDiscard}
              className="w-[124px] h-[40px] border border-[rgba(137,70,166,1)] text-white rounded-[40px] hover:bg-[rgba(137,70,166,1)] transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              className="w-[124px] h-[40px]  bg-[#8946A6] text-white border border-[rgba(137,70,166,1)] rounded-[40px] hover:bg-[#b673ce] transition-colors"
            >
              Save
            </button>
          </div>
        </form>
        

      </div>
    </div>
  );
};

export default AddProductModal;