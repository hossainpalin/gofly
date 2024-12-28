import { userRegister } from "@/controllers/user";
import { userRegisterValidationRules } from "@/validation";
import express from "express";

const router = express.Router();

router.post("/register", userRegisterValidationRules, userRegister);

export default router;
