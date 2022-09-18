import { Request, Response } from "express";
import { Users } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateActiveToken } from "../config/generateToken";

const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;

      const user = await Users.findOne({ account });

      if (user)
        return res
          .status(400)
          .json({ msg: "Email or Phone number already exists." });

      // encrypt password

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = { name, account, password: passwordHash };

      const active_token = generateActiveToken({ newUser }); // 5m

      res.json({
        status: "OK",
        msg: "Registered successfully.",
        data: newUser,
        active_token,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ msg: error.message });
      } else {
        console.log("Unexpected error", error);
      }
    }
  },
};

export default authCtrl;
