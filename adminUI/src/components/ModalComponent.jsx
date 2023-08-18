import React, { useState } from 'react'
import { Box, Modal, Typography } from '@mui/material';
import PanoramaIcon from '@mui/icons-material/Panorama';

const ModalComponent = ({image}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className=''>
      <button className='py-1 px-3 border-2 bg-white rounded hover:bg-transparent'
        onClick={() => setOpen(true)}
      >
        <PanoramaIcon/>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box position='absolute' top='10%' left='20%' >
          {/* <Typography>It is a Modal</Typography> */}
          <img src={image} alt="document" className='w-2/3 rounded-md object-cover'/>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalComponent
