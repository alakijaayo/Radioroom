import React from 'react';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.user = props.user;
  }

  render() {
    return (
      <div className="user">
        <img
          src={this.user.imageUrl}
          alt="user profile"
          style={{ height: 150 }}
        />
        <span>{this.user.name}</span>
        <span> ({this.user.id}) is in da house!</span>
      </div>
    );
  }
}
