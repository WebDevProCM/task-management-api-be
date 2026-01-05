import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { User } from "../models/user";

export const registerUser = async (email: string, password: string) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return {error:"User already exists"};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return User.create({
        email,
        password: hashedPassword,
    });
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
        if (!user) {
        return {error:"Invalid credentials"};
    }

    const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return {error:"Invalid credentials"};
    }
    
    //adding default expire time
    const signOptions: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN as any) || '7d'
    };

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        signOptions
    );

    return token;
};
