import { connect, Socket } from 'socket.io-client';

const socket = connect('http://localhost:5000/ws');

export function setupSocket(handler: Function) {
  socket.on('message', handler);
}

export function sendData(message: any) {
  //socket.send(message)
}