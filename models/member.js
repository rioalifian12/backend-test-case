"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Borrow, {
        foreignKey: "idMember",
        as: "detailPinjam",
      });
    }
  }
  Member.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      jumlahPinjam: DataTypes.INTEGER,
      tanggalPenalti: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Member",
      timestamps: false,
    }
  );
  return Member;
};
