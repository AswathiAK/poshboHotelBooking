import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import SendIcon from '@mui/icons-material/Send';
import useFetch from '../hooks/useFetch';
import { Conversations, Loader, Message } from "../components";
import { AuthContext } from '../context/AuthContext';
import axios from "../services/axios";

import { io } from "socket.io-client";


const GuestMessagePage = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const { data, loading, error } = useFetch(`/hotels/${hotelId}`); 
  const scrollRef = useRef();

  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [socketReady, setSocketReady] = useState(false);
  useEffect(() => {
    socket.current = io("ws://localhost:4000");
    socket.current.on("connect", () => {
      console.log("Socket.io connected!");
      setSocketReady(true);
    });
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []); 

  useEffect(() => { 
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]); 
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log('getusers',users);
    })
  }, [user]);
  
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/chats/${user._id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!socketReady) {
      console.log("Socket.io is not ready yet.");
      return;
    }
    if (!newMessage.trim()) {
      return;
    }
    const message = {
      sender: user._id,
      text: newMessage,
      chatId: currentChat._id
    }; 
    const receiverId = currentChat.members.find(member => member !== user._id);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage
    });
    try {
      const { data } = await axios.post('/messages', message); 
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    }
  }

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({
  //     behaviour:"smooth"
  //   })
  // }, [messages]);
  const [activeConversation, setActiveConversation] = useState(null);
  
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex ">
        {/* Sticky left panel */}
        <div className="w-1/4 border-r">
          <div className="h-20 flex items-center px-5 border-b bg-white sticky top-20 z-10">
            <h3 className="font-bold text-lg ">Messages</h3>
          </div>
          {/* <div className="py-6 px-5 h-screen overflow-y-scroll">
            {conversations.map((chat, index) => (
              <div key={index} onClick={()=>setCurrentChat(chat)}>
                <Conversations conversation={chat} currentUser={user} />
              </div>
            ))}            
          </div> */}
          <div className="py-6 px-5 h-screen overflow-y-scroll">
            {conversations.map((chat, index) => (
              <div key={index} onClick={() => { setCurrentChat(chat); setActiveConversation(chat)}}>
                <Conversations conversation={chat} currentUser={user} 
                  setActiveConversation={setActiveConversation} activeConversation={activeConversation}
                />
              </div>
            ))}            
          </div>
        </div>

        {/* Middle content panel */}
        <div className="w-1/2 border-r sticky top-0 flex flex-col" >
          <div className="h-20 flex items-center justify-left px-5 border-b bg-white sticky top-20 z-10">
            {/* <h3 className="font-bold text-lg">data.owner?.name</h3> */}
          </div>
          <div className="h-screen overflow-y-scroll relative" >
            {
              currentChat ?
                <>
                  <div className="py-6 px-10" >
                    {messages.map((message, index) => (
                      <div key={index}
                        // ref={scrollRef}
                      >
                        <Message message={message} own={message.sender === user._id} />
                      </div>
                    ))}
                  </div>
                </>
                :
                <span className='absolute top-16 text-3xl text-gray-400 px-8 cursor-default'>
                  Open a conversation to start a chat
                </span>
            }            
          </div>
          <div className="sticky flex items-center bottom-0 z-10 p-5 bg-white gap-3">
            <input onChange={(e)=>setNewMessage(e.target.value)}
              type="text"
              placeholder='Type a message'
              className='border rounded-3xl w-[580px] py-2.5 px-3'
              value={newMessage}
            />
            <button onClick={handleSubmitMessage}
              className=' bg-fuchsia-400 rounded-full hover:bg-blue-950 hover:rounded-full p-2'
            >
              <SendIcon sx={{color:'white'}} />
            </button>
          </div>
        </div>

        {/* Sticky right panel */}
        {/* <div className="w-1/4 ">
          <div className="h-20 flex items-center justify-left px-5 border-b bg-white sticky top-20 z-10">
            <h3 className="font-bold text-lg">Details</h3>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader/>
            </div>
          ) : error ? (
              <div className="flex items-center justify-center h-full">
                {error}
              </div>
            ) : data ? (
                <div className="py-6 px-6 h-screen overflow-y-scroll">
                  <div className="">
                    <img src={data.photos?.[0]} alt="propery photo" className="w-full h-full object-cover" />
                  </div>
                  <div className="my-7 border-b">
                    <h2 className="font-bold text-lg">
                      {data.owner?.name} has invited you to book a room in their {data.type}
                    </h2>
                    <button onClick={()=>navigate(`/${data._id}`)}
                      className="mt-5 mb-7 w-full rounded-lg border border-black p-3 font-semibold hover:bg-gray-100"
                    >
                      Book Now
                    </button>
                  </div>
                  <div className="border-b">
                    <h1 className="mt-12 my-6 text-2xl font-semibold">Stay Details</h1>
                    <Link to={`/${data._id}`}> 
                      <p className="text-lg font-medium">{data.name}</p>
                      <p className="text-sm pt-1 mb-7">{data.address}</p>
                    </Link>
                  </div>
                  <div className="my-12">
                    <h3 className="text-lg font-medium">
                      Always communicate through Poshbo
                    </h3>
                    <p className="pt-2 text-base">
                      To protect your payment, never transfer money or communicate outside the Poshbo website
                    </p>
                  </div>
                </div>
              ) : (
                  <div className="flex items-center justify-center h-full">
                  No data available
                </div>
          )}
        </div> */}

      </div>
    </main>
  )
}

export default GuestMessagePage
