import React, { useState } from 'react'
import {Modal} from '@mui/material';
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
        <img src={image} alt="document" className='absolute w-1/2 top-24 left-1/4 rounded-md object-cover '/>        
      </Modal>
    </div>
  )
}

export default ModalComponent
