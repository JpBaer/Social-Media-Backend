const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId()},
        reactionBody: {
            type: String,
            required: true,
            max: 280
        },

        username:{ 
            type: String,
            required: true
        },

        createdAt: {
            type: Date, 
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleDateString()
        }
       
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280},
        //Add date here
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleDateString()
        },
        username: {
            type: String,
            required: String},
        reactions: [reactionSchema],
        
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
}
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('thought',thoughtSchema)

module.exports = Thought;
