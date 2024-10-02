const express = require('express');
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  signUpUser,
  signInUser,
} = require('../controllers/usersController');
const requireAuth = require('../middleware/auth');
const unless = require('../core/middleware');

const router = express.Router();

router.use(unless({ paths: ['/signup', '/signin'] }, requireAuth));

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/signup', signUpUser);
router.post('/signin', signInUser);


module.exports = router;
