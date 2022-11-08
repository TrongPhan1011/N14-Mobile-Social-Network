import { io } from 'socket.io-client';

//đừng xóa viết thêm 1 hàng bên dưới
const socket = io('ws://192.168.1.5:8900');

export default socket;
