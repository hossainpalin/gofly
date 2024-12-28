import { User } from "@/models/user.model";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // User registration logic here
    const { fullName, email, password } = req.body;
    const hashedPassword = await User.generateHashPassword(password);

    const user = {
      fullName,
      email,
      password: hashedPassword
    };

    await User.create(user);

    const token = User.generateAuthToken();

    return res.status(201).json({ token, user });
  } catch (error) {
    next(error);
  }
};

export default userRegister;
