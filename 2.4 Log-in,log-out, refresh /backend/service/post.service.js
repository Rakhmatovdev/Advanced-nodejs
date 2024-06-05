const postModel = require("../models/post.model");
const fileService = require("./file.service");

class postService {
  async getAll() {
    const allPosts = await postModel.find();
    return allPosts;
  }
  async getOne(id){
    const onePost = await postModel.findById(id);
    return onePost;
  }

  async createPost(post,picture) {
    const fileName =fileService.save(picture)
    const newPost = await postModel.create({...post,picture:fileName});
    return newPost;
  }
  async deletePost(id) {
    const deletedPost = await postModel.findByIdAndDelete(id);
    return deletedPost;
  }
  async editedPost(post, id) {
    if (!id) {
      throw new Error("Id not found");
    }
    const isPost=await this.getOne(id)
    if(!isPost){
throw new Error("Post with existing ID is not found")
    }
    const updatePost=await postModel.findByIdAndUpdate(id,post,{new:true})
    return updatePost
  }
}

module.exports = new postService();
