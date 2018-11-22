import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';

const Item = posed.li({});

class Chat extends Component {
  constructor(props) {
    super();
    this.state = { message: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addChatMessage(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    return (
      <div className="messages">
        <h2>Chat</h2>
        <form onSubmit={this.handleSubmit}>
          <textarea
            rows="3"
            cols="25"
            value={this.state.message}
            onChange={this.handleChange}
            className="w-100"
          />
          <input type="submit" value="Submit" />
        </form>
        <div className="messagelist">
          {this.props.messages ? (
            <ul>
              <PoseGroup>
                {this.props.messages.map(message => (
                  <Item key={message.id}>
                    <div id={message.id}>
                      <p>{message.text}</p>
                      <img src={message.user_url} alt="user profile" />
                    </div>
                  </Item>
                ))}
              </PoseGroup>
            </ul>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default Chat;
