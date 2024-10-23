const express = require('express');
const {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} = require('../controllers/usersController');
const { authorizeAnyRoles, requireAuthentication } = require('../middleware/auth');


const router = express.Router();

router.use(requireAuthentication);

router.post('/', authorizeAnyRoles('SUPERUSER'), createUser);
router.get('/', authorizeAnyRoles('SUPERUSER', 'ADMIN'), getUsers);
router.get('/:id', getUser); // permission applied to item level
router.put('/:id', updateUser); // permission applied to item level
router.delete('/:id', authorizeAnyRoles('SUPERUSER'), deleteUser);


module.exports = router;
