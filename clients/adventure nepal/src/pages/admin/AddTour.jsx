import React from 'react'
import AdminNavbar from '@/components/admin/AdminNavbar'
import CreateTour from '@/components/admin/addTours/CreateTour'

const AddTour = () => {
  return (
    <div className='bg-gray-50 px-4 py-6'><AdminNavbar/>
    
    <div className='min-h-screen px-4 py-6 bg-gray-50'>
<div className='max-w-4xl mx-auto px-4 py-6'>


    <h1 className='text-2xl font-semibold mb-6'>Add New Tours</h1>

    <CreateTour/>
</div>

    </div>
    </div>

  )
}

export default AddTour