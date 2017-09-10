import { Action, Reducer, combineReducers } from 'redux';
import { sendData } from '../socket';

export interface Message {
  id: number;
  from: string;
  text: string;
  when: Date;
}

export interface ChatState {
  messages: Message[];
  me: string;
}

interface ReadMessage {
  type: 'READ_MESSAGE';
  message: Message;
}

interface SendMessage {
  type: 'SEND_MESSAGE';
  message: Message;
}

interface Logout {
  type: 'LOGOUT';
}

interface Login {
  type: 'LOGIN';
  who: string;
}

type LoginAction = Login | Logout;

export type MessageAction = ReadMessage | SendMessage
export type ChatAction = MessageAction | LoginAction;

let nextId = 1;

export const ActionCreators = {
  sendMessage(message: string, me: string) {
    return {
      type: 'SEND_MESSAGE',
      message: {
        from: me,
        text: message,
        when: new Date(),
        id: nextId++
      } as Message
    } as SendMessage;
  },

  login(name: string) {
    return { type: 'LOGIN', who: name } as Login;
  },

  logout() {
    return {
      type: 'LOGOUT'
    } as Logout
  }
};

export const messageReducer: Reducer<Message[]> = (state: Message[] = [] as Message[], incoming: Action) => {
  const action = incoming as MessageAction;
  switch (action.type) {
    case 'READ_MESSAGE': return [...state, action.message];
    case 'SEND_MESSAGE': return [...state, action.message]
  }
  return state;
}

export const loginReducer: Reducer<string> = (state: string = "", incoming: Action) => {
  const action = incoming as LoginAction;
  switch (action.type) {
    case 'LOGIN': return action.who;
    case 'LOGOUT': return "";
    default: return state;
  }
}

export default combineReducers({
  messages: messageReducer,
  me: loginReducer
})