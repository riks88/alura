import {getAllPosts, addNewPost, updateNewPost} from "../models/postModels.js";
import generateGeminiDescription from "../services/geminiService.js"
import fs from "fs";

export async function listPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function addPost(req, res) {
    const newPost = req.body;
    try {
        const postCreated = await addNewPost(newPost);
        res.status(200).json(postCreated);
    }
    catch(issue) {
        console.error(issue.message);
        res.status(500).json({"Error":"Requisition failed"});
    }
}

export async function imageUpload(req, res) {
    const newPost = {
        description: "",
        imgURL: req.file.originalname,
        alt:""
    };

    try {
        const postCreated = await addNewPost(newPost);
        const newUpload =`uploads/${postCreated.insertedId}.png`
        fs.renameSync(req.file.path, newUpload)
        res.status(200).json(postCreated);
    }
    catch(issue) {
        console.error(issue.message);
        res.status(500).json({"Error":"Upload failed"});
    }
}

export async function updatePost(req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const description = await generateGeminiDescription(imageBuffer)

        const post = {
            imgURL: urlImage,
            description: description,
            alt: req.body.alt
        }

        const postUpdated = await updateNewPost(id, post);
        res.status(200).json(postUpdated);
    }
    catch(issue) {
        console.error(issue.message);
        res.status(500).json({"Error":"Requisition failed"});
    }
} 