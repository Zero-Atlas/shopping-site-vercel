let io;

module.exports = {
  init: (server) => {
    io = require("socket.io")(server, {
      cors: {
        origin: "*",
        methods: "*",
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
