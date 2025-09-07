import express from "express";
import { createUser, findUserByUsername, validatePassword } from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Missing username or password" });

  try {
    const user = await createUser(username, password);
    return res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Error creating user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isValid = await validatePassword(user, password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
