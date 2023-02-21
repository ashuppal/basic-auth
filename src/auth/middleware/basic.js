'use strict';


const base64 = require ('base-64');
const bcrypt = require ('bcrypt');


const {Sequelize, DataTypes} = require ('sequelize');

const sequelizeDatabase = new Sequelize (process.env.DATABASE_URL);

const userModel = sequelizeDatabase.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

userModel.beforeCreate((user) => {
  console.log('our user', user);
});

const basic = async (req, res, next) => {
  let { authorization } = req.headers;
  console.log('auth string', authorization);

  let authString = authorization.split(' ')[1];
  console.log('authString:', authString);


  let decodedAuthStr = base64.decode(authString);
  console.log('decodedAuthStr:', decodedAuthStr);

  let [username, password] = decodedAuthStr.split(':');
  console.log('username: ', username, 'password: ', password);

  let user = await userModel.findOne({where: {username}});
  console.log('ash as a user', user);
  if(user) {
    let validUser = await bcrypt.compare(password, user.password);
    if(validUser){
      req.user = user;
      next();
    } else {
      next('Not Authorized (password incorrect');
    }
  } else {
    next('Not Authorized (user doesn\'t exist in DB)');
  }


};


module.exports = basic;



