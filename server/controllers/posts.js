import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    
    res.status(201).json(newPost);
  } catch (error) {
    // 409 : error of creation
    res.status(409).json({ message: error.message });
  }
};

// READ
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// READ
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }).sort({ _id: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);

    // the likes is a map
    if (!post.likes.get(userId)) {
      post.likes.set(userId, true);
    } else {
      post.likes.delete(userId);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        likes: post.likes,
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
