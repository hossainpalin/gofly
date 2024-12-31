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

// Captain registration validation rules
export const captainRegisterValidationRules = [
  check("fullName").notEmpty().withMessage("Full name is required"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("vehicle.type")
    .isIn(["car", "auto", "motorcycle"])
    .withMessage("Invalid vehicle type"),
  check("vehicle.color")
    .isLength({ min: 3 })
    .withMessage("Color must be at least 3 characters long"),
  check("vehicle.plateNumber")
    .isLength({ min: 3 })
    .withMessage("Plate number must be at least 3 characters long"),
  check("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1")
];

// Captain login validation rules
export const captainLoginValidationRules = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("password").isLength({ min: 6 }).withMessage("Password is required")
];
