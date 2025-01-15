import { BlackListToken } from "@/models/black-list-token.model";
import { User } from "@/models/user.model";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

// UserAvatar registration controller
export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    // Check if user exists
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password before saving
    const hashedPassword = await User.generateHashPassword(password);

    const user = {
      fullName,
      email,
      password: hashedPassword
    };

    const newUser = new User(user);
    await newUser.save();

    // Generate jwt token
    const token = User.generateAuthToken(newUser._id);

    return res.status(201).json({ token, user: newUser });
  } catch (error) {
    next(error);
  }
};

// UserAvatar login controller
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if password is correct
    const isPasswordMatch = await existingUser.verifyHashPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate jwt token
    const token = User.generateAuthToken(existingUser._id);

    // Set token in cookie
    res.cookie("token", token);

    return res.status(200).json({ token, user: existingUser });
  } catch (error) {
    next(error);
  }
};

// Get user profile controller
export const getUserProfile = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

// UserAvatar logout controller
export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    res.clearCookie("token");
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }

    await BlackListToken.create({ token });
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    next(error);
  }
};
