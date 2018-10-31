import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props){
    super(props);


    this.state = {
      // color: "",
      numUsers: null,
      currentUser: {name: "anonymous"},
      messageInput: "",
      usernameInput: "anonymous",
      messages: []
    }

    this.tx = {
      updateMessageInput:(newMsg) => {
        this.setState({
          messageInput: newMsg
        });
      },
      updateMessageList: (data) => {
        const oldMessageList = this.state.messages;
        const newMessageList = [...oldMessageList, data];
        this.setState({messages : newMessageList})
      },
      updateUsernameInput: (username) => {
        this.setState({
          usernameInput: username
        })
      },
      setUsername: () => {
        const newUser = {name: this.state.usernameInput};
        // console.log(newUser)
        const newMessage = {
          type: "postNotification",
          content: this.state.currentUser.name + " has changed their name to " + newUser.name
        }
        this.setState({
          currentUser: newUser
        })
        this.ws.send(JSON.stringify(newMessage))

      },
      sendNewMessage: ()=> {
        const newMessage = {
          type: "postMessage",
          username: this.state.currentUser.name,
          content: this.state.messageInput,
        }
        this.ws.send(JSON.stringify(newMessage))
      }
    }
  }




  componentDidMount() {
    this.ws = new WebSocket("ws:localhost:3001");
    this.ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if(msg.type == "newConnection"){
        this.setState({
          numUsers: msg.numUsers,
        })
      } else {
        this.tx.updateMessageList(msg)
      }
    }
  }



  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="num-users">Currently Online: {this.state.numUsers} users</div>
      </nav>
      <div>
        <MessageList messages = {this.state.messages} tx = {this.tx}/>
        <ChatBar currentUser = {this.state.currentUser} messageInput = {this.state.messageInput} tx = {this.tx}/>
      </div>
      </div>
    );
  }
}

export default App;
