const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

// controller methods
const { createUser, loginUser, renewToken } = require('../controllers/authController');
const { validateFields } = require('../middlewares/validateFields');
const { validateJwt } = require('../middlewares/validateJwt');

router.get('/renew', validateJwt, renewToken)
router.post('/signup', 
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email has to be valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
  ], 
  createUser
);
router.post('/login', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'A valid email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty()
  ],
  loginUser
)

module.exports = router;