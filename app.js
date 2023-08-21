require(`dotenv`).config();
require(`express-async-errors`);

const express = require(`express`);
const app = express();

const notFoundMiddleware = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const morgan = require('morgan');
const cors = require(`cors`);
const connectDB = require(`./db/connect`);

const usersRouter = require(`./routes/users-routes`);
const authRouter = require(`./routes/auth-routes`);

app.use(express.json());
app.use(morgan(`tiny`));
app.use(cors());

// ROUTES
app.get(`/`, (req, res) => {
  res.send(`ChessOnChain Waitlist API`);
});

app.use(`/api/v1/auth`, authRouter);
app.use(`/api/v1/users`, usersRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}....`);
  });
};

start();
