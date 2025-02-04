import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";

 const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`Connected to: ${connectionInstance.connection.host} successfully`);
    } catch (error) {
        console.log('Error connecting to database: ', error);
        process.exit(1);
    }
}

export default connectDb;