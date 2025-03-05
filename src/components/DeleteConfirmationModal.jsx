import React from 'react'

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirmDelete, 
  productToDelete,
  products 
}) => {


    if (!isOpen) return null;

  return (
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
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py- bg-[#e24d4d] hover:bg-[rgba(253,53,53,1)] text-[rgba(200,200,200,1)] rounded-md w-32 font-medium"
                  onClick={onConfirmDelete}
                >
                  Delete
                </button>
              </div>
              
            </div>
              </div>

          </div>
        </div>
        </div>
  )
}

export default DeleteConfirmationModal