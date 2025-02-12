import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUser {
  username: string;
  password: string;
  favoriteGenre: string;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
  getJWTToken(): string;
}

type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

const schema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: [3, "Username must be at least 3 character"],
  },
  password: {
    type: String,
    select: false,
    required: true,
    minlength: [3, "Password must be at least 3 characters"],
  },
  favoriteGenre: { type: String },
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

schema.method("comparePassword", async function (password: string) {
  return await bcrypt.compare(password, this.password);
});

schema.method("getJWTToken", function () {
  return jwt.sign({ id: this._id }, String(process.env.JWT_SECRET), {
    expiresIn: Number(process.env.JWT_EXPIRES_TIME),
  });
});

const User = mongoose.model<IUser, UserModel>("User", schema);

export default User;
