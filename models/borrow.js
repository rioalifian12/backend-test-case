"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Member, {
        foreignKey: "idMember",
        as: "member",
      });
      this.belongsTo(models.Book, {
        foreignKey: "idBook",
        as: "book",
      });
    }
  }
  Borrow.init(
    {
      code: DataTypes.STRING,
      idMember: DataTypes.INTEGER,
      idBook: DataTypes.INTEGER,
      tanggalPinjam: DataTypes.DATE,
      tanggalKembali: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Borrow",
      timestamps: false,
    }
  );
  return Borrow;
};
