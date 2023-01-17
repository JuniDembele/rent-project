const { Book } = require("../models/book.model");
const { User } = require("../models/user.model");

const addBookController = async (req, res) => {
  try {
    const { title, price, author, description } = req.body;
    if (!title && price && author && desciption)
      return res.status(400).json({
        message: "Title, price, author & description are required",
      });
    let book = await Book.create(req.body);
    return res.status(201).json({
      message: "Book successfully created",
      data: book,
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues occured",
    });
  }
};

const fetchAllBooks = async (req, res) => {
  try {
    let books = await Book.findOne({
      title: req.params.title,
    });
    if (!bookExist) {
      return res.status(400).json({
        message: "Book not found",
      });
    }
    return res.status(200).json({
      message: "book found successfully",
      data: bookExist,
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json("server issues");
  }
};

const findByNameController = async (req, res) => {
  try {
    const bookExist = await Book.findOne({ title: req.params.title });
    if (!bookExist) {
      return res.status(400).json({
        message: "book not found",
      });
    }
    return res.status(200).json({
      message: "Books fetched",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("server issues");
  }
};

const updateBooksController = async (req, res) => {
  try {
    const bookExist = await Book.findOne({ title: req.body.title });
    if (!bookExist) {
      return res.status(400).json({
        message: "Book requested not found",
      });
    }

    const bookUpdate = await bookExist.updateOne(req.body);
    return res.status(200).json({
      message: "Books fetched",
      data: bookUpdate,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("server issues");
  }
};

module.exports = {
  fetchAllBooks,
  addBookController,
  findByNameController,
  updateBooksController,
};
