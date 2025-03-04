import React from 'react'
import Sidebar from '../components/Sidebar'
import Product from '../components/Product'

const Dashboard = () => {
  return (
    <div className='flex'>
        <Sidebar />
        <Product />
    </div>
  )
}

export default Dashboard