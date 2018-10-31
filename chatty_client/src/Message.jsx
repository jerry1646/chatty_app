import React from "react";

export default function Message({message}) {
  const usernameStyle = {
    color: message.color
  }
  return (message.type == "incomingNotification")?
    ( <div className="message system">
        {message.content}
      </div> ) :
    ( <div className="message">
        <span className="message-username" style={usernameStyle}>{message.username}</span>
        <span className="message-content" ><div dangerouslySetInnerHTML={{__html: message.content}}/></span>
      </div>)
}