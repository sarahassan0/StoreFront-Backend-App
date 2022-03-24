import express, {Request ,Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const userToken = (req: Request, res: Response, next:NextFunction) => {
    try {
        const authorizationHeader:string|undefined = req.headers.authorization!
        const token:string = authorizationHeader.split(' ')[1] 
        const jwt:unknown =process.env.JWT_SECRET
         verify(token ,jwt as string)

        next()
    } catch (err) {
        res.status(401)
        res.json( `could not access,  your token is invalid . Error${err}`)
    }
}

export default userToken