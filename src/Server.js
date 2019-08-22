import http from 'http';
import app from './App';

class Server {
  constructor() {
    this.server = http.createServer(app);
    this.port = process.env.PORT;
    this.onListening = this.onListening.bind(this);
    this.onError = this.onError.bind(this);
    this.start = this.start.bind(this);
    this.start();
  }

  start() {
    this.server.listen(this.port || '3000');
    this.server.on('error', this.onError);
    this.server.on('listening', this.onListening);
  }

  onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind =
      typeof port === 'string' ? `Pipe ${this.port}` : `Port ${this.port}`;

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  onListening() {
    const addr = this.server.address();
    const bind =
      typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Application running on: ${bind}`);
  }
}

export default new Server();
