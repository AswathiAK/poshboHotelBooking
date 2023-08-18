import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const passwordToggle = () => {
  const [visible, setVisible] = useState(false);
  const InputType = visible ? "text" : "password";
  const Icon = visible ?
    <VisibilityOffIcon onClick={() => setVisible(!visible)} />
    :
    <VisibilityIcon onClick={() => setVisible(!visible)} />;
  return [InputType,Icon];
}

export default passwordToggle
