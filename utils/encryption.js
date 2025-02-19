const bcrypt = require('bcryptjs');

const encrypt = (text) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(text, salt);
};

const decrypt = (hash, text) => {
  return bcrypt.compareSync(text, hash);
};

module.exports = { encrypt, decrypt }; 