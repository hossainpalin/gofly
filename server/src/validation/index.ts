import { check } from "express-validator";

// User registration validation rules
export const userRegisterValidationRules = [
  check("fullName").notEmpty().withMessage("Full name is required"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
];

// User login validation rules
export const userLoginValidationRules = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("password").isLength({ min: 6 }).withMessage("Password is required")
];
