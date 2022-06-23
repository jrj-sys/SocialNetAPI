const router = require('express').Router();

const { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUserById,
  addFriendToUser,
  deleteUserById, 
  deleteFriendFromUser
} = require('../../controllers/userController')

router.route('/')
  .get(getAllUsers)
  .post(createUser)

router.route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById)

router.route('/:userId/friends/:friendsId')
  .post(addFriendToUser)
  .delete(deleteFriendFromUser)

module.exports = router;
 


