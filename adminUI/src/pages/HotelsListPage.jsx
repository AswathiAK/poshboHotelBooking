import React from 'react'
import { hotelColumns } from '../components/dataTableLists';
import DataTable from '../components/DataTable';

const HotelsListPage = () => {
  return (
    <div className='h-full'>
      <DataTable columns={ hotelColumns } />
    </div>
  )
}

export default HotelsListPage
