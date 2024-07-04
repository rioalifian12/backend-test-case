const models = require("../models");

const checkPenalti = async (req, res, next) => {
  try {
    const { body } = req;
    const idMember = req.body.idMember;

    const member = await models.Member.findOne({
      where: { id: idMember },
    });

    if (!member) {
      return res.status(404).json({
        message: "Member tidak ditemukan!",
      });
    }

    // jika member memilik penalti atau memiliki penalti lebih dari 3 hari
    if (member.tanggalPenalti) {
      const tanggalPenalti = new Date(member.tanggalPenalti);
      const tanggalPinjam = new Date(body.tanggalPinjam);
      const selisihHari = Math.floor(
        (tanggalPinjam - tanggalPenalti) / (1000 * 60 * 60 * 24)
      );
      if (selisihHari >= 0) {
        member.tanggalPenalti = null;
        await member.save();
      } else {
        return res.status(403).json({
          message: "Anda sedang dalam hukuman!",
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan!",
    });
  }
};

module.exports = {
  checkPenalti: checkPenalti,
};
