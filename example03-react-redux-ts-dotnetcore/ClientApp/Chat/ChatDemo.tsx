import * as React from 'react';
import * as Moment from 'moment';
import { connect } from 'react-redux';
import { ActionCreators, ChatState, Message } from '../store/Chat';
import { ApplicationState }  from '../store';

interface ChatProps {
  me: string;
  messages: Message[];
  sendMessage: Function;
}

class ChatDemo extends React.Component<ChatProps, {}> {
  constructor() {
    super();
  }

  send(messageText: string, me: string) {
    this.props.sendMessage(messageText, me);
  }

  render() {
    if (this.props.me === "") {
      return <ConnectedSimpleLogin />;
    }

    return (
      <div>
        <ConnectedSimpleLogin />
        <Messages messages={this.props.messages} />
        <MessageInput sendHandler={(message: any) => this.send(message, this.props.me)} />
      </div>
    );
  }
}

const Message = ({ when, from, text }: any) => (
  <div>
    {from} [{Moment(when).fromNow()}]: {text}
  </div>
);

const Messages = ({ messages }: {messages: Message[]}) => {
  console.log("rendering messages");
  console.log(messages);

  return (
    <div>
      {messages.map(m => <Message key={m.id} from={m.from} when={m.when} text={m.text} />) }
    </div>
  );
}

interface MessageInputProps {
  sendHandler: Function;
}

interface MessageInputState {
  text: string;
}

class MessageInput extends React.Component<MessageInputProps, MessageInputState> {
  constructor() {
    super();
    this.state = {
      text: ""
    }
  }

  sendAndClear() {
    this.props.sendHandler(this.state.text);
    this.setState({text: ''});
  }

  logKey(text: string) {
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

class SimpleLogin extends React.Component<
{ me: string, login: Function, logout: Function}> {
  constructor() {
    super();
  }
  
  nameInput: any = undefined;
  
  handleLogin() {
    return this.props.login(this.nameInput.value);
  }

  handleLogout() {

    return this.props.logout();
  }

  render() {
    if (this.props.me !== "") {
      return <div>logged in as {this.props.me}<button onClick={() => this.handleLogout()}>logout</button></div>;
    }

    return (
    <div>
      login: <input type="text" ref={(input) => this.nameInput = input} />
      <button onClick={() => this.handleLogin() }>login</button>
    </div>
    );
  }
}

const ConnectedSimpleLogin = connect(
  (state: ApplicationState) => ({ me: state.chat.me }),
  { 
    login: (name: string) => ActionCreators.login(name),
    logout: () => ActionCreators.logout()
  }
)(SimpleLogin);



const mapStateToProps = (state: ApplicationState) => ({
  messages: state.chat.messages,
  me: state.chat.me
});

const mapDispatchToProps = {
  sendMessage: ActionCreators.sendMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDemo);