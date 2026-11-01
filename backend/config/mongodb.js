import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sahil190105:190105@cluster0.l2cgbdz.mongodb.net/tomato').then(() => {
        console.log("DB Connected!");
    });
}