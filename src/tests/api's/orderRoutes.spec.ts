
import supertest from 'supertest'
import app from '../../../app'
import { Order } from '../../components/order/order.modle'


const request = supertest(app);
let token:string
describe('test "/orders" endpoint response', () => {

     beforeAll(async () => {
       
        const user =  {
         username: "sarah22",
        firstname: "sarah",
        lastname: "hassan",
        password: "12345"
       };
   
     const theNewUser = await request.post('/users/new').send(user)
         token = theNewUser.body.token
         
     })


    it('"/orders" endpoint should response with status code of 200 //GET', async () => {
      const response = await (await request.get('/orders').send(token).set('Authorization', 'Bearer '+token))
      expect(200)
    })

  
    it('"/orders/:id" endpoint should response with status code of 200 //GET', async () => {
    const response = await (await request.get('/orders/1').send(token).set('Authorization', 'Bearer '+token))
    expect(200)
    })

    it('"/orders/new" endpoint should response with status code of 200 //POST', async () => { 
            
    const response = await request.post('/orders/new')
        .send({ status: "active",
         user_id: 1})
         .send(token)
         .set('Authorization', 'Bearer '+token)
         expect(200)
    })

    it('"/orders/user/:user_id" endpoint should response with status code of 200 //GET', async () =>{
    const response = await request.get('/orders/user/1').send(token).set('Authorization', 'Bearer '+token)
    expect(200)
    })


    it('"/orders/:id/products" endpoint should response with status code of 200 //POST', async () =>{
      const response = await request.post('/order/1/products')
     .send({id:1 ,  
          order_id: 1,
           product_id: 1,
           quantity: 200
          })
          .send(token)
      .set('Authorization', 'Bearer '+token)
      expect(200)
      })


    it('"/orders/:id" endpoint should response with status code of 200 //DELETE', async () =>{
    const response = await request.delete('/order/1').send(token).set('Authorization', 'Bearer '+token)
    expect(200)
    })
    
   
 })