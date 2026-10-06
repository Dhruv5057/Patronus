import express from "express";
import { signUp, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "Patronus API is working"
  });
});

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user
  });
});

router.post("/signup", signUp);
router.post("/login", login);



export default router;