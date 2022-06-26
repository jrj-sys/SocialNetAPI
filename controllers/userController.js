const { User } = require('../models')

const UserController = {
  
  getAllUsers(req, res) {
    User.find({})
      .populate({path: 'thoughts', select: '-__v'})
      .populate({path: 'friends', select: '-__v'})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => { console.log(err); res.status(400).json(err); })
  },
  getUserById({ params }, res) {
    User.findOne( { _id: params.id } )
      .populate({path: 'friends'})
      .populate({path: 'thoughts'})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found by this ID!' })
        }

        res.json(dbUserData)})

      .catch(err => { console.log(err); res.status(500).json(err); })
  },
  createUser({ body }, res) {
    User.create(body)
      .then(newUserData => { res.json(newUserData) })
      .catch(err => { console.log(err); res.status(400).json(err); })
  },
  updateUserById({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(newUserData => {
        if (!newUserData) {
          res.status(404).json({ message: 'No user found by this ID!' })
        }
        res.json(newUserData)})
      .catch(err => { console.log(err); res.status(500).json(err); })
  },
  // TODO: make friends unique
  addFriendToUser({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: { _id: params.friendsId} } },
      { new: true, runValidators: true })
      .populate({path: 'friends'})
      .populate({path: 'thoughts'})
        .then(newFriendData => {
          if (!newFriendData) {
            res.status(404).json({ message: 'Could not add a friend!' })
          }
          res.json(newFriendData)})
        .catch(err => { console.log(err); res.status(500).json(err) })
  },
  deleteUserById({ params }, res) {
    User.findOneAndDelete( { _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found by this ID!' })
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(500).json(err));
  },
  deleteFriendFromUser({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendsId } },
      { new: true })
        .then(dbFriendData => {
          if (!dbFriendData) {
            res.status(404).json({ message: 'No friend connection found.' })
          }
          res.json(dbFriendData);
        })
        .catch(err => res.status(500).json(err));
  }
}

module.exports = UserController;