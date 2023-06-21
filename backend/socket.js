let io;

module.exports = {
  init: (server) => {
    io = require("socket.io")(server, {
      cors: {
        origin: ["http://localhost:3000","http://localhost:3001"],
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["my-custom-header"],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io is not initialize");
    }
    return io;
  },
};
