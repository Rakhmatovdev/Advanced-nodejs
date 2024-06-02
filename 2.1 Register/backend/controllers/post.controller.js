const postService = require("../service/post.service");

class PostController {
  async getAll(req, res) {
    try {
      const allPost = await postService.getAll()
      res.status(200).json(allPost);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getOne(req,res){
try {
    const onePost = await postService.getOne(req.params.id,req.body)
    res.status(200).json(onePost);
} catch (error) {
    res.status(500).json(error);
}
  }
  async createPost(req, res) {
    try {
      const newPost = await postService.createPost(req.body,req.files.picture)
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async deletePost(req,res){
    try {
        const deletedPost=await postService.deletePost(req.params.id)
        res.status(200).json(deletedPost);
    } catch (error) {
        res.status(500).json(error);
    }
  }
  async editedPost(req,res){
    try {
        const editedPost=await postService.editedPost(req.body,req.params.id)
        res.status(201).json(editedPost);

    } catch (error) {
        res.status(500).json(error);
    }
  }
}

module.exports = new PostController();
