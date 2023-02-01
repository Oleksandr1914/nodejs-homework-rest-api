const service = require("../model/service");
const { schema, updateFavoriteSchema } = require("../model/schemas/schemas");

const get = async (req, res, next) => {
  try {
    const results = await service.getAll();
    res.json(results);
  } catch (err) {
    next(err);
  }
};
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.getById(id);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const post = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(404).json({
        message: "missing required name field",
      });
    }
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.removeById(id);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }
    const result = await service.updateById(id, body);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const result = await service.updateFavorite(id, body);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  getById,
  post,
  removeById,
  updateById,
  updateFavorite,
};
