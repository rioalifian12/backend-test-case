const models = require("../models");

// get semua data member
const getAllMember = async (req, res) => {
  try {
    const member = await models.Member.findAll({
      include: { model: models.Borrow, as: "detailPinjam" },
    });

    res.status(200).json({
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan!",
    });
  }
};

module.exports = {
  getAllMember,
};
