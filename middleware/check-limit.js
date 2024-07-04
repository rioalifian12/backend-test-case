const models = require("../models");

const checkLimit = async (req, res, next) => {
  try {
    const idMember = req.body.idMember;
    const borrow = await models.Borrow.count({
      where: {
        idMember: idMember,
        tanggalKembali: null,
      },
    });

    if (borrow >= 2) {
      return res.status(403).json({
        message: "Anda sudah mencapai limit!",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan!",
    });
  }
};

module.exports = {
  checkLimit: checkLimit,
};
