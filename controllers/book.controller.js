const models = require("../models");

// get semua data buku
const getAllBook = async (req, res) => {
  try {
    const book = await models.Book.findAll({
      where: { stock: 1 },
    });

    res.status(200).json({
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan!",
    });
  }
};

module.exports = {
  getAllBook,
};
