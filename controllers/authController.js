const bcrypt = require('bcryptjs');

// local imports
const User  = require('../models/User');
const { generateJwt } = require('../helpers/jwt');

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailExists = await User.findOne({email});
    if (emailExists) {
      return res.status(400).json({ok: false, msg: 'Email already exisits'})
    }
    const user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    const token = await generateJwt(user.id);
    res.json({ok: true, body: user, token})
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ok: false, msg: 'There was a server error'})
  }
  
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const dbUser = await User.findOne({email});
    if (!dbUser) {
      return res.status(404).json({ok: false, msg: 'Email not found'});
    }
    const validPassword = bcrypt.compareSync(password, dbUser.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Please check credentials"
      })
    }
    const token = await generateJwt(dbUser.id);
    res.json({ok: true, dbUser, token});
  } catch (error) {
    return res.status(500).json({ok: false, msg: "Something went wrong with the server"});
  }
}

const renewToken = async (req, res) => {

  const uid = req.uid;

  const token = await generateJwt(uid);
  const user = await User.findById(uid);
  
  res.json({
    ok: true, 
    user,
    token
  })
}

module.exports = {
  createUser,
  loginUser,
  renewToken
}