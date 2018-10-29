import React from "react";

export default function Message(props) {
  return (props.message.type == "incomingNotification")?
    ( <div className="message system">
        {props.message.content}
      </div> ) :
    ( <div className="message">
        <span className="message-username">{props.message.username}</span>
        <span className="message-content">{props.message.content}</span>
      </div>)
}