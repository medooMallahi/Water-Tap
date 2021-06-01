let connection = null;
const Driver = require("./models/Driver");
const User = require("./models/User");

class Realtime {
  constructor() {
    this._socket = null;
    this._io = null;
  }

  static init(server) {
    if (!connection) {
      connection = new Realtime();
      connection.connect(server);
    }
  } // end of init

  static getConnection() {
    if (!connection) {
      throw new Error("no active connection");
    }
    return connection;
  } // end of getConnection

  connect(server) {
    const options = {
      allowEIO3: true,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    };
    this._io = require("socket.io")(server, options);

    this._io.on("connection", (socket) => {
      this._socket = socket;
      console.log(this._socket.id, " just connected");

      this._socket.on("join", (data) => {
        this._socket.join(data.id);
      }); // end of init

      this._socket.on("disconnect", () => {
        console.log(this._socket.id, " just disconnected");
      }); // end of disconnect
    }); // end of io
  } // end of connect method

  sendEvent(event, data) {
    this._socket.emit(event, data);
  } // end of sendEvent method

  sendEventTo(event, data, to) {
    this._io.sockets.in(to).emit(event, data);
  }
  registerEvent(event, handler) {
    this._socket.on(event, handler);
  } // end of registerEvent method
} // end of Realtime Class

module.exports = {
  connect: Realtime.init,
  connection: Realtime.getConnection,
};
