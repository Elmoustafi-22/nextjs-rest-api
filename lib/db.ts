import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log("Already connected!")
        return;
    }

    if (connectionState === 2){
        console.log("Database connecting...")
        return;
    }

    try {
        mongoose.connect(MONGODB_URI!, {
            dbName: 'Nextjs-rest-api',
            bufferCommands: true,
        }).then(() => {
            console.log("Database connected!")
        })
    } catch(err) {
        console.log("Error", err)
    }
}

export default connect;