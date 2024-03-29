import express from "express";

import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET the current user
router.get("/:id", verifyToken, getUser);

// GET all friends of the current user
router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE the current user's friend list
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
