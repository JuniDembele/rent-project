const express = require("express");
const { appendFile } = require("fs");
const app = express();
const path = require("path");

const { AppStarter } = require("./utils");
const port = 2001;

const {
  indexController,
  authController,
  middlewares,
} = require("./controllers");
const {
  verifyToken,
  checkIfAdmin,
} = require("./controllers/middlewares/index");
const {
  validateSignupMiddleware,
  validateLoginMiddleware,
  validatePasswordChangeMiddleware,
} = require("./models/validators/auth.validator");
const {
  fetchAllBooks,
  addBookController,
  findByNameController,
  updateBooksController,
} = require("./controllers/book.controller");
const {
  validatecreateBooksChangeSchema,
  validateupdateBooksChangeSchema,
} = require("./models/validators/books.validator");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", indexController);
app.post("/forgot-password", authController.RequestPasswordResetController);

app.post("/signup", validateSignupMiddleware, authController.SignupController);
app.post("/login", validateLoginMiddleware, authController.LoginController);
app.put(
  "/password",
  validatePasswordChangeMiddleware,
  middlewares.verifyToken,
  authController.PasswordChangeController
);

// app.get("/auth/google", getGoogleLogin);

// app.get("/auth/google/callback", handleGoogleLogin);

// app.get("/profile", (req, res) => {
//   console.log(req);
//   res.send("Welcome");
// });

app.get("/books", fetchAllBooks);
app.post(
  "/books",
  validatecreateBooksChangeSchema,
  checkIfAdmin,
  addBookController
);
app.get("/books/:title", verifyToken, findByNameController);
app.put(
  "/books",
  checkIfAdmin,
  validateupdateBooksChangeSchema,
  updateBooksController
);

app.listen(port, AppStarter(port));
