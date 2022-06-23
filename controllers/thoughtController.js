const { Thought } = require('../models')

const ThoughtController = {

  getAllThoughts(req, res) {},
  createNewThought({ body }, res) {},
  getThoughtById({ params }, res) {},
  updateThoughtById({ params, body }, res) {},
  removeThoughtById({ params }, res) {},
  createNewReaction({ params, body }, res) {},
  removeReactionById({ params }, res) {}
}

module.exports = ThoughtController;