const { Contact } = require("./schemas/schemas");

const getAll = () => {
  return Contact.find();
};

const getById = (id) => {
  return Contact.findById(id);
};

const create = (body) => {
  return Contact.create({ ...body });
};

const removeById = (id) => {
  return Contact.findByIdAndRemove(id);
};

const updateById = (id, body) => {
  return Contact.findByIdAndUpdate(id, body, { new: true });
};

const updateFavorite = (id, body) => {
  return Contact.findByIdAndUpdate(id, body, { new: true });
};

module.exports = {
  getAll,
  getById,
  create,
  removeById,
  updateById,
  updateFavorite,
};
