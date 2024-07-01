import React, { useEffect, useRef } from 'react'

const ShowModal = ({productId , open , setOpen}) => {
      const refModal= useRef()
      const handleClickOutside = (event) => {
            if (refModal?.current && !refModal?.current.contains(event.target)) {
                  setOpen(!open);
            }
          };
        
          useEffect(() => {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
              document.removeEventListener('mousedown', handleClickOutside);
            };
          }, []);
  return (
    <div ref={refModal} className='fixed top-0 left-0 w-screen bg-[#0008] flex justify-center items-center h-full'>
       <div className='my-5 bg-white w-[60%] mx-auto h-[max-content] rounded-lg '>
           
       <div className='relative'>
       <img  src={productId?.images_article?.length>0 && productId?.images_article[0]?.url } className={`${productId?.images_article?.length===0 ? 'mb-5': ''}  object-cover w-full mx-auto  h-[200px]`} />
      <div className='absolute top-[10px] left-[10px] bg-[#0000009f] w-[max-content]  p-2  text-white text-sm font-semibold' >AZER</div>
       </div>
<p className='text-sm p-3 mt-2'>{productId?.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
       </div>
    </div>
  )
}

export default ShowModal