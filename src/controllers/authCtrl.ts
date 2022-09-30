import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import { generateActiveToken } from "../config/generateToken";
import sendMail from "../config/sendMail";
import { validateEmail } from "../middleware/valid";
import { IDecodedToken } from "../config/interface";

const CLIENT_URL = `${process.env.BASE_URL}`;

const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ msg: "Email or Phone number already exists." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = { name, email, password: passwordHash };

      const active_token = generateActiveToken({ newUser });

      const url = `${CLIENT_URL}/active/${active_token}`;

      if (validateEmail(email)) {
        sendMail(email, url, "Verify your email address");
        return res.json({ msg: "Success! Please check your email." });
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  active: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;

      const decoded = <IDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      );

      const { newUser } = decoded;

      if (!newUser)
        return res.status(400).json({ msg: "Invalid authentication." });

      const user = new Users(newUser);

      await user.save();

      res.json({ msg: "Account has been activated!" });
    } catch (error: any) {
      let errorMessage;

      if (error.code === 11000) {
        // duplicate key error 11000 in mongodb
        errorMessage = Object.keys(error.keyValue)[0] + " already exists.";
      } else {
        const name = Object.keys(error.errors)[0];
        errorMessage = error.errors[`${name}`].message;
      }

      return res.status(500).json({ msg: errorMessage });
    }
  },
};

export default authCtrl;
