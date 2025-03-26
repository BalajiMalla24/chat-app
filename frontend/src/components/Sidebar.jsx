import React, { useEffect } from 'react'
import { userChatStore } from '../store/userChatStore'
import { userAuthStore } from '../store/userAuthStore'
import { Users } from 'lucide-react'
const Sidebar = () => {
    const {onlineUsers} = userAuthStore()
    const {users , getUsers , setSelectedUser , selectedUser , isUsersLoading} = userChatStore()

    useEffect(()=>{
        getUsers()
        console.log(users)
    } , [getUsers])
    if(isUsersLoading) return <div>Loading ...</div>
    return (
        <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            <div className='border-b border-base-300 w-full p-5'>
                <div className='flex items-center gap-2'>
                  <Users className='size-6'/>
                  <span className='font-medium hidden lg:block'>Contacts</span>
                </div>


            </div>
              <div className='overflow-y-auto w-full py-3'>
                 {
                    users.map((user)=>(
                        <button className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
                            ${selectedUser?._id === user?._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
                            onClick={() => setSelectedUser(user)}
                        >
                            <div className="mx-auto lg:mx-0 flex gap-5 items-center">
                                {/* Profile Image Wrapper */}
                                <div className="relative">
                                    <img src={user.coverphoto || "./avatar.png"} 
                                        alt={user.name}
                                        className="size-12 object-cover rounded-full"
                                    />
                                    {onlineUsers?.includes(user._id) && (
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full
                                            ring-2 ring-white" />
                                    )}
                                </div>
                        
                                {/* User Info */}
                                <div className="hidden lg:block text-left min-w-0">
                                    <div className="font-medium truncate">{user.fullName}</div>
                                    <div className="text-sm text-zinc-400">
                                        {onlineUsers.includes(user._id) ? "online" : "offline"}
                                    </div>
                                </div>
                            </div>    
                        </button>
                        
                    ))
                 }  
              </div>            
        </aside>
    )
}

export default Sidebar
