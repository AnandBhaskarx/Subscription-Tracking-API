import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'
//what is a req body ?  and aboject containing data from the client (POST REQUEST)
export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        //create a new user
        const { name, email, password } = req.body;

        //check if a user alredy exists

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error('user alredy exist');
            error.statusCode = 409;
            throw error;
        }

        //hash password - security 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });

        // const token = jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn :JWT_EXPIRES_IN })

        const token = jwt.sign(
            { userId: newUsers[0]._id },  // Payload containing the user's ID
            JWT_SECRET,                   // Secret key to sign the token
            { expiresIn: JWT_EXPIRES_IN } // Token expiry duration, e.g., '1h', '7d'
        );


        await session.commitTransaction();
        session.endSession();

        res.status(201)
            .json({
                success: true,
                message: 'User created succesfully',
                data: {
                    token,
                    user: newUsers[0],
                }
            })

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user,
      }
    });
  } catch (error) {
    next(error);
  }
}


export const signOut = async (req, res, next) => { }