import React from "react";

export default function Message({message}) {
  const usernameStyle = {
    color: message.color
  }
  if (message.type == "incomingNotification" || message.type == "disConnection"){
    return ( <div className="message system">
              {message.content}
            </div> )
  } else if (message.type == "incomingMessage"){
    return (<div className="message">
              <span className="message-username" style={usernameStyle}>{message.username}</span>
              <span className="message-content" ><div dangerouslySetInnerHTML={{__html: message.content}}/></span>
            </div>)
  } else{return null}
}
