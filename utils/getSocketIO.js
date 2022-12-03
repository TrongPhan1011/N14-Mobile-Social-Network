import { io } from 'socket.io-client';

const socket = io('ws://192.168.229.1:8900');
//const socket = io('https://n14-lcn-socket.herokuapp.com/');

export default socket;
