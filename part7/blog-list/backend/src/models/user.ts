import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IBlog } from "./blog";

export interface IUser {
  _id?: string;
  id?: string;
  username: string;
  name?: string;
  password: string;
  blogs?: IBlog[];
  __v?: number;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
  getJWTToken(): string;
}

export type UserModel = mongoose.Model<IUser, object, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: [3, "Username must be at least 3 character"],
  },
  name: { type: String },
  password: {
    type: String,
    select: false,
    required: true,
    minlength: [3, "Password must be at least 3 characters"],
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (_, returnedOBject) => {
    returnedOBject.id = returnedOBject._id.toString();

    delete returnedOBject._id;
    delete returnedOBject.__v;
    delete returnedOBject.password;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.method("comparePassword", async function (password: string) {
  return await bcrypt.compare(password, this.password);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, String(process.env.JWT_SECRET), {
    expiresIn: Number(process.env.JWT_EXPIRES_TIME),
  });
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
