import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Captain } from "@/models/captain.model";
import { BlackListToken } from "@/models/black-list-token.model";

export const captainRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      fullName,
      email,
      password,
      vehicle: { type, color, numberPlate, capacity }
    } = req.body;

    // Check if captain exists
    const isCaptainExists = await Captain.findOne({ email });

    if (isCaptainExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password before saving
    const hashedPassword = await Captain.generateHashPassword(password);

    const captain = {
      fullName,
      email,
      password: hashedPassword,
      vehicle: { type, color, numberPlate, capacity }
    };

    const newCaptain = new Captain(captain);
    await newCaptain.save();

    // Generate jwt token
    const token = Captain.generateAuthToken(newCaptain._id);

    return res.status(201).json({ token, captain: newCaptain });
  } catch (error) {
    next(error);
  }
};

// Captain login controller
export const captainLogin = async (
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

    // Check if captain exists
    const existingCaptain = await Captain.findOne({ email }).select(
      "+password"
    );

    if (!existingCaptain) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isPasswordMatch = await existingCaptain.verifyHashPassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate jwt token
    const token = Captain.generateAuthToken(existingCaptain._id);

    // Set token in cookie
    res.cookie("token", token);

    return res.status(200).json({ token, captain: existingCaptain });
  } catch (error) {
    next(error);
  }
};

// Get captain profile controller
export const getCaptainProfile = async (
  req: Request & { captain?: any },
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({ captain: req.captain });
  } catch (error) {
    next(error);
  }
};

// Update captain profile controller
export const updateCaptainProfile = async (
  req: Request & { captain?: any },
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { vehicle } = req.body;

    const updatedCaptain = await Captain.findByIdAndUpdate(
      req.captain._id,
      { vehicle },
      { new: true }
    );

    return res.status(200).json({ captain: updatedCaptain });
  } catch (error) {
    next(error);
  }
};

// Captain logout controller
export const captainLogout = async (
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
