import {
  getUserProfile,
  userLogin,
  userLogout,
  userRegister
} from "@/controllers/user.controllers";
import {
  userLoginValidationRules,
  userRegisterValidationRules
} from "@/validation";
import express from "express";
import { checkLogin } from "@/middlewares/auth.middleware";

const router = express.Router();

router.post("/register", userRegisterValidationRules, userRegister);
router.post("/login", userLoginValidationRules, userLogin);
router.get("/profile", checkLogin, getUserProfile);
router.get("/logout", checkLogin, userLogout);

export default router;
