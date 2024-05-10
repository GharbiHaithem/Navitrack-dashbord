import React, { useEffect, useState } from 'react'

const TextAnnimation = ({text,size}) => {
    const[currentLetterIndex,setCurrentLetterIndex] = useState(0)
    useEffect(()=>{
   if(currentLetterIndex === text?.length){
    setCurrentLetterIndex(0)
   }
    },[text?.length,currentLetterIndex])
    useEffect(()=>{
        let interval
       const  annimateText = () =>{
        interval = setInterval(()=>{
            setCurrentLetterIndex((prev=>prev + 1 % text?.length ))
        },1000)
       }
       annimateText()
    return ()=>clearInterval(interval)
    },[currentLetterIndex,text])
    const lettres = text.split('')
  return (
    <div style={{size}}>
        {lettres?.map((lettre,index)=>(
            <span key={index}
            style={{fontWeight: index === currentLetterIndex ? 900 : '',}}
            className='mb-0'
            >
{lettre}
            </span>
        ))}
    </div>
  )
}

export default TextAnnimation