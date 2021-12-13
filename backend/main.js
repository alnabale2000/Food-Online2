const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());

const usersRouter = require("./routes/routers/users");
const authRouter = require("./routes/routers/auth");
const ResturantsRouter = require("./routes/routers/resturants");
const categoriesRouter = require("./routes/routers/categories");
const mealsRouter = require("./routes/routers/meals");
const commentsRouter = require("./routes/routers/comments");
const usersCartRouter = require("./routes/routers/users_cart");
const usersAddressRouter = require("./routes/routers/users_address");
const ordersRouter = require("./routes/routers/orders");
const corsOptions = { origin: "*", credentials: true };

app.use(cors(corsOptions));

app.use(usersRouter);
app.use(authRouter);
app.use(ResturantsRouter);
app.use(categoriesRouter);
app.use(mealsRouter);
app.use(commentsRouter);
app.use(usersCartRouter);
app.use(usersAddressRouter);
app.use(ordersRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});
