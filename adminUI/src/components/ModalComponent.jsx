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
        <div className="absolute rounded-md w-fit flex justify-center m-auto left-0 right-0 top-0 bottom-0">
          <img src={image} alt="document" className='object-cover'/> 
        </div>
      </Modal>
    </div>
  )
}

export default ModalComponent
