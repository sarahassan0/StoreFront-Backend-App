import express, {Request ,Response} from 'express'
import {Router} from 'express'
import {User , TheUserStore} from './user.modle'
import { sign } from 'jsonwebtoken'
import userToken from '../../middlewares/userToken'

const store = new TheUserStore()

//get all users handler function

const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
            res.json(users)
    } catch(err) { 
         res.status(400)
         res.json(err)
   }
}

//get order by id handler function

const getUser = async (req: Request, res: Response) => {
    try {
        const id=req.params.id
       const user = await store.show(id)
       res.json(user)
    } catch(err) { 
         res.status(400)
         res.json(err)
   }
}


//create order handler function

const createNewUser = async (req: Request, res: Response) => {
    try {
        const u: User = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password:req.body.password
        }
        const id = req.body.id
        const jwt:unknown =process.env.JWT_SECRET
        const token = sign({id} , jwt as string);

        const theNewUser  = await store.create(u)
        res.json({token, ...theNewUser})
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

//authentication user handler function

const authUser = async (_req: Request, res: Response) => {
    try {
        const signIn = await store.auth(_req.body.username, _req.body.password)
        res.status(200).json(signIn)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}


//delete user by id handler function

const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await store.delete(req.params.id);
        res.json(user);
    } catch(err) { 
        res.status(400)
        res.json(err)
  }
}



// user routes
 const UserRoutes = Router()


  UserRoutes.get('/', userToken, getAllUsers)
  UserRoutes.get('/:id', userToken, getUser)
  UserRoutes.post('/new',createNewUser)
UserRoutes.post('/signin', userToken,authUser)
UserRoutes.delete('/:id' ,userToken , deleteUser)
export default UserRoutes
