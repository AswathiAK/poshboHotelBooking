import React, { useState } from 'react'

// const RoomFormModal = ({ propertyId }) => {
//   const [open, setOpen] = useState(false);
 
//   return (
//     <div>
//       <button
//         className='hover:bg-blue-500 text-blue-700 font-medium hover:text-white py-2 px-4 border
//       border-blue-500 rounded ml-4'
//         onClick={()=>setOpen(true)}
//       >
//         Add Rooms
//       </button>
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <div className="absolute rounded-md w-fit flex justify-center items-center m-auto left-0 right-0 top-0 bottom-0">
//           {propertyId}
//         </div>
//       </Modal>
//     </div>
//   )
// }

// export default RoomFormModal

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const RoomFormModal = ({children,title}) => {   
  const [open, setOpen] = useState(false);

  return (
    <div className=''>
      <button
        className='hover:bg-blue-500 text-blue-700 font-medium hover:text-white py-2 px-4 border
      border-blue-500 rounded ml-4'
        onClick={()=>setOpen(true)}
      >
        Add Rooms
      </button>  
      <BootstrapDialog
        onClose={()=>setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open} 
      >
        <DialogTitle sx={{ m: 0, p: 2 , textAlign:'center', fontWeight:'bold'}} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=>setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {children}
        </DialogContent>        
      </BootstrapDialog>
    </div>
  );
}
export default RoomFormModal;