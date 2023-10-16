// import React, { useEffect, useState } from 'react'
// import { DataGrid } from '@mui/x-data-grid';
// import DescriptionIcon from '@mui/icons-material/Description';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { reportColumns } from '../components/dataTableLists';
// import useFetch from '../hooks/useFetch';
// import Loader from "../components/Loader";
// import * as XLSX from 'xlsx';
// import { format } from "date-fns";
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const SalesReportPage = () => {
//   const { data, loading, error } = useFetch('/admin/report');
//   const [list, setList] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   useEffect(() => {
//     if (data) {
//       const newList = data.map((item, index) => ({
//         ...item,
//         'serialNumber': index + 1
//       }));
//       setList(newList);
//       const total = data.reduce((total, item) => {
//         return total + item.totalAmount;
//       }, 0);
//       setTotalPrice(total);
//     }
//   }, [data]);
//   const totalEarnings = totalPrice * 5 / 100;

//   const downloadExcelReport = () => {
//     const columnsToExport = list.map((item) => ({
//       SLNo: item.serialNumber,
//       Date: format(new Date(item.createdAt), 'dd/MM/yyyy'),
//       'Booking ID': item._id,
//       'Hotel Name': item.hotel?.name || '',
//       'Total Amount': item.totalAmount,
//     }));
//     columnsToExport.push({
//       SLNo: '',
//       Date: 'Total:',
//       'Booking ID': '',
//       'Hotel Name': '',
//       'Total Amount': totalPrice.toFixed(2),
//     }, {
//       SLNo: '',
//       Date: 'Earnings:',
//       'Booking ID': '',
//       'Hotel Name': '',
//       'Total Amount': totalEarnings.toFixed(2),
//     });
//     const workSheet = XLSX.utils.json_to_sheet(columnsToExport);
//     const workBook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workBook, workSheet, "Sales Report");
//     let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
//     XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
//     XLSX.writeFile(workBook, "sales_report.xlsx");
//   };

//   const downloadPdfReport = () => {
//     const documentDefinition = {
//       content: [
//         { text: 'Sales Report', style: 'header' },
//         {
//           table: {
//             headerRows: 1,
//             widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
//             body: [
//               ['SL.No', 'Date', 'Booking ID', 'Hotel Name', 'Total Amount'],
//               ...list.map((item, index) => [
//                 index + 1,
//                 format(new Date(item.createdAt), 'dd/MM/yyyy'),
//                 item._id,
//                 item.hotel?.name || '',
//                 item.totalAmount.toFixed(2),
//               ]),
//               ['', 'Total:', '', '', totalPrice.toFixed(2)],
//               ['', 'Earnings:', '', '', totalEarnings.toFixed(2)],
//             ],
//           },
//         },
//       ],
//       styles: {
//         header: {
//           fontSize: 18,
//           bold: true,
//           alignment: 'center',
//           margin: [0, 0, 0, 10],
//         },
//       },
//     };
//     pdfMake.createPdf(documentDefinition).download('sales_report.pdf');
//   };
  

//   return (
//     <div className='h-full w-full'>
//       {
//         loading ? (
//           <div className="flex items-center justify-center h-full">
//             <Loader />
//           </div>
//         ) : error ? (
//             <div className="flex items-center justify-center h-full">
//               {error}
//             </div>
//           ) : list ? (
//               <div className='flex gap-10'>
//                 <div style={{ height: '100%', }} >
//                   <div className="mb-10">
//                     dates
//                   </div>
//                   <DataGrid
//                     rows={list}
//                     columns={reportColumns}
//                     initialState={{
//                       pagination: {
//                         paginationModel: { page: 1, pageSize: 20 },
//                       },
//                     }}
//                     pageSizeOptions={[10, 20, 50]}
//                     checkboxSelection
//                     getRowId={row => row._id}
//                   />
//                 </div>
//                 <div className='self-center '>
//                   <p className='mb-5 text-lg font-semibold'>Total:
//                     <span className='text-blue-600 text-xl'> Rs. {totalPrice.toFixed(2)}/-</span>
//                   </p>
//                   <p className='mb-5 text-lg font-semibold'>Earnings:
//                     <span className='text-blue-600 text-xl'> Rs. {totalEarnings.toFixed(2)}/-</span>
//                   </p>
//                   <div className=" font-medium">
//                     Download Report :
//                     <button onClick={downloadExcelReport}
//                       className="ml-3 px-2 py-2 hover:bg-slate-200 hover:rounded-lg text-green-500"
//                     >
//                       <DescriptionIcon />
//                     </button>
//                     <button onClick={downloadPdfReport}
//                       className="ml-3 px-2 py-2 hover:bg-slate-200 hover:rounded-lg text-red-500"
//                     >
//                       <PictureAsPdfIcon />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//                 <div className="flex items-center justify-center h-full">
//                   No  data available.
//                 </div>
//         )
//       }
//     </div>
//   )
// }

// export default SalesReportPage

import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { toast, Flip } from "react-toastify";
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { reportColumns } from '../components/dataTableLists';
import useFetch from '../hooks/useFetch';
import Loader from "../components/Loader";
import * as XLSX from 'xlsx';
import { format } from "date-fns";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import axios from '../services/axios';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const SalesReportPage = () => {
  const { data, loading, error } = useFetch('/admin/report');
  const [list, setList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (data) {
      const newList = data.map((item, index) => ({
        ...item,
        'serialNumber': index + 1
      }));
      setList(newList);
      const total = data.reduce((total, item) => {
        return total + item.totalAmount;
      }, 0);
      setTotalPrice(total);
      setTotalEarnings(total * 5 / 100);
    }
  }, [data]);

  const downloadExcelReport = () => {
    const columnsToExport = list.map((item) => ({
      SLNo: item.serialNumber,
      Date: format(new Date(item.createdAt), 'dd/MM/yyyy'),
      'Booking ID': item._id,
      'Hotel Name': item.hotel?.name || '',
      'Total Amount': item.totalAmount,
    }));
    columnsToExport.push({
      SLNo: '',
      Date: 'Total:',
      'Booking ID': '',
      'Hotel Name': '',
      'Total Amount': totalPrice.toFixed(2),
    }, {
      SLNo: '',
      Date: 'Earnings:',
      'Booking ID': '',
      'Hotel Name': '',
      'Total Amount': totalEarnings.toFixed(2),
    });
    const workSheet = XLSX.utils.json_to_sheet(columnsToExport);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sales Report");
    let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "sales_report.xlsx");
  };

  const downloadPdfReport = () => {
    const documentDefinition = {
      content: [
        { text: 'Sales Report', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['SL.No', 'Date', 'Booking ID', 'Hotel Name', 'Total Amount'],
              ...list.map((item, index) => [
                index + 1,
                format(new Date(item.createdAt), 'dd/MM/yyyy'),
                item._id,
                item.hotel?.name || '',
                item.totalAmount.toFixed(2),
              ]),
              ['', 'Total:', '', '', totalPrice.toFixed(2)],
              ['', 'Earnings:', '', '', totalEarnings.toFixed(2)],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
      },
    };
    pdfMake.createPdf(documentDefinition).download('sales_report.pdf');
  };
  
  const filterData = async () => {
    if (startDate && endDate && startDate <= endDate) {
      try {
        const { data } = await axios.get(`/admin/report?startDate=${startDate}&endDate=${endDate}`);
        const newList = data.map((item, index) => ({
          ...item,
          'serialNumber': index + 1
        }));
        setList(newList);
        const total = data.reduce((total, item) => {
          return total + item.totalAmount;
        }, 0);
        setTotalPrice(total);
        setTotalEarnings(total * 5 / 100);
      } catch (error) {
        const err = error.response?.data?.message ?? error.response?.statusText ?? error.message;
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          transition: Flip,
          autoClose: 2000
        });
      }
    } else {
      toast.error('Invalid date range', {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    }
  };

  return (
    <div className='h-full w-full'>
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
              <div className='flex gap-10'>
                <div style={{ height: '100%', }} >
                  <div className="mb-10 ">
                    <span className="mr-5 font-semibold">Start Date :</span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)} 
                      className='border rounded-md bg-transparent border-gray-400 p-3'
                    />
                    <span className="mx-5 font-semibold">End Date :</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)} 
                      className='border rounded-md bg-transparent border-gray-400 p-3'
                    />
                    <button className='mx-5 rounded-lg border bg-blue-500 text-white py-3 px-6 hover:bg-blue-950'
                      onClick={filterData}>
                      Filter
                    </button>
                  </div>
                  <DataGrid 
                    rows={list}
                    columns={reportColumns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 1, pageSize: 20 },
                      },
                    }}
                    pageSizeOptions={[10, 20, 50]}
                    checkboxSelection
                    getRowId={row => row._id}
                  />
                </div> 
                <div className='self-center '>
                  <p className='mb-5 text-lg font-semibold'>Total:
                    <span className='text-blue-600 text-xl'> Rs. {totalPrice.toFixed(2)}/-</span>
                  </p>
                  <p className='mb-5 text-lg font-semibold'>Earnings:
                    <span className='text-blue-600 text-xl'> Rs. {totalEarnings.toFixed(2)}/-</span>
                  </p>
                  <div className=" font-medium">
                    Download Report : 
                    <button onClick={downloadExcelReport}
                      className="ml-3 px-2 py-2 hover:bg-slate-200 hover:rounded-lg text-green-500"
                    >
                      <DescriptionIcon />
                    </button>
                    <button onClick={downloadPdfReport}
                      className="ml-3 px-2 py-2 hover:bg-slate-200 hover:rounded-lg text-red-500"
                    >
                      <PictureAsPdfIcon />
                    </button>
                  </div>
                </div>
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

export default SalesReportPage
