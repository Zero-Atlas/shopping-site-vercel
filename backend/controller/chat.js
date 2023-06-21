const User = require("../model/user");
const Chat = require("../model/chat");
const io = require("../socket");

exports.getHistory = (req, res, next) => {
  const chatRoom = req.user.chatRoom;
  if (!chatRoom) {
    return res.status(200).json([]);
  }

  Chat.findById(chatRoom)
    .then((history) => {
      return res.status(200).json(history);
    })
    .catch((err) => next(err));
};

exports.getHistoryById = (req, res, next) => {
  const chatRoom = req.params.roomId
  if (!chatRoom) {
    return res.status(200).json([]);
  }

  Chat.findById(chatRoom)
    .then((history) => {
      return res.status(200).json(history);
    })
    .catch((err) => next(err));
};

exports.postSendMessage = (req, res, next) => {
  const socket = io.getIO();
  const message = req.body.message;
  const isCustomer = req.user.level === 0;
  let chatRoomId = req.user.chatRoom || "123456789123456789123456";

  if(!isCustomer){
    chatRoomId=req.body.roomId
  }

  Chat.findById(chatRoomId)
    .then((chatRoom) => {
      if (!chatRoom) {
        chatRoom = new Chat({
          chatHistory: [{ message: message, isCustomer: isCustomer }],
        });
      } else {
        chatRoom.chatHistory.push({ message: message, isCustomer: isCustomer });
      }

      return chatRoom
        .save()
        .then((result) => {
          req.user.chatRoom = chatRoom._id;
          return req.user.save();
        })
        .then(() => {
          socket.emit("chat", { chatRoom: req.user.chatRoom });
          res.status(200).json({ message: "Message sent!" });
        });
    })
    .catch((err) => next(err));
};

exports.getRooms = (req, res, next) => {
  Chat.find()
    .select("_id")
    .then((rooms) => {
      return res.status(200).json(rooms);
    })
    .catch((err) => next(err));
};
