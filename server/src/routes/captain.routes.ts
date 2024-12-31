import express from "express";
import {
  captainLogin,
  captainLogout,
  captainRegister,
  getCaptainProfile,
  updateCaptainProfile
} from "@/controllers/captain.controllers";
import { checkLogin } from "@/middlewares/auth.middleware";

const router = express.Router();

router.post("/register", captainRegister);
router.post("/login", captainLogin);
router.get("/profile", checkLogin, getCaptainProfile);
router.post("/update-profile", checkLogin, updateCaptainProfile);
router.get("/logout", checkLogin, captainLogout);

export default router;
