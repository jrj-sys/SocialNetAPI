const { User, Thought } = require('../models')


const ThoughtController = {

  getAllThoughts(req, res) {
    Thought.find({})
      .populate({path: 'reactions'})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => { console.log(err); res.status(400).json(err) })
  },
  createNewThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate( 
          { _id: body.userId },
          { $push: { thoughts: _id }},
          { new: true })
          .populate({path: 'thoughts', select: '-__v'})
      }).then(newThoughtData => {
          res.json(newThoughtData)
        })
        .catch(err => { console.log(err); res.status(500).json(err)})
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'})
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found by this ID!' })
        }
        res.json(dbThoughtData)
      })
      .catch(err => res.status(500).json(err));
  },
  updateThoughtById({ params, body }, res) {
    Thought.findOneAndUpdate( 
      { _id: params.id }, 
      body, 
      { new: true, runValidators: true})
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this ID!' })
          }
          res.json(dbThoughtData)
        })
        .catch(err => res.status(500).json(err));
  },
  removeThoughtById({ params }, res) {
    Thought.findOneAndDelete( { _id: params.id } )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this ID!'})
        }
        res.json(dbThoughtData)
      })
      .catch(err => res.status(500).json(err));
  },
  createNewReaction({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId },
      { $push: { reactions: body }},
      { new: true })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'Could not find a thought with this ID'});
                return;
            }
            res.json(dbThoughtsData)
        }).catch (err => {
            console.log(err);
            res.status(400).json(err)
      });
  },
  removeReactionById({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId} }},
      { new: true}
        )
      .then(dbThoughtsData => {
        if(!dbThoughtsData) {
            res.status(404).json({ message: 'Could not find thought with this id'});
            return;
        }
        res.json(dbThoughtsData)
      })
      .catch(err => res.json(err)); 
  }
}

module.exports = ThoughtController;