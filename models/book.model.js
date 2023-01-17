const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: "String",
    price: "String",
    author: "String",
    description: "String",
    year: "String",
  },
  {
    timeStamp: true,
  }
);

const Book = model("Book", bookSchema);
module.exports = { Book };
