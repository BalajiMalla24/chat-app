import React, { useEffect  , useRef } from "react";
import { userChatStore } from "../store/userChatStore";
import MessageInput from "./MessageInput";
import Chatheader from "./Chatheader";
import MessageSkeleton from "./MessageSkeleton";
import { userAuthStore } from "../store/userAuthStore";
import { formatMessageTime } from "../lib/utils";
const ChatContainer = () => {
  const { messages, getMessages, selectedUser, isMessagesLoading ,subscribeToMessages , unsubscribefromMessages  } = userChatStore();
  const { authUser } = userAuthStore();
  const messageRef = useRef(null);
  useEffect(() => {
    getMessages(selectedUser._id);
     subscribeToMessages()
     return ()=>unsubscribefromMessages()

  }, [selectedUser._id, getMessages , subscribeToMessages , unsubscribefromMessages]);

  useEffect(()=>{
    if(messageRef.current && messages){
      messageRef.current.scrollIntoView({behavior :"smooth"})
    }

  } , [messages])
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <Chatheader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
     <>
    <div className="flex-1 flex flex-col overflow-auto">
  <Chatheader />
  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {messages.map((message) => (
      <div
        key={message._id}
        ref={messageRef}
        className={`chat ${
          message.senderid === authUser._id ? "chat-end" : "chat-start"
        }`}
      >
        {/* Profile Image */}
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src={
                message.senderid  === authUser._id
                  ? authUser.coverphoto || "./avatar.png"
                  : selectedUser.coverphoto || "./avatar.png"
              }
              alt="profile-pic"
            />
          </div>
        </div>

        {/* Chat Header with Time */}
        <div className="chat-header">
          {message.senderid === authUser._id ? "You" : selectedUser.name}
          <time className="text-xs opacity-50 ml-2">
            {formatMessageTime(message.createdAt)}
          </time>
        </div>

        {/* Chat Bubble */}
        <div className="chat-bubble">
          {message.image && (
            <img
              src={message.image}
              alt="attachment"
              className="sm:max-w-[200px] rounded-md mb-2"
            />
          )}
          {message.text && <p>{message.text}</p>}
        </div>
      </div>
    ))}
  </div>

  <MessageInput />
</div>
</>
  );
};

export default ChatContainer;
