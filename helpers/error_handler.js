const errorHandler = (res, error) => {
  res.status(500).send({ message: `Xatolik: ${error}` });
};

module.exports = errorHandler;
