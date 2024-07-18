import { Request, Response } from 'express'
import UserSchema from './user.schema'
import { SignupDto } from './user.dto'
import jwt from 'jsonwebtoken'

const tenMinute = 600000

export const signup = async(req: Request , res: Response) => {
    try{
        const  body: SignupDto = req.body
        const newUser = new UserSchema(body)
        await newUser.save()

        const payload = {
            ...body,
            id : newUser._id
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET as string , {expiresIn : tenMinute})
        res.cookie("authToken",token,{
            httpOnly: true,
            maxAge: tenMinute,
            secure: process.env.PROD === 'true' ? true : false,
            domain: process.env.USER_AGENT
        })
        res.json({success: true})
    }
    catch(err: any)
    {
        console.log(err)
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

export const login = (req: Request , res: Response) => {
    res.send('success')
}

export const forgotpassword = (req: Request , res: Response) => {
    res.send('success')
}

export const logout = (req: Request , res: Response) => {
    res.send('success')
}