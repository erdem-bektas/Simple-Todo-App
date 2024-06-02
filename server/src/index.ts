import Server from "./Server";

const server = new Server();

server.start().catch(error => {
  console.error('Failed to start the server', error);
});
