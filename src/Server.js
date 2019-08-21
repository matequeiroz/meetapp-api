import app from "./App";
import http from "http";

class Server {
  constructor() {
    this.server = http.createServer(app);
    this.onListening = this.onListening.bind(this);
    this.start();
  }

  start() {
    this.server.listen(process.env.PORT || "3000");
    this.server.on("error", this.onError);
    this.server.on("listening", this.onListening);
  }

  onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  onListening() {
    var addr = this.server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log(`Application running on: ${bind}`);
  }
}

export default new Server();
