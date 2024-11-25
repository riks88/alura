import express from "express";
import routes from "./src/routes/postRoutes.js";
console.log(process.env.STRING_CONNECTION)

const app = express();
app.use(express.static("uploads"))
routes(app)

app.listen(3000, () => {
    console.log("Server listening...")
});

