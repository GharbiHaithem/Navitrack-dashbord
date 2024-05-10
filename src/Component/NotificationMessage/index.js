import React ,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allmessages, messages as msgs } from '../../features/conversationSlice';
import './style.css'
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
const NotificationMessage = ({conversationId , msg}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[lastMsg,setLastMsg] = useState({})
  const{messageC} = useSelector(state=>state?.conversation)
  const {user} = useSelector(state=>state?.auth)
 const[conversationMessage , setConversationMessage] = useState([])
  const sortedMessages =conversationMessage.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  let lastMessage = null;
for (const message of sortedMessages) {
  if (message.sender !== user?._id) {
    lastMessage = message;
    break;
  }
}


useEffect(()=>{
  if(lastMessage&&(Object.keys(lastMessage).length > 0 ) && (lastMessage !== null || undefined))  {
    setLastMsg(lastMessage)
  }
},[lastMessage])

useEffect(()=>{
 const filterMsg =  msg && msg?.filter((m=>m.conversationId._id === conversationId ))
 console.log(filterMsg)
 setConversationMessage(filterMsg)
},[conversationId, msg])

console.log(lastMsg)
  return (
    <div className='d-flex  align-items-center  gap-50'  onClick={()=>navigate(`/admin/messenger/${conversationId}`)} >
     <div style={{width:"60px" , height:"60px", borderRadius:"50%",objectFit:"cover"}}>
      <img   src="https://img.freepik.com/psd-gratuit/personne-celebrant-son-orientation-sexuelle_23-2150115662.jpg?w=740&t=st=1702767991~exp=1702768591~hmac=46a7309ab2b7216bb0723395c764d8bb9f2155dab629a5cdc9b95ca540d75d93" style={{width:"100%", height:"100%",borderRadius:"50%",objectFit:"cover",border:"5px solid blue"}} alt="img" />
    
     </div>
   
     <span style={{fontWeight:'600' , fontSize:"16px",width:"max-content", border:"1px solid  red"}}>{lastMsg?.text}</span>
  
    </div>
  )
}

export default NotificationMessage