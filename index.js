import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import { usersRouter } from "./routers/user.js";
import { auth } from "./middleware/auth.js";

const app = express();
dotenv.config();
app.use(cors());

const PORT = process.env.PORT;

// middle ware -> Intercept ->converting body to json
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected 😊");
  return client;
}

export const client = await createConnection();

app.get("/", function (request, response) {
  response.send("Hello World hai sathish");
});

app.get("/stories", auth, async function (reqest, response) {
  const stories = await client
    .db("under-the-tree")
    .collection("stories")
    .find({})
    .toArray();
  response.send(stories);
});

app.use("/user", usersRouter);

app.listen(PORT, () => console.log(`server started in ${PORT}`));
