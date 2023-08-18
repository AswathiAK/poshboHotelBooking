import React from 'react'
import DataTable from '../components/DataTable';
import { userColumns } from '../components/dataTableLists';

const UsersListPage = () => {
  return (
    <div className='h-full'>
      <DataTable columns={ userColumns } />      
    </div>
  )
}

export default UsersListPage
