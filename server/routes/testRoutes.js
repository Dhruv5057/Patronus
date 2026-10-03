import express from "express";
import { signUp } from "../controllers/authController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "Patronus API is working"
  });
});

router.post("/signup", signUp);

export default router;