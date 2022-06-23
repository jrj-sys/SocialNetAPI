const { User } = require('../models')

const UserController = {
  
  getAllUsers(req, res) {},
  getUserById({ params }, res) {},
  createUser({ body }, res) {},
  updateUserById({ params, body }, res) {},
  addFriendToUser({ params }, res) {},
  deleteUserById({ params }, res) {},
  deleteFriendFromUser({ params }, res) {}

}

module.exports = UserController;