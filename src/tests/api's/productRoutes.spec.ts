
import supertest from 'supertest'
import app from '../../../app'
import { Product } from '../../components/product/product.modle'


const request = supertest(app);
let token:string
describe('test "/products" endpoint response', () => {

     beforeAll(async () => {
       
        const user=  {
         username: "sarah22",
        firstname: "sarah",
        lastname: "hassan",
        password: "12345"
       };

   
     const theNewUser = await request.post('/users/new').send(user)
         token = theNewUser.body.token
         
     })


    it('"/products" endpoint should response with status code of 200 //GET', async () => {
      const response = await request.get('/products')
      expect(200)
    })

  
    it('"/products/:id" endpoint should response with status code of 200 //GET', async () => {
    const response = await request.get('/products/1')
    expect(200)
    })

    it('"/products/new" endpoint should response with status code of 200 //POST', async () => { 
         const product :Product={
            name: "product1",
            price: 200,
            category: "skin care"
           }
    const response = await (await request.post('/products/new').send(product).send(token).set('Authorization', 'Bearer '+token))
    expect(200)

   })


    it('"/products/:id" endpoint should response with status code of 200 //DELETE', async () =>{
    const response = await request.delete('/products/1').send(token).set('Authorization', 'Bearer '+token)
    expect(200)
    })


})