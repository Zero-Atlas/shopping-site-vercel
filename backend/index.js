const path = require("path");
const fs = require("fs");
const process = require("process");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");

const authRouter = require("./router/auth");
const adminRouter = require("./router/admin");
const productRouter = require("./router/product");
const orderRouter = require("./router/order");
const User = require("./model/user");

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@shopping-site-vercel.wbs62ys.mongodb.net/${process.env.MONGO_DATABASE}`;

//---------------------------------- multer init ----------------------------------------------
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toString().replace(/([:])/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const app = express();

//--------------------------------------- middleware init -------------------------------------------------
app.use(
  cors({
    origin: ["https://shopping-site-vercel.vercel.app", "https://shopping-site-vercel-admin.vercel.app"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));
//----------------------------------- session ----------------------------------
app.use(
  session({
    secret: "session secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    name:"shoppingSiteSession",
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);


//---------------------------------------------- auth init -------------------------------------------------
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
    "allowedHeaders,socket.io"
  );

  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(err);
    });
});

//------------------------------------------------- Router connect ----------------------------------------------
app.use(authRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/admin", adminRouter);

//error handler
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({
    message: "Some error occured on server",
  });
});

app.use(function (req, res, next) {
  res.status(404);
  console.log(error);
  // respond with json
  if (req.accepts("json")) {
    res.json({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

//---------------------------------------------------- server init -------------------------------------------------------
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    const server = app.listen(process.env.PORT || 5000);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("Client connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
