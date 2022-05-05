import { client } from "./index.js";
import { ObjectId } from "mongodb";

async function getStories() {
  return await client
    .db("under-the-tree")
    .collection("stories")
    .find({})
    .toArray();
}

async function createUser(newUser) {
  return await client
    .db("under-the-tree")
    .collection("user")
    .insertOne(newUser);
}
async function getUserByName(username) {
  return await client
    .db("under-the-tree")
    .collection("user")
    .findOne({ name: username });
}

export { createUser, getUserByName, getStories };
