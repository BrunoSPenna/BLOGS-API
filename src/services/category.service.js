const Sequelize = require('sequelize');
const config = require('../config/config');
const { Category } = require('../models/index');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const InsertCategory = async (name) => {
  const tr = await sequelize.transaction();

  try {
    const category = await Category.create(
      { name },
      { transaction: tr },
    );

    await tr.commit();

    return category;
  } catch (e) {
    await tr.rollback();
    console.log(e);
    throw e;
  }
};

const allCategory = async () => {
  const category = await Category.findAll();
  return category;
};

const categoryById = async (arrayId) => {
  const promisse = arrayId.map((idCate) => Category.findOne({
    where: idCate,
  }));
  const result = Promise.all(promisse);
  return result;
};

module.exports = {
  InsertCategory,
  allCategory,
  categoryById,
};