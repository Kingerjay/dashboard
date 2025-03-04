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

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
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
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productToDelete));

    setDeleteModal(false);
    setProductToDelete(null);
  }


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
          <tr key={index} className=" text-left even:bg-[rgba(44,44,44,1)]">
            <td className="h-[60px] px-4">
            <div className="flex items-center gap-4">
              <img 
                src={product.image} 
                alt="" 
                className="w-8 h-8 rounded-full "
              />
              {product.id}
            </div>
          </td>
            <td className="py-2 px-4">{product.sku}</td>
            <td className="py-2 px-4">{product.name}</td>
            <td className="py-2 px-4">{product.quantity}</td>
            <td className="py-2 px-4">{product.price}</td>
            <td className="py-2 px-4">
              <div className='flex gap-1 items-center'>
              <img src={location} alt="" />
              {product.location}
              </div>
              </td>
            <td className="h-[53px] px-4 flex justify-center items-center gap-4">

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
      {deleteModal && (
        <div className="fixed inset-0 bg-[rgba(44,44,44,0.75)]  flex justify-center items-center z-50">
          <div className="bg-[rgba(25,26,25,1)] text-white rounded-lg shadow-lg w-[551px] h-[371px] ">
            <div className="flex flex-col h-full">

              {/* Header with warning icon */}
              <div className="flex items-center gap-2 border-b border-[rgba(44,44,44,1)] px-6 py-4">
                <div className="w-8 h-8  rounded-full flex items-center justify-center">
                  <span className=" text-sm">⚠️</span>
                </div>
                <h2 className="text-[16px] text-[rgba(253,53,53,1)] font-medium uppercase">DELETE CONFIRMATION</h2>
              </div>
              
              <div className='py-8 px-16'>
              {/* Confirmation message */}
              <p className="text-sm font-normal mb-6 ">Are you sure you want to delete this product?</p>
              
              {/* Product details */}
              <div className="">
                <div className="">
                  {productToDelete && (
            <div className="text-sm flex flex-col gap-3">
              
              {products
                .filter((product) => product.id === productToDelete)
                .map((product) => (
                  <div 
                  key={product.id}
                  className='flex flex-col gap-2 w-[60%]'
                  >
                    <div className="grid grid-cols-2">
                      <p className='text-sm font-medium text-[rgba(122,122,122,1)]'>Product ID:</p>
                      <p className='text-sm font-normal'>{product.sku}</p>
                    </div>

                    <div className="grid grid-cols-2 ">
                      <p className='text-sm font-medium text-[rgba(122,122,122,1)]'>Brand:</p>
                      <p className='text-sm font-normal'>{product.brand}</p>
                    </div>

                    <div className="grid grid-cols-2">
                      <p className='text-sm font-medium text-[rgba(122,122,122,1)]'>Product Name:</p>
                      <p className='text-sm font-normal'>{product.name || "N/A"}</p>
                    </div>

                    <div className="grid grid-cols-2">
                      <p className='text-sm font-medium text-[rgba(122,122,122,1)]'>Category:</p>
                      <p className='text-sm font-normal'>{product.category}</p>
                    </div>
                  </div>
                ))}
            </div>
            )}

                  
              </div>
              
              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-8">
                <button 
                  className="px-6 py-2 border border-[rgba(200,200,200,1)] rounded-md text-[rgba(200,200,200,1)] w-32 font-medium"
                  onClick={() => setDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py- bg-[#e24d4d] hover:bg-[rgba(253,53,53,1)] text-[rgba(200,200,200,1)] rounded-md w-32 font-medium"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
              
            </div>
              </div>

          </div>
        </div>
        </div>
      )}


      
    </div>
  )
}

export default Product