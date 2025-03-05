import React from 'react'

const ProductDetails = ({isOpen, onClose, productToView, products}) => {
    if (!isOpen) return null;

    // Find the specific product to view
    const product = products.find(p => p.id === productToView);

    if (!product) return null;

    return (
    <div className="fixed inset-0 bg-[rgba(44,44,44,0.75)] flex justify-center items-center z-50">
        <div className="bg-[rgba(25,26,25,1)] text-white rounded-lg shadow-lg w-[822px] h-[533px]">
                
                {/* Content */}
                <div className=" flex justify-between">
                    
                    {/* Product Image */}
                    <div className="w-1/2 ">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-[533px] object-cover"
                        />
                    </div>

                    {/* Product Details */}
            <div className="w-1/2">
                        <div className="">

                {/* Header */}
                <div className="flex items-center justify-between py-5 px-8 border-b border-gray-700">
                    <h2 className="text-[rgba(200,200,200,1)] text-[16px] font-medium uppercase">PRODUCT DETAILS</h2>

                    <button 
                onClick={onClose} 
                className=" text-white hover:text-gray-300"
                >
                    ✕
                </button>
                </div>

                <div className='pt-12 px-8 space-y-6 font-medium'>
                    <div className="grid grid-cols-2 items-center">
                        <p className="text-sm text-[rgba(122,122,122,1)]">Product ID:</p>
                        <p className="text-sm">{product.id}</p>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <p className="text-sm text-[#7A7A7A]">Brand:</p>
                        <p className="text-sm">{product.brand}</p>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <p className="text-sm text-[#7A7A7A]">Product Name:</p>
                         <p className="text-sm">{product.name || "N/A"}</p>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <p className="text-sm text-[#7A7A7A]">Category:</p>
                         <p className="text-sm">{product.category}</p>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                       <p className="text-sm text-[#7A7A7A]">Price:</p>
                         <p className="text-sm">{product.price}</p>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                         <p className="text-sm text-[#7A7A7A]">Location:</p>
                        <p className="text-sm">{product.location}</p>
                    </div>

                     <div className="grid grid-cols-2 items-center">
                          <p className="text-sm text-[#7A7A7A]">SKU:</p>
                          <p className="text-sm">{product.sku}</p>
                     </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default ProductDetails