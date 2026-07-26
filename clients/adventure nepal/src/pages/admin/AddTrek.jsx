import React from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import CreateTourStepWise from '@/components/admin/addTours/CreateTourStepWise'

const AddTrek = () => {
  return (
    <AdminLayout>
      <div className='p-8'>
        <CreateTourStepWise defaultCategory="trek" isTrek={true} />
      </div>
    </AdminLayout>
  )
}

export default AddTrek
