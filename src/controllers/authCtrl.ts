import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken";

import {
  IDecodedToken,
  IGgPayload,
  IUser,
  IUserParams,
} from "../config/interface";

import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);

const authCtrl = {
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshToken", { path: `/api/refresh_token` });

      return res.json({ msg: "Logged out!" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshToken;
      console.log("rf_token", rf_token);
      // if refresh token is not present then prompt user to login
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

      /* 
      if refresh token is  present then verify refresh token,
      if its correct then login and send access token in res
      */

      const decoded = <IDecodedToken>(
        jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      );

      if (!decoded.id)
        return res.status(400).json({ msg: "Please login now!" });

      const user = await Users.findById(decoded.id).select("-password");

      if (!user)
        return res.status(400).json({ msg: "This account does not exist." });

      const access_token = generateAccessToken({ id: user._id });

      res.json({ msg: "Login Success!", access_token, user });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  googleLogin: async (req: Request, res: Response) => {
    try {
      const { id_token } = req.body;

      const verify = await client.verifyIdToken({
        idToken: id_token,
        audience: `${process.env.MAIL_CLIENT_ID}`,
      });

      const { email, email_verified, name, picture } = <IGgPayload>(
        verify.getPayload()
      );

      if (!email_verified)
        return res.status(500).json({ msg: "Email verification failed." });

      const password = email + "your google secret password";

      const passwordHash = await bcrypt.hash(password, 12);

      const user = await Users.findOne({ email });

      if (user) {
        loginUser(user, password, res);
      } else {
        const user = {
          name,
          email: email,
          password: passwordHash,
          avatar: picture,
          type: "google",
        };
        registerUser(user, res);
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const msgError =
      user.type === "register"
        ? "Password is incorrect."
        : `Password is incorrect. This account was created login with ${user.type}`;

    return res.status(400).json({ msg: msgError });
  }
  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id });

  res.cookie("refreshToken", refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  });

  res.json({
    msg: "Login Success!",
    access_token,
    user: { ...user._doc, password: "" },
  });
};

const registerUser = async (user: IUserParams, res: Response) => {
  const newUser = new Users(user);
  await newUser.save();

  const access_token = generateAccessToken({ id: newUser._id });
  const refresh_token = generateRefreshToken({ id: newUser._id });

  res.cookie("refreshToken", refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  });

  res.json({
    msg: "Login Success!",
    access_token,
    user: { ...newUser._doc, password: "" },
  });
};

export default authCtrl;
