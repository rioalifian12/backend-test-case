const db = require("../models");
const models = require("../models");

const addBorrow = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const { body } = req;
    const idMember = body.idMember;
    const idBook = body.idBook;
    const tanggalPinjam = new Date(body.tanggalPinjam);

    const member = await models.Member.findByPk(idMember);

    const book = await models.Book.findByPk(idBook, { transaction: t });
    if (!book) {
      return res.status(404).json({
        message: "Buku tidak ditemukan!",
      });
    }
    if (book.stock === 0) {
      return res.status(404).json({
        message: "Stock buku tidak tersedia!",
      });
    }

    // input ke tabel borrow
    const dataBorrow = {
      idMember: idMember,
      idBook: idBook,
      tanggalPinjam: tanggalPinjam,
    };

    const createBorrow = await models.Borrow.create(dataBorrow, {
      transaction: t,
    });

    const idBorrow = createBorrow.id;

    // generate code
    const code = `BOR-${idBorrow}`;
    createBorrow.code = code;
    await createBorrow.save({ transaction: t });

    // Mengurangi stock buku
    book.stock -= 1;
    await book.save({ transaction: t });

    // tambah jumlah pinjam member
    member.jumlahPinjam += 1;
    await member.save({ transaction: t });

    // Commit peminjaman
    await t.commit();

    const borrow = await models.Borrow.findByPk(idBorrow);

    res.status(201).json({
      message: "Buat peminjaman berhasil!",
      data: borrow,
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      message: "Terjadi kesalahan!",
    });
  }
};

module.exports = {
  addBorrow: addBorrow,
};
