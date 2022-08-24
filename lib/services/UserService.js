const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = class UserService {

  static async createUser({ email, username, password }) {
    try {

      if (await User.getByEmail(email) !== null)
        throw new Error('Username already exists');
      
      const passwordHash = await bcrypt.hash(
        password,
        Number(process.env.SALT_ROUNDS)
      );
      
      const user = await User.insert({
        email, 
        username,
        passwordHash
      });

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day'
      });


      return [user, token];
    } catch (e) {
      e.status = 401;
      throw e;
    }
  }

  static async signIn({ email, password = '' }) {
    try { 
      const user = await User.getByEmail(email);

      if (!user) throw new Error ('Invalid Email');
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid password');

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day'
      });

      return token;
    } catch (e) {
      e.status = 401;
      throw e;
    }
  }
};
