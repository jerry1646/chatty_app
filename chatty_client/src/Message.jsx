import React from "react";

export default function Message({message}) {
  const usernameStyle = {
    color: message.color
  }
  const messageBubbleStyle = {
    "border": "solid 2px "+message.color,
    // "box-shadow": "5px 10px "+message.color
    "boxShadow": "rgba(0, 0, 0, 0.45) 5px 6px 7px -1px",
    "backgroundColor": message.color
  }

  if (message.type == "incomingNotification" || message.type == "disConnection" || message.type == "newConnection"){
    return ( <div className="message system">
              <div className = "notification-bubble">{message.content}</div>
            </div> )
  } else if (message.type == "incomingMessage"){
    return (<div className="message">
              <span className="message-username" style={usernameStyle}>{message.username}</span>
              <span className="message-content" >
                <div className="message-bubble" style = {messageBubbleStyle} dangerouslySetInnerHTML={{__html: message.content}}/>
              </span>
            </div>)
  } else{return null}
}
