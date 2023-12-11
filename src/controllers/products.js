const getAll = (req, res) => res.json({ message: 'GET all' });

const getById = (req, res) =>
  res.json({ id: req.params.id, message: 'GET by id' });

const create = (req, res) => res.json({ message: 'POST new' });

export default {
  getAll,
  getById,
  create,
};
