import React from "react";
import Message from "./Message.jsx";


export default function MessageList(props) {
  const messageList = props.messages.map((message)=>{
    return <Message message = {message}/>
  });
  return (
    <main className="messages">
      {messageList}
    </main>
  )
}