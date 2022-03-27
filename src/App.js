import React, { useState, useEffect } from 'react';
import { randomColor } from './utils/common';
import './App.css';
import cable from './cable'
import consumer from './consumer'
import ChatChannel  from './chat'
import LoginForm from './LoginForm'
import Messages from './Messages'
import Input from './input'


const App = () => {
  const [user, setUser] = useState(null)
  const [channel, setChannel] = useState(null)
  const [messages, setMessages] = useState([])
  const handleLoginSubmit = async (username) => {
    // const create = consumer.subscriptions.create({ channel: "ChatChannel", user: username}, {
    //   connected() {
    //     console.log("connected!")
    //     setUser({username: username, color: randomColor()})
    //   },
    //   disconnected() {
    //     console.log("disconnected!")
    //   },
    //   received(data){
    //     // onMessageReceived(data)
    //     console.log("recieve :", data)

    //   }
    // })
    // console.log("check")
    // setChannel(create)
    const subscription = await cable.subscribeTo('ChatChannel', { user: username })
    setChannel(subscription)
    setUser({username: username, color: randomColor()})
    subscription.on('chat', msg => {
      console.log("receive")
      if (msg.type === 'typing') {
        console.log(`User ${msg.name} is typing`)
      } else {
        console.log(`${msg.name}: ${msg.text}`)
      }
    })
  }

  const onSendMessage = async (msgText) => {
    const msg = {
      author: user.username,
      message: msgText,
      timestamp: new Date().getTime(),
    }
    // const _ = channel.perform('speak', { msg: 'Hello' })
    // channel.send({ sent_by: "Paul", body: msgText })
    const _ = await channel.perform('chat', { msg: msg })
  }

  const onMessageReceived = (msg) => {
    console.log('New Message Received!!', msg);
    setMessages((m) => [...m, msg]);
    console.log(messages)
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