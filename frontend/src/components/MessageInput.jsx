import { Send, X , Image } from 'lucide-react'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { userChatStore } from '../store/userChatStore'
const MessageInput = () => {
    const [text , settext] = useState("")
    const [imagePreview , setimagePreview] = useState(null)
    const fileInputref = useRef(null)
    const {sendMessages} = userChatStore()

    const handleImageChange =(e)=>{
        const file = e.target.files[0]
        if(!file.type.startsWith('image/')){
            toast.error("only image file allowed")
            return ;
        }
        const reader = new FileReader()
        reader.onloadend = ()=>{
            setimagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const removeImage =()=>{
        setimagePreview(null)
        if(fileInputref.current) fileInputref.current.value = "";
    }

    const handlesendmessage = async(e)=>{
        e.preventDefault()
        if(!text.trim() && !imagePreview) return ;
        try {
            await sendMessages({
                text:text.trim(),
                image:imagePreview
 
            })
            settext("")
            setimagePreview(null)
            if(fileInputref.current) fileInputref.current.value = ""
        } catch (error) {
            console.log("Something went wrong" , error)

        }
    }
    return (
        <div className='p-4 w-full'>
          {
            imagePreview && (
                <div className='mb-3 flex items-center gap-2'>
                    <div className='relative'>
                        <img src={imagePreview} alt="preview"  
                        className='w-20 h-20 object-cover rounded-lg border border-zinc-700'/>
                        <button className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center' onClick={removeImage} type='button'>
                            <X className='size-3'/>
                        </button>
                    </div>
                </div>
            )
          }  
          <form onSubmit={handlesendmessage} className='flex items-center gap-2'>
              <div className='flex-1 flex gap-2 '>
                <input type="text"
                onChange={(e)=>settext(e.target.value)}
                value={text}
                placeholder='type a message...'
                className='w-full input input-bordered rounded-lg input-sm sm:input-md'
                />
                 <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputref}
            onChange={handleImageChange}
          />
           <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputref.current?.click()}
          >
            <Image size={20} />
          </button>
              </div>
          <button className='btn btn-sm btn-circle'
            type='submit'
            disabled={!text.trim() && !imagePreview}
          >
            <Send size={22}/>
            </button>            
          </form>      
        </div>
    )
}

export default MessageInput
