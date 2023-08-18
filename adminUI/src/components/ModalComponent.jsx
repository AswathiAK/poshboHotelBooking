import React, { useState } from 'react'
import { Box, Modal, Typography } from '@mui/material';

const ModalComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box position='absolute' top='50%' left='50%'>
          <Typography>It is a Modal</Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalComponent
