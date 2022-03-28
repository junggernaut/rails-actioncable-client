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
      onMessageReceived(msg)
    })
    // Handle custom typing messages
    subscription.on('custom', msg => console.log("11"))

    // Or subscription close events
    subscription.on('close', () => console.log("22"))

    // Or temporary disconnect
    subscription.on('disconnect', () => console.log("33"))

  }

  const onSendMessage = async (msgText) => {
    const msg = {
      author: user.username,
      message: msgText,
      timestamp: new Date().getTime(),
    }
    // channel.send({ sent_by: "Paul", body: msgText })
    // const _ = await channel.speak(msg)
    const _1 = await channel.perform('speak', { msg: msg })
    const _2 = await channel.perform('custom', { msg: msg })
  }

  const onMessageReceived = (msg) => {
    console.log('New Message Received!!', msg);
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