const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const session = require('express-session');
const app = express();
require("./config/mongoose");

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.use(express.static("public"));

// Routers
const mainRouter = require("./routers/main");
const authRouter = require("./routers/auth");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);

// Router Middleware's
app.use("/", mainRouter);
app.use("/auth", authRouter);

// 404 page

app.get("*", (req, res) => {
  const URL = req.url;
  res.status(404).render("error", { status: 404, URL });
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server Running.! Port: ${PORT}`));
