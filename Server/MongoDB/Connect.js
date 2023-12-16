import mongoose from 'mongoose'

const connectDB = (url) => {
    mongoose.set('strictQuery',true)

    mongoose.connect(url)
        .then(()=>console.log("MongoDB Connected Successfully"))
        .catch((error)=>console.log(error))
}

export default connectDB