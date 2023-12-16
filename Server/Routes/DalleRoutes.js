import express from 'express'
import * as dotenv from 'dotenv'
import OpenAI from 'openai'

dotenv.config()

const router = express.Router()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_NEW_API_KEY
});

// console.log("My API KEY : ", openai);

router.route('/').post(async(req, res) => {
    try {
        const { prompt } = req.body;

        // console.log("Prompt : ", prompt)

        const aiResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: '1792x1024',
            response_format: 'url',
        });

        // console.log("AI Response : ", aiResponse)

        const imageUrl = aiResponse.data[0].url;

        console.log("Result : ", imageUrl)

        res.status(200).json({ photo: imageUrl });
        // console.log("--- Fetching OpenAI API Done ---")
    } 
    
    catch (error) {
        console.log("Error : ", error);
        res.status(500).json({error: error.message})
    }
})

// router.route('/').get((req, res) => {
//     res.send("Hello from DALL-E (DalleRouter)");
// })

export default router