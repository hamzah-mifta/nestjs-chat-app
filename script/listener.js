/**
 * This file is intended for test and development purposes only.
 * It serves as a simple Socket.IO client for listening to real-time events emitted by the server.
 * Do not include this file in production builds.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { io } = require('socket.io-client');

// Connect to the WebSocket server
const socket = io('http://localhost:3000'); // Replace with your server URL if necessary

// handle connected
socket.on('connect', () => {
  console.log(`Connected to the server with socket ID: ${socket.id}`);
});

// handle reconnect
socket.on('reconnect', (attempt) => {
  console.log(`Reconnected after ${attempt} attempts`);

  // Simulate retrieving the userId after a login
  const userId = getUserIdAfterLogin(); // This could be replaced with dynamic logic

  // Emit the userId to associate it with this socket connection
  socket.emit('set_user_id', userId);
});

// Handle disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});

// Listen for new broadcast messages and print them to the console
socket.on('broadcast_message', (data) => {
  console.log('New broadcast message received:', data);
});

// Listen for new private message and print them to the console
socket.on('private_message', (data) => {
  console.log('New private message received: ', data);
});
