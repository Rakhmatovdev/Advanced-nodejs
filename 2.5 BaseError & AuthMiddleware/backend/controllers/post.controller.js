const postService = require("../service/post.service");

class PostController {
  async getAll(req, res,next) {
    try {
      const allPost = await postService.getAll()
      res.status(200).json(allPost);
    } catch (error) {
     next(error)
    }
  }
  async getOne(req,res,next){
try {
    const onePost = await postService.getOne(req.params.id,req.body)
    res.status(200).json(onePost);
} catch (error) {
   next(error)
}
  }
  async createPost(req, res,next) {
    try {
      const newPost = await postService.createPost(req.body,req.files.picture)
      res.status(201).json(newPost);
    } catch (error) {
     next(error)
    }
  }
  async deletePost(req,res,next){
    try {
        const deletedPost=await postService.deletePost(req.params.id)
        res.status(200).json(deletedPost);
    } catch (error) {
       next(error)
    }
  }
  async editedPost(req,res,next){
    try {
        const editedPost=await postService.editedPost(req.body,req.params.id)
        res.status(201).json(editedPost);

    } catch (error) {
       next(error)
    }
  }
}

module.exports = new PostController();
