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
    const create = consumer.subscriptions.create({ channel: "ChatChannel", user: username}, {
      connected() {
        console.log("connected!")
        setUser({username: username, color: randomColor()})
      },
      disconnected() {
        console.log("disconnected!")
      },
      received(data){
        console.log("recieve :", data)
      }
    })
    setChannel(create)
  }

  const onSendMessage = (msgText) => {
    // const msg = {
    //   author: user.username,
    //   message: msgText
    // }
    channel.send({ sent_by: "Paul", body: msgText })
  }
  console.log("hello")

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