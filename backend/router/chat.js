const express = require("express");

const router = express.Router();

const chatController = require("../controller/chat");
const isAuth = require("../middleware/is-auth");

router.get("/history", isAuth, chatController.getHistory);
router.get('/history/:roomId',isAuth,chatController.getHistoryById)

router.get("/rooms", isAuth, chatController.getRooms);

router.post("/send", isAuth, chatController.postSendMessage);

module.exports = router;
