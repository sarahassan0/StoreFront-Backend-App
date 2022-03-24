import express, { Request, Response } from 'express';
import ProductRoutes from './src/components/product/product.handler'
import UserRoutes from './src/components/user/user.handler';
import OrderRoutes from './src/components/order/order.handler';
const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
  res.send("Welcome to the store's home page");
});

app.use('/products' , ProductRoutes);
app.use('/users' , UserRoutes)
app.use('/orders' , OrderRoutes)

export default app;