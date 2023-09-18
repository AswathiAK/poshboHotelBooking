import React from 'react'
import { Avatar } from '@mui/material';
import { format } from 'timeago.js';

const Message = ({ message, own }) => { 
  const commonClasses = 'flex flex-col mt-5';
  const containerClasses = own ? `${commonClasses} items-end` : commonClasses; 
  const messageCommonClass = 'rounded-lg w-[300px] p-2.5 ';
  const messageClass = own ? `${messageCommonClass} bg-gray-100` : `${messageCommonClass} bg-blue-100`;
  const avatarStyles = own ? { width: 40, height: 40, bgcolor: 'gray' } : { width: 40, height: 40, bgcolor: 'lightskyblue' };
  
  return (
    <div className={containerClasses}>
      <div className="flex gap-2.5 ">
        <Avatar sx={avatarStyles}>
          Ab
        </Avatar>
        <p className={messageClass}>
          {message.text}
        </p>
      </div>
      <div className="mt-2.5 text-xs">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message
