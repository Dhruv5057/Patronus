import express from "express";
import { signUp, login, refreshAccessToken } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "Patronus API is working"
  });
});

router.get("/protected", authMiddleware, authorize("admin"), (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user
  });
});

router.post("/signup", signUp);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);


export default router;