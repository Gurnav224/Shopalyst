const express = require("express");
const connetDB = require("./database/conn");
const session = require('express-session');
const MongoStore = require('connect-mongo');


const { config } = require("dotenv");

const cors = require("cors");
const morgan = require("morgan");

const userRouter = require('./routes/user.route');
const productRouter = require("./routes/product.route");
const categoryRouter = require("./routes/category.route");
const cartRouter = require("./routes/cart.route");
const wishlistRouter = require("./routes/wishlist.route");
const addressRouter = require('./routes/address.route');

config({ path: ".env" });

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(session({
  secret:'my_key',
  resave:false,
  saveUninitialized:false,
  store:MongoStore.create({
    mongoUrl:process.env.MONGODB,
    ttl:60*60*24
  }),
  cookie:{secure:false}
}))


app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("ecommerce backend is running");
});

// user routes

app.use('/api', userRouter );


// products routes
app.use("/api", productRouter);

// category routes
app.use("/api", categoryRouter);

//cart routes
app.use("/api", cartRouter);

// wishlist routes;
app.use("/api" , wishlistRouter);

// address routes
app.use('/api', addressRouter)

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connetDB();
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("failed to start the server");
  }
};

startServer();
