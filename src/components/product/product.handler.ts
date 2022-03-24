import express, {Request ,Response} from 'express'
import {Router} from 'express'
import userToken from '../../middlewares/userToken'
import UserRoutes from '../user/user.handler'
import {Product,TheProductStore} from './product.modle'


const store = new TheProductStore()


//get all products handler function

const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const products = await store.index()
            res.json(products)
    } catch(err) { 
         res.status(400)
         res.json(err)
   }
}

//get order by id handler function

const getProduct = async (req: Request, res: Response) => {
    try {
        const id=req.params.id
       const product = await store.show(id)
       res.json(product)
    } catch(err) { 
         res.status(400)
         res.json(err)
   }
}


// creat new product handler function
const createNewProduct = async (req: Request, res: Response) => {
    try {
        const p: Product = {
            name: req.body.name,
            price: req.body.price,
            category:req.body.category
        }

        const theNewProduct  = await store.create(p)
        res.json(theNewProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

 //delete product by id handler function
 const deleteProduct = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const product = await store.delete(id);
            res.json(product);
        } catch(err) { 
            res.status(400)
            res.json(err)
      }
    }
    


    //product routes

 const ProductRoutes = Router()


  ProductRoutes.get('/', getAllProducts)
  ProductRoutes.get('/:id', getProduct)
  ProductRoutes.post('/new',userToken, createNewProduct)
  ProductRoutes.delete('/:id' ,userToken, deleteProduct)

export default ProductRoutes
