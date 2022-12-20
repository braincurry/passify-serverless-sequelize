"use strict";
const PostModel = require("../models/postModel");
const dbConnect = require("../models");
const response = require("../libs/response");

module.exports.getHandler = async (event) => {
  try {
    await dbConnect();
    const postObj = new PostModel();
    const AllPosts = await postObj.getPosts();
    return response(200, "fetched successfully", AllPosts);
  } catch (err) {
    console.log(err);
    return response(400, "error in fetching post");
  }
};

module.exports.postHandler = async (event) => {
  try {
    await dbConnect();
    const data = JSON.parse(event.body);
    const postObj = new PostModel();
    await postObj.createPosts(data);
    return response(200, "created");
  } catch (err) {
    console.log(err);
    return response(400, "error in creating post");
  }
};
