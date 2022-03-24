import express, {Request ,Response} from 'express'
import {Router} from 'express'
import {Order , OrderProducts , TheOrderStore} from './order.modle'
import userToken from '../../middlewares/userToken'
const store = new TheOrderStore()
   
   //get all orders handler function

const getAllOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index()
            res.json(orders)
    } catch(err) { 
         res.status(400)
         res.json(err)
   }
}

//get order by id hangler function

const getOrder = async (req: Request, res: Response) => {
    try {
        const id=req.params.id
       const order = await store.show(id)
       res.json(order)
    } catch(err) { 
         res.status(400)
         res.json(err)
   }
}

//create new order handler function


const createNewOrder = async (req: Request, res: Response) => {
    try {
        const o: Order ={
            user_id: req.body.user_id,
            status: req.body.status
        }

        const theNewOrder  = await store.create(o)
        res.json(theNewOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

//delete order by id handler function

 const deleteOrder = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const order = await store.delete(id);
            res.json(order);
        } catch(err) { 
            res.status(400)
            res.json(err)
      }
    }
    
 //get currend order by user id handler function

    const getCurrentOrder = async (req: Request, res: Response) => {
        try {
            const user_id =req.params.user_id
           const order = await store.showCurrentOrder(user_id )
           res.json(order)
        } catch(err) { 
             res.status(400)
             res.json(err)
       }
    }
 
    //add product to order handler function

    const addNewProductToOrder = async (_req: Request, res: Response) => {
        const order_id: unknown = _req.params.id 
        const product_id: number = _req.body.product_id
        const quantity: number= _req.body.quantity 

        
      
        try {
          const Product = await store.addProduct( order_id as number , product_id, quantity )
          res.json(Product)
        } catch(err) {
          res.status(400)
          res.json(err)
      } 
    }


    //order routes

 const OrderRoutes = Router()

  OrderRoutes.get('/',userToken, getAllOrders)
  OrderRoutes.get('/:id',userToken , getOrder)
  OrderRoutes.post('/new',userToken, createNewOrder)
  OrderRoutes.delete('/:id' ,userToken, deleteOrder)
  OrderRoutes.get('/user/:user_id',userToken , getCurrentOrder)
  OrderRoutes.post('/:id/products',userToken, addNewProductToOrder)

export default OrderRoutes
