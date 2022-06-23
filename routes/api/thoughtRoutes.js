const router = require('express').Router();

const {
  getAllThoughts,
  createNewThought,
  getThoughtById,
  updateThoughtById,
  removeThoughtById,
  createNewReaction,
  removeReactionById

} = require('../../controllers/thoughtController')

router.route('/')
  .get(getAllThoughts)
  .post(createNewThought)

router.route('/:id')
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(removeThoughtById)

router.route('/:thoughtId/reactions')
  .post(createNewReaction)

router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReactionById)

module.exports = router;
