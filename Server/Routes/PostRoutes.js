import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

import Post from '../MongoDB/Models/Post.js'

dotenv.config()

const router = express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// GET ALL POST
router.route('/').get(async(req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({success: true, data: posts})
    } 
    
    catch (error) {
        res.status(500).json({success: false, message:'Fetching posts failed, please try'});
    }
})

// CREATE A POST
router.route('/').post(async(req, res) => {
    try {
        const { name, prompt, photo } = await req.body;

        if (!name || !prompt || !photo) {
            return res.status(400).json({ success: false, message: 'Name, prompt, and photo are required fields.' });
        }

        // console.log("Name, Prompt and Photo Recived")

        const photoUrl = await cloudinary.uploader.upload(photo, {
            resource_type: 'image',
        });

        // console.log("Photo URL : ", photoUrl)

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });

        // console.log("new Post : ", newPost)

        res.status(200).json({success: true, data: newPost})
    } 
    
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Unable to create a post, please try again', error: error.message });
    }
})

router.route('/:_id').delete(async (req, res) => {
    try {
        const { _id } = await req.body

        // Find the post by _id
        const post = await Post.findById(_id);

        // Delete the photo from Cloudinary
        await cloudinary.uploader.destroy(post._id);

        // Delete the post from the database
        await Post.deleteOne({ _id: _id });

        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Unable to delete the post, please try again', error: error.message });
    }
});


export default router