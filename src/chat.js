import { Channel } from '@anycable/web'

// channels/chat.js
export default class ChatChannel extends Channel {
  // Unique channel identifier (channel class for Action Cable)
  static identifier = 'ChatChannel'

  async speak(message) {
    return this.perform('speak', { message })
  }

  receive(message) {
    
    console.log(message)
    if (message.type === 'typing') {
      // Emit custom event when message type is 'typing'
      return this.emit('typing', message)
    }

    // Fallback to the default behaviour
    super.receive(message)
  }
}
