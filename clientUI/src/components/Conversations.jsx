// import React, { useEffect, useState } from 'react'
// import { Avatar } from '@mui/material';
// import { toast, Flip } from "react-toastify";
// import axios from "../services/axios";

// const Conversations = ({ conversation, currentUser }) => {
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     const receiverId = conversation.members.find((member) => member !== currentUser._id);
//     const getUser = async () => {
//       try {
//         const {data} = await axios.get(`/users/find/${receiverId}`);
//         setUser(data);
//       } catch (error) {
//         const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
//         toast.error(errorMessage, {
//           position: toast.POSITION.TOP_CENTER,
//           transition: Flip,
//           autoClose: 2000
//         });
//       }
//     };
//     getUser();
//   }, [currentUser, conversation]);
  
//   return (
//     <div className='rounded-lg bg-gray-100 hover:bg-gray-200 my-3 p-3 flex items-center gap-4 cursor-pointer'>
//       <Avatar sx={{ width: 40, height: 40,  bgcolor: "black" }}>
//         {user?.name[0]}
//       </Avatar>
//       <span className="font-semibold">{user?.name}</span>
//     </div>
//   )
// }

// export default Conversations

import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material';
import { toast, Flip } from "react-toastify";
import axios from "../services/axios";

const Conversations = ({ conversation, currentUser, setActiveConversation, activeConversation }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const receiverId = conversation.members.find((member) => member !== currentUser._id);
    const getUser = async () => {
      try {
        const {data} = await axios.get(`/users/find/${receiverId}`);
        setUser(data); 
      } catch (error) {
        const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          transition: Flip,
          autoClose: 2000
        });
      }
    };
    getUser();
  }, [currentUser, conversation]);

  const containerClasses = `rounded-lg bg-gray-50 hover:bg-gray-100 my-3 p-3 flex items-center gap-4 cursor-pointer ${
    conversation === activeConversation ? 'bg-gray-400' : ''
  }`;
  const handleClick = () => {
    setActiveConversation(conversation); 
  };

  return (
    <div className={containerClasses} onClick={handleClick}>
      <Avatar sx={{ width: 40, height: 40,  bgcolor: "black" }}>
        {user?.name[0]}
      </Avatar>
      <span className="font-semibold">{user?.name}</span>
    </div>
  )
}

export default Conversations
