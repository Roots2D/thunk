import React from 'react';

const MessageIndexItem = ({ user, message }) => {

  // ADD PROFILE PICTURE IN IMAGE SPOT
  // UPDATE USER MODEL TO ACCEPT A PROFILE PIC
  return (
    <li className="message_container">
        <div className="message_avatar">Image</div>
        <div className="message_data_container">
          <div className="message_header">
            <p className="message_username">{user.username}</p>
            <p className="message_time">
              {message.created_at}
            </p>
          </div>
          <div className="message_content">
            <p>{message.content}</p>
          </div>
        </div>
    </li>
  );
};

export default MessageIndexItem;