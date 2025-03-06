import React, { useEffect, useState } from 'react'
import bellIcon from '../assets/bell-icon.png'
import avatar from '../assets/avatar.png'
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import brandIcon from '../assets/brands-icon.png'
import editIcon from '../assets/edit.png'
import deleteIcon from '../assets/delete.png'
import location from '../assets/location.png'
import categoriesIcon from '../assets/categories-icon.png'
import { BsFunnel } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import Pagination from './Pagination';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import ProductDetails from './ProductDetails';

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [productToView, setProductToView] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to show per page


  // Load products from localStorage or use initial data
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
   return savedProducts ? JSON.parse(savedProducts) : [];
  });

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);


    // Handle Add Product
    const handleAddProduct = (newProduct) => {
    const productId = Math.max(...(products.length ? products.map(p => p.id) : [0]), 0) + 1;

    // Check if there's an image file
    if (newProduct.widget) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const formattedProduct = {
          id: productId,
          image: reader.result, // Save as base64 string
          sku: newProduct.sku,
          name: newProduct.productName,
          quantity: 10, // Default quantity
          price: `${newProduct.price} Php`,
          location: newProduct.location || 'N/A',
          brand: newProduct.brand,
          category: newProduct.category
        };

        setProducts(prevProducts => [...prevProducts, formattedProduct]);
      };
      reader.readAsDataURL(newProduct.widget);
    } else {
      // Handle case when there's no image
      const formattedProduct = {
        id: productId,
        image: '', // Default or placeholder image
        sku: newProduct.sku,
        name: newProduct.productName,
        quantity: 10, // Default quantity
        price: `${newProduct.price} Php`,
        location: newProduct.location || 'N/A',
        brand: newProduct.brand,
        category: newProduct.category
      };

      setProducts(prevProducts => [...prevProducts, formattedProduct]);
    }
    
    setIsModalOpen(false);
  };


  // Edit product handler
  const handleEditClick = (product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };


   const handleUpdateProduct = (updatedProduct) => {
    // Find the product index in the array
    const productIndex = products.findIndex(p => p.id === updatedProduct.id);
    
    if (productIndex === -1) return;
    
    // Create a new array with the updated product
    const updatedProducts = [...products];
    
    // If there's a new image
    if (updatedProduct.widget) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          image: reader.result,
          sku: updatedProduct.sku,
          name: updatedProduct.productName,
          price: `${updatedProduct.price} Php`,
          location: updatedProduct.location || 'N/A',
          brand: updatedProduct.brand,
          category: updatedProduct.category
        };
        
        setProducts(updatedProducts);
      };
      reader.readAsDataURL(updatedProduct.widget);
    } else {
      // No new image, use original or empty
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        sku: updatedProduct.sku,
        name: updatedProduct.productName,
        price: `${updatedProduct.price} Php`,
        location: updatedProduct.location || 'N/A',
        brand: updatedProduct.brand,
        category: updatedProduct.category
      };
      
      setProducts(updatedProducts);
    }
    
    setIsEditModalOpen(false);
    setProductToEdit(null);
  };


  // Delete product handler
  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setDeleteModal(true);
    
  };

  // Confirm Delete
  const confirmDelete = () => {
  // First filter out the deleted product
  const remainingProducts = products.filter(product => product.id !== productToDelete);
  
  // Then reassign IDs to ensure sequential numbering
  const updatedProducts = remainingProducts.map((product, index) => ({
    ...product,
    id: index + 1
  }));

  setProducts(updatedProducts);
  setDeleteModal(false);
  setProductToDelete(null);
}

  // Product Details Modal
  const handleProductDetails = (productId) => {
    setProductToView(productId);
    setProductDetails(true);
    
  };



  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.sku.toString().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Paginate products
const paginatedProducts = filteredProducts.slice(
  (currentPage - 1) * itemsPerPage, 
  currentPage * itemsPerPage
);


  return (
    <div className='w-full '>

      {/* Top with Avatar */}
      <div className='h-[70px] flex justify-end items-center gap-15 px-10 border-b-1 border-[rgba(44,44,44,1)]'>
        <img src={bellIcon} alt="" />
        <img src={avatar} alt="" />
      </div>

      {/* Table top text */}
      <div className='flex justify-between items-center px-10 py-12'>
        {/* Left side wrapper */}
        <div className='flex items-center gap-10'>
          <p className='text-2xl font-semibold'>Products</p>

          {/* Search box */}
          <div className='w-[267px] h-[40px] p-3  flex items-center gap-3 bg-[rgba(44,44,44,1)] rounded-[40px]'>
          <IoSearch size={20}/>
          <input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm}
          onChange={handleSearch}
          className="bg-[rgba(44,44,44,1)] outline-none flex items-center" 
          />
          </div>
        </div>

        {/* Right side wrapper */}
        <div className='flex items-center text-sm font-medium gap-3'>

          <div className="w-[143px] h-[40px] rounded-[40px] cursor-pointer border border-[rgba(44,44,44,1)] flex items-center justify-center ">
          <Link to=''
          className='flex gap-2 items-center'>
          <img src={brandIcon} alt="" style={{height:"14px", width:"17px"}}/>
          <p className='flex items-center'>Brands
            <IoMdArrowDropdown className='text-[rgba(44,44,44,1)] w-[35px] h-[30px] pt-1' />
          </p>
          </Link>
          </div>

          <div className="w-[143px] h-[40px] rounded-[40px] cursor-pointer border border-[rgba(44,44,44,1)] flex items-center justify-center ">
          <Link to=''
          className='flex gap-2 items-center'>
          <BsFunnel size={14}/>
          <p className='flex items-center'>Category
            <IoMdArrowDropdown className='text-[rgba(44,44,44,1)] w-[35px] h-[30px] pt-1' />
          </p>
          </Link>
          </div>

          <div className="w-[143px] h-[40px] bg-[rgba(137,70,166,1)] rounded-[40px] cursor-pointer border border-[rgba(44,44,44,1)] flex items-center justify-center text-white hover:bg-[#b673ce] transition-colors"
          onClick={() => setIsModalOpen(true)}>
          <button className='flex gap-2 items-center'
          >
            <FaPlus />
            <p>Product</p>
          </button>
        </div>
           
        </div>
      </div>


      {/* Table and Mapping */}
     <div className='w-full px-10'>
      <table className="w-full overflow-y-auto">
        <thead>
          <tr className="bg-[rgba(44,44,44,1)] text-left">
            
            <th className="h-[54px] pl-16">Product ID</th>
            <th className="py-2 px-4">SKU</th>
            <th className="py-2 px-4">Product Name</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Location</th>
            <th className="py-2 px-4 text-center"></th>
          </tr>
        </thead>
      <tbody>
        {paginatedProducts.length === 0 ? (
            <div className="w-full h-full p-6 text-gray-500">
                        <p className='text-center'>No Product yet</p>
                    </div>
        ) : (
        paginatedProducts?.map((product, index) => (
          <tr 
              key={index} 
              className="cursor-pointer text-left even:bg-[rgba(44,44,44,1)]"
            >
              <td 
                onClick={() => handleProductDetails(product.id)} 
                className="h-[60px] px-4"
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={product.image} 
                    alt="" 
                    className="w-8 h-8 rounded-full"
                  />
                  {product.id}
                </div>
              </td>
              <td 
                onClick={() => handleProductDetails(product.id)}
                className="py-2 px-4"
              >
                {product.sku}
              </td>
              <td 
                onClick={() => handleProductDetails(product.id)}
                className="py-2 px-4"
              >
                {product.name}
              </td>
              <td 
                onClick={() => handleProductDetails(product.id)}
                className="py-2 px-4"
              >
                {product.quantity}
              </td>
              <td 
                onClick={() => handleProductDetails(product.id)}
                className="py-2 px-4"
              >
                {product.price}
              </td>
              <td 
                onClick={() => handleProductDetails(product.id)}
                className="py-2 px-4"
              >
                <div className='flex gap-1 items-center'>
                  <img src={location} alt="" />
                  {product.location}
                </div>
              </td>
              <td 
                className="h-[53px] px-4 flex justify-center items-center gap-4"
                onClick={(e) => e.stopPropagation()} // Prevent product details from opening
              >
                {/* Edit Button */}
                <button 
                  className=""
                  onClick={() => handleEditClick(product)}
                >
                  <img src={editIcon} alt="" />
                </button>

                {/* Delete Button */}
                <button 
                  className=""
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <img src={deleteIcon} alt="" />
                </button>
              </td>
            </tr>
        )))}
      </tbody>
      </table>

      <Pagination 
        totalPages={totalPages} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
      />
     </div>

    
    {/* Add Product Modal */}
     <AddProductModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      onSubmit={handleAddProduct}
    />


      {/* Edit Product Modal */}
      <EditProductModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setProductToEdit(null);
        }} 
        onSubmit={handleUpdateProduct}
        product={productToEdit}
      />


      {/* Show Delete Modal */}
      <DeleteConfirmationModal 
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setProductToDelete(null);
        }}
        onConfirmDelete={confirmDelete}
        productToDelete={productToDelete}
        products={products}
      />

      {/* Show Product Details */}
      <ProductDetails 
      isOpen={productDetails}
      onClose={() => {
        setProductDetails(false);
        setProductToView(null);
      }}
      productToView={productToView}
      products={products}
      />


      
    </div>
  )
}

export default Product