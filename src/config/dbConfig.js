import { MongoClient } from 'mongodb'

export default async function connectDB(stringConnection) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConnection);
        console.log('Connecting to database cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');

        return mongoClient;
    } catch (failed) {
        console.error('DB Connection failed!', failed)
        process.exit();
    }
}