const db = require("../models");
const models = require("../models");

const updateBorrow = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const id = req.params.id;
    const tanggalKembali = new Date(req.body.tanggalKembali);

    const borrow = await models.Borrow.findByPk(id, { transaction: t });
    if (!borrow || borrow.tanggalKembali !== null) {
      res.status(404).json({
        message: "Data peminjaman tidak ditemukan atau sudah dikembalikan!",
      });
    } else {
      const updateBorrow = await models.Borrow.findOne({
        where: { id: id },
        transaction: t,
      });

      updateBorrow.tanggalKembali = tanggalKembali;
      await updateBorrow.save();

      // Jika tanggalKembali lebih dari 7 hari
      const tanggalPinjam = borrow.tanggalPinjam;
      const selisihHari = Math.floor(
        (tanggalKembali - tanggalPinjam) / (1000 * 60 * 60 * 24)
      );

      const member = await models.Member.findOne(
        {
          where: { id: borrow.idMember },
        },
        { transaction: t }
      );

      // jika user mengembalikan lebih dari 7 hari
      if (selisihHari > 7) {
        const tanggalPenalti = new Date(tanggalKembali);
        tanggalPenalti.setDate(tanggalPenalti.getDate() + 3);

        member.tanggalPenalti = tanggalPenalti;
        await member.save();
      }

      const book = await models.Book.findByPk(borrow.idBook);
      // Kembalikan stock buku
      book.stock += 1;
      await book.save({ transaction: t });

      // Commit peminjaman
      await t.commit();

      res.status(201).json({
        message: "Ubah peminjaman berhasil!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan!",
    });
  }
};

module.exports = {
  updateBorrow: updateBorrow,
};
