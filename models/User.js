const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        //Add more validation to username and email
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        }, 
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address']
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('user',userSchema)

module.exports = User;

