import React, { useState, useEffect } from 'react';
import { randomColor } from './utils/common';
import './App.css';
import cable from './cable'
import consumer from './consumer'
import ChatChannel  from './chat'
import LoginForm from './LoginForm'
import Messages from './Messages'
import Input from './input'
import chatAPI from './api';


const App = () => {
  const [user, setUser] = useState(null)
  const [channel, setChannel] = useState(null)
  const [messages, setMessages] = useState([])
  const handleLoginSubmit = async (username) => {
    // const channel = new ChatChannel({ username: username })
    // await cable.subscribe(channel)
    // setChannel(channel)
    // setUser({username: username, color: randomColor()})
    // // Handle incoming messages
    // channel.on('chat', msg => console.log(msg))

    // // Handle custom typing messages
    // channel.on('typing', msg => console.log(`User ${msg.name} is typing`))

    // // Or subscription close events
    // channel.on('close', () => console.log('Disconnected from chat'))

    // // Or temporary disconnect
    // channel.on('disconnect', () => console.log('No chat connection'))

    const subscription = await cable.subscribeTo('ChatChannel', { username: username })
    setChannel(subscription)
    setUser({username: username, color: randomColor()})

    subscription.on('message', msg => {
      console.log("on", msg)
      onMessageReceived(msg)
    })
    // Or subscription close events
    subscription.on('close', () => console.log('Disconnected from chat'))

    // Or temporary disconnect
    subscription.on('disconnect', () => console.log('No chat connection'))



  }

  const onSendMessage = async (msgText) => {
    const msg = {
      author: user.username,
      message: msgText,
      timestamp: new Date().getTime(),
      buddy: "sehan"
    }
    // channel.send({ sent_by: "Paul", body: msgText })
    // const _ = await channel.speak(msg)
    const _ = await channel.perform('speak', { msg: msg })
  }

  const onMessageReceived = (msg) => {
    setMessages((m) => [...m, msg]);
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