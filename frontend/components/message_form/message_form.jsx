import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMessage: this.props.currentMessage,
      currentUser: this.props.currentUser,
    };
  }

  componentWillUnmount() {
    this.chats.unsubscribe();
  }

  componentDidMount() {
    this.createSocket();
  }

  updateCurrentMessage(event) {
    this.setState({
      currentMessage: event.target.value,
    });
  }

  handleChatInputKeyPress(e) {
    if(e.key === 'Enter') {
      this.handleSendEvent(e);
    }
  }

  handleSendEvent(e) {
    e.preventDefault();
    this.chats.create({
      content: this.state.currentMessage,
      user_id: this.state.currentUser.id,
      channel_id: this.props.currentChannel.id
    });
    this.setState({currentMessage: ''});
  }

  createSocket() {
    let cable = ActionCable.createConsumer();
    this.chats = cable.subscriptions.create({
    channel: 'ChatroomChannel'
  }, {
    connected: () => {},
    received: (data) => {
      switch (data.action) {
        case 'receiveMessage':
          if (!this.props.currentUser.channelSubs.includes(
            data.message.channel_id)) {
              this.props.subscribeChannel(data.message.channel_id).then(() =>
              this.props.receiveMessage(data.message));
            } else {
              this.props.receiveMessage(data.message);
            }
        break;
        case 'receiveChannel':
          // if (!data.channel.is_dm) {
          //   this.props.receiveChannel(data.channel);
          // }
        break;
      }
    },
    create: function(chatContent) {
      this.perform('create', {
        content: chatContent.content,
        user_id: chatContent.user_id,
        channel_id: chatContent.channel_id
      });
    }
  });
  }

  render () {
    return (
      <footer className="message_footer_container">
        <button className="message_add_file">A</button>
        <input type="text"
          onKeyPress={ (e) => this.handleChatInputKeyPress(e) }
          value={this.state.currentMessage}
          onChange={ (e) => this.updateCurrentMessage(e)}
          placeholder="Enter your message..."
          className="message_box"/>
      </footer>
    );
  }
}

export default MessageForm;
