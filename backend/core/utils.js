const bcrypt = require('bcrypt');


const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  return password_hash;
}


module.exports = {
  hashPassword,
};
