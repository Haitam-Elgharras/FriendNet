import User from "../models/User.js";

// get the current user
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all friends of the current user
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, firstName, lastName, occupation, location, picturePath } =
        friend;
      friendList.push({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      });
    });

    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update the current user's friend list
export const AddRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user.friends.includes(friendId)) {
      await user.friends.push(friendId);
      //   TODO: the friend needs to accept the request first
      await friend.friends.push(id);
    } else {
      await user.friends.filter((friend) => friend !== friendId);
      await friend.friends.filter((friend) => friend !== id);
    }
    user.save();
    friend.save();

    // needs refactoring
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, firstName, lastName, occupation, location, picturePath } =
        friend;
      friendList.push({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      });
    });

    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
