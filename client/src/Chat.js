import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose'

const Item = posed.li({});

class Chat extends Component{
  constructor(props) {
    super();
    this.state = { message: '', messages: [{}] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="messages">
        <h2>Chat</h2>
          <form onSubmit={this.handleSubmit}>
            <textarea rows="5" cols="50">
            </textarea>
            <input type="submit" value="Submit" />
          </form>
          <div className="messagelist">
            <ul>
              <PoseGroup>
                {this.state.messages.map(message => (
                <Item key={message.id}>
                  <div>
                    <p>{message.text}</p>
                    <img
                      src={message.user_url}
                      alt="user profile"
                     />
                  </div>
                </Item>
              ))}
              </PoseGroup>
            </ul>
          </div>
      </div>
    );
  }
}

export default Chat;
