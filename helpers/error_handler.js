const errorHandler = (res, error) => {
  res.status(500).send({ message: `ERROR:  ${error}` });
};

module.exports = errorHandler;
