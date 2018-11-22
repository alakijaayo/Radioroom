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
        <div className="mx-auto" style={{ maxWidth: 800 }}>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <textarea
                className="form-control"
                rows="3"
                cols="25"
                value={this.state.message}
                onChange={this.handleChange}
              />
              <div className="input-group-append">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-secondary"
                />
              </div>
            </div>
          </form>
        </div>
        <div
          className="messagelist list-group mx-auto"
          style={{ maxWidth: 800 }}
        >
          {this.props.messages ? (
            <ul>
              <PoseGroup>
                {this.props.messages.map(message => (
                  <Item key={message.id}>
                    <div
                      id={message.id}
                      className="list-group-item mx-auto border-1 pl-40 py-0 d-flex align-items-center"
                      style={{ borderRadius: 80, minHeight: 80 }}
                    >
                      <div className="align-self-left  py-auto px-50 flex-grow-1">
                        {message.text}
                      </div>
                      <div>
                        <img
                          src={message.user_url}
                          alt="user profile"
                          className="rounded-circle align-self-right "
                          style={{ height: 80 }}
                        />
                      </div>
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
