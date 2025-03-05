import React from 'react'
import '../index.css'
import productIcon from '../assets/product-icon.png'
import brandIcon from '../assets/brands-icon.png'
import categoriesIcon from '../assets/categories-icon.png'
import invoiceIcon from '../assets/invoice-icon.png'
import suppliersIcon from '../assets/suppliers-icon.png'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[306px] h-screen border-r-1 border-[rgba(44,44,44,1)] px-5 pt-20.5'>
      <h1 className="text-xl font-bold pl-[3rem]">LOGO</h1>

      <ul className="mt-[6rem] font-medium text-sm">
        <li className="p-4.5 hover:bg-[rgba(44,44,44,1)] rounded-sm flex gap-4">
          <Link to=''
          className='flex gap-4 items-center'>
          <img src={productIcon} alt="" />
          Products
          </Link>
          </li>

        <li className="p-4.5 hover:bg-[rgba(44,44,44,1)] rounded-sm cursor-pointer">
          <Link to=''
          className='flex gap-4 items-center'>
          <img src={brandIcon} alt="" style={{height:"14px", width:"17px"}}/>
          Brands
          </Link>
          </li>

        <li className="p-4.5 hover:bg-[rgba(44,44,44,1)] rounded-sm cursor-pointer">
          <Link to=''
          className='flex gap-4 items-center'>
          <img src={categoriesIcon} alt="" />
          Categories
          </Link>
          </li>

        <li className="p-4.5 hover:bg-[rgba(44,44,44,1)] rounded-sm cursor-pointer">
          <Link to=''
          className='flex gap-4 items-center'>
          <img src={invoiceIcon} alt=""  />
          Invoice
          </Link>
          </li>

        <li className="p-4 hover:bg-[rgba(44,44,44,1)] rounded-sm cursor-pointer ">
          <Link to=''
          className='flex gap-4 items-center'>
          <img src={suppliersIcon} alt="" />
          Suppliers
          </Link>
          </li>
      </ul>
    </div>
  )
}

export default Sidebar