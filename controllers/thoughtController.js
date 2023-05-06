const {Thought, User} = require('../models');

module.exports = {
    async getThoughts(req, res){
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err){
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res){
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtId});

            if(!thought){
                return res.status(404).json({message: 'No thought with that Id'})
            }

            res.json(thought);
        } catch (err){
            res.status(500).json(err);
        }
    },

    async createThought(req, res){
        try{
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            );
           res.json(thought)
        }catch(err){
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res){
        try{
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

            if(!thought){
                return res.status(404).json({message: 'No thought with that Id'})
            }

            const user = await User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            );

            if(!user){
                return res.status(404).json({
                    message: 'Thought deleted but no user with this id!'
                });
            }

            res.json(thought);
        } catch (err){
            res.status(500).json(err);
        }
    },

    async updateThought(req,res){
        try{
            const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId},{$set: req.body});

            if(!thought){
                return res.status(404).json({message: 'No thought with that Id'})
            }

            const user = await User.findOneAndUpdate(
                {thoughts: req.body.thoughtId},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            );

            res.json(thought);
        } catch(err){
            res.status(500).json(err);
        }
    },

    //Reaction controls
    async addReaction(req, res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            );

            if(!thought){
                return res.status(404).json({message: 'No thought with this Id found'})
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
            }
    },

    async deleteReaction(req, res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.tagId}}},
                {runValidators: true, new: true}
                );

                if(!thought){
                    return res.status(404).json({message: 'No application with this id!'});
                }
        }catch(err){
            res.status(500).json(err);
      }
    }
}