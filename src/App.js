import React, { useState, useEffect } from 'react';
import { randomColor } from './utils/common';
import './App.css';
import consumer from './consumer'
import LoginForm from './LoginForm'
import Messages from './Messages'
import Input from './input'

const App = () => {
  const [user, setUser] = useState(null)
  const [channel, setChannel] = useState(null)
  const [messages, setMessages] = useState([])
  const handleLoginSubmit = (username) => {
    consumer.subscriptions.create({ channel: "ChatChannel", user: username}, {
      connected() {
        console.log("connected!")
        setUser({username: username, color: randomColor()})
      },
      disconnected() {
        console.log("disconnected!")
      },
      received(data){
        console.log(data)
      }
    })

  }
  const onSendMessage = (msgText) => {
    const msg = {
      author: user.username,
      message: msgText
    }
    console.log(msgText)
  }


  return (
    <div className="App">
      {!!user ?
        (
          <>
          
            <Messages
              messages={messages}
              currentUser={user}
            />
            <Input onSendMessage={onSendMessage} />
          </>
        ) :
        <LoginForm onSubmit={handleLoginSubmit} />
      }
    </div>
  );
}


export default App;