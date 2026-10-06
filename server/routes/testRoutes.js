import express from "express";
import { signUp, login } from "../controllers/authController.js";
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "Patronus API is working"
  });
});

router.post("/signup", signUp);
router.post("/login", login);

export default router;