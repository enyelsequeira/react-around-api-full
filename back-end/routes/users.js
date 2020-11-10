const express = require('express');

const router = express.Router();
const {
  getUsers,
  getOneUser,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/users/me', auth, getUserInfo);

// general user routes
router.get('/users', auth, getUsers);
router.get('/users/:id', auth, getOneUser);
router.patch('/users/me', auth, updateProfile);
router.patch('/users/me/avatar', auth, updateAvatar);

module.exports = router;
// http://localhost:3000/users/5f845d006c7b26589c33b82
