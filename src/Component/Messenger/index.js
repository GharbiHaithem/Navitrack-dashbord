import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import Message from '../Message'
import { useDispatch, useSelector } from 'react-redux'

import pending from '../../assets/loading-gif.gif'

import { useParams } from 'react-router-dom'
import { allmessages, messages as msg } from '../../features/conversationSlice'
const Messenger = ({socket}) => {
  const dispatch = useDispatch();
  const scroll = useRef();

const{id} = useParams()

useEffect(()=>{
    dispatch(msg({conversationId:id}))
}, [id,dispatch])
useEffect(()=>{
   id && socket.current?.on("getMessageConversation" , ()=>{
        dispatch(msg({conversationId:id}))
    })
},[id,dispatch,socket])
  const{messageC,isLoading} = useSelector(state=>state?.conversation)
  const [xmsg, setXmsg] = useState([]);
 useEffect(()=>{
  setXmsg(messageC)
 },[messageC])
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[xmsg])
  const{user} = useSelector(state=>state?.auth)
  useEffect(() => {
    const handleIncomingMessage = (msg) => {
      const isDuplicate = xmsg?.some((existingMsg) => existingMsg?.text === msg.messagecreated?.text);
      if (!isDuplicate) {
        setXmsg((prevXmsg) => [...prevXmsg, msg.messagecreated]);
      }
    };
  
    socket.current?.on('getMessage', handleIncomingMessage);
  
    // Nettoyez le gestionnaire d'événements précédent avant de monter le nouveau
    return () => {
      socket.current?.off('getMessage', handleIncomingMessage);
    };
  }, [socket, xmsg]);
  return (
    <>
      <div className='messenger-wrapper my-5 mt-5' >
       
          {
         (xmsg && isLoading ? <img src={pending} className='mx-auto d-block' alt='pending'  />  : xmsg?.map((m,index)=>(
            <div key={index} ref={scroll}>
             <Message data={m} own={m?.sender?._id !== user?._id} /> 
            </div>

          )))}
                      
      </div>

      <div className='submit-message'>
        <form className='d-flex align-items-center gap-10'>
          <textarea
            placeholder='Aa .... '
            className=''
           
          />
          <button
            className={`btn btn-submit bg-primary text-white`}
            type='submit'
         
          
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Messenger;