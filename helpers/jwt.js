const jwt = require('jsonwebtoken');

const generateJwt = (uid) => {
  return new Promise((resolve, reject) => {
   
    const payload = {uid};
    
    jwt.sign(payload, process.env.JWT_KEY, 
      {expiresIn: '48h'}, (err, token) => {
        if (err) {
          reject('Couldnt generate JWT');
        } else {
          resolve(token);
        }
    });

  });
}

module.exports = {
  generateJwt
}