import React from 'react'

const Messages = ({ messages, currentUser }) => {

    let renderMessage = (msg) => {
        const {author, message, timestamp} = msg;
        const color = currentUser.color 
        const messageFromMe = currentUser.username === author;
        const className = messageFromMe ? "Messages-message currentUser" : "Messages-message";
        return (
            <li className={className}>
                <span
                    className="avatar"
                    style={{ backgroundColor: color }}
                />
                <div className="Message-content">
                    <div className="username">
                        {author}
                    </div>
                    <div className="text">{message}</div>
                    <div> {Date(timestamp)}</div>
                </div>
                
            </li>
        );
    };

    return (
        <ul className="messages-list">
            {messages.map(msg => renderMessage(msg))}
        </ul>
    )
}


export default Messages