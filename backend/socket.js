let io;

module.exports = {
  init: (server) => {
    io = require("socket.io")(server, {
      cors: {
        origin: ["https://shopping-site-vercel.vercel.app","https://shopping-site-vercel-admin.vercel.app"],
        methods: ["GET", "POST", "OPTION"],
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
