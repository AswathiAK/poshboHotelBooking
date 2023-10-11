import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import useFetch from '../hooks/useFetch';
import { Link, useLocation } from 'react-router-dom';
import PreviewIcon from '@mui/icons-material/Preview';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import VerifiedIcon from '@mui/icons-material/Verified';
import { green, red } from '@mui/material/colors';
import axios from "../services/axios";
import Loader from './Loader';

const DataTable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/admin/${path}`);

  useEffect(() => {
    if (data) {
      const newList = data.map((item, index) => ({
        ...item,
        serialNumber: index + 1
      }));
      setList(newList);
    }
  }, [data]);


  const handleBlock = async (id) => {
    try {
      const { data } = await axios.post(`/admin/${path}/block/${id}`);
      const updatedList = list.map(item => {
        return item._id === id ? { ...item, isBlock: data.newData.isBlock } : item;
      });
      setList(updatedList);
    } catch (error) {
      const errorMessage =  error.response?.data?.message??error.response?.statusText??error.message ;
      console.log(errorMessage);
    }
  };

  const handleVerification = async (id) => {
    try {
      const { data } = await axios.post(`/admin/${path}/verify/${id}`);
      const updatedList = list.map(item => {
        return item._id === id ? { ...item, isVerified: data.newData.isVerified } : item;
      });
      setList(updatedList);
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      console.log(errorMessage);
    }
  };

  const actionColumn = [
    {
      field: 'action', headerName: 'Action', width: 150, renderCell: (params) => {
        return (
          <div className="flex items-center gap-3">
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="cursor-pointer hover:bg-blue-800 rounded-md p-1 text-blue-800 hover:text-white">
                <PreviewIcon />
              </div>
            </Link>
            <div className="cursor-pointer rounded-md hover:bg-gray-300 p-1 "
              onClick={(e) => {
                e.stopPropagation();
                handleBlock(params.row._id);
              }}
            >
              {params.row.isBlock ?
                <LockOpenTwoToneIcon sx={{ color: green[700] }} />
                :
                <LockIcon sx={{ color: red[500] }} />
              }
            </div>
          </div>
        );
      }
    },
  ];
  if (path === 'hotels') {
    actionColumn.push(
      {
        field: 'verification', headerName: 'Verify Property', width: 120, renderCell: (params) => {
          return (
            <div>
              {!params.row.isVerified ?
                <button
                  className='hover:bg-blue-500 text-blue-700 font-medium hover:text-white py-2 px-4 border
                  border-blue-500 rounded'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVerification(params.row._id);
                  }}
                >
                  Verify
                </button> : <VerifiedIcon sx={{ color: green[500] }} />}
            </div>
          );
        }
      }
    );
  }


  return (
    <div>
      {
        loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            {error}
          </div>
        ) : list ? (
          <div style={{ height: '100%', width: '100%' }} >
            <DataGrid
              rows={list}
              columns={columns.concat(actionColumn)}
              initialState={{
                pagination: {
                  paginationModel: { page: 1, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20, 50]}
              checkboxSelection
              getRowId={row=>row._id}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            No  data available.
          </div>
        )
      }
    </div>
  )
}

export default DataTable



