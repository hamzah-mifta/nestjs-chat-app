# Real-time Chat Application with NestJS and Socket IO

A simple real-time chat application built with NestJS, MongoDB, and Socket.IO for private messaging and chat features.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building scalable server-side applications.
- **MongoDB**: NoSQL database for storing user data and messages.
- **Socket.IO**: A library for real-time WebSocket communication.
- **socket.io-client**: To simulate the client-side listener for testing real-time events.
- **Docker**: Used for containerizing the application

## Prerequisites

- [Node.js](https://nodejs.org/) >= 14.x
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hamzah-mifta/nestjs-chat.git
cd nestjs-chat-app
```

### 2. Instal dependecies

```bash
npm install
```

### 3. Set up environment variables

copy `.env.example` file to `.env` and replace the values with your credentials.

```bash
cp .env.example .env
```

### 4. Run the server

Run the server locally

```bash
npm run start:dev
```

Or if you want to run it inside Docker.

```bash
docker-compose up
```

### 5. Run the listener script

For simulating client-side listener, run this command in two separate terminal to get Socket ID(s) that will be passed in request headers login API (see docs).

```bash
node script/listener.js
```

## Lisence

This project is licensed under the MIT License. See LICENSE for more information.

## Author

- Hamzah Miftakhuddin - [github.com/hamzah-mifta](https://github.com/hamzah-mifta)
