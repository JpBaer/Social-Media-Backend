const {Schema, model, ObjectId} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()},
        reactionBody: {
            type: String,
            required: true,
            max: 280},

        username:{ 
            type: String,
            required: true},

        createdAt: {type: Date, default: Date.now}

    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280},
        //Add date here
        createdAt: {type: Date, default: Date.now} ,
        username: {
            type: String,
            required: String},
        reactions: [reactionSchema],
        
    },
    {
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('thought',thoughtSchema)

module.exports = Thought;