import React from "react";

export default function ChatBar({currentUser, messageInput, tx}) {
  return (
    <footer className="chatbar">
      <input onChange = {(e) => tx.updateUsernameInput(e.target.value)}
        onKeyPress= {(e) => {
          if (e.key == "Enter"){
            e.target.blur();
          }
        }}
        onBlur= {(e) =>{
          if(currentUser.name != e.target.value){
            tx.setUsername();
          }
        }}
        className="chatbar-username"
        defaultValue={currentUser.name} />


      <input onChange = {(e) => tx.updateMessageInput(e.target.value)}
        onKeyPress = {(e) => {
          if (e.key == "Enter"){
            tx.sendNewMessage();
            tx.updateMessageInput("");
          }
        }}
        value = {messageInput}
        className="chatbar-message"
        placeholder="Type a message and hit ENTER" />
    </footer>
  )
}
