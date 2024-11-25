import 'dotenv/config';
import pkg from 'mongodb';
const { ObjectId } = pkg;
import connectDB from "../config/dbConfig.js";

const connection = await connectDB(process.env.STRING_CONNECTION)

export async function getAllPosts() {
    const db = connection.db("alura-app")
    const collection = db.collection("posts")
    return collection.find().toArray()
}

export async function addNewPost(newPost){
    const db = connection.db("alura-app")
    const collection = db.collection("posts")
    return collection.insertOne(newPost)
}

export async function updateNewPost(id, newPost){
    const db = connection.db("alura-app")
    const collection = db.collection("posts")
    const objID = ObjectId.createFromHexString(id)
    return collection.updateOne({_id: new ObjectId(objID)}, {$set: newPost})
}