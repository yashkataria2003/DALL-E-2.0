import mongoose from 'mongoose';

const Post = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        requierd: true
    },
    photo: {
        type: String,
        requierd: true
    }
});

const PostSchema = mongoose.model('Post', Post);

export default PostSchema;