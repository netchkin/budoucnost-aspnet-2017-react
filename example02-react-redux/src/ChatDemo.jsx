import React, { Component } from 'react';
import moment from 'moment';

export default class ChatDemo extends Component {
  constructor() {
    super();
    this.state = {
      me: 'Pavel',
      messages: []
    };
  }

  send(messageText) {
    this.setState((prevState) => ({
      messages: [ ...prevState.messages, { 
        when: new moment().fromNow(),
        from: prevState.me,
        text: messageText
       } ]
    }));
  }

  render() {
    return (
      <div>
        <Messages messages={this.state.messages} />
        <MessageInput sendHandler={(message) => this.send(message)} />
      </div>
    );
  }
}

const Message = ({ when, from, text }) => (
  <div>
    {from} [{when}]: {text}
  </div>
);

const Messages = ({ messages }) => (
  <div>
    {messages.map(m => <Message from={m.from} when={m.when} text={m.text} />) }
  </div>
);

// class MessageInput extends Component {
//   render() {
//     return (
//       <div>
//         <input type="text" ref={(input) => { this.inputField = input; }} defaultValue=""  />
//         <button onClick={() => this.props.sendHandler(this.inputField.value)}>send</button>
//       </div>
//     );
//   }
// }


class MessageInput extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    }
  }

  sendAndClear() {
    this.props.sendHandler(this.state.text);
    this.setState({text: ''});
  }

  logKey(text) {
    this.setState(prevState => ({
      text: text
    }));
  }

  render() {
    return (
      <div>
        <input type="text" onChange={(e) => this.logKey(e.target.value)} value={this.state.text} />
        <button onClick={() => this.sendAndClear()}>send</button>
      </div>
    );
  }
}