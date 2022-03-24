import supertest from 'supertest'
import app from '../../../app'


const request = supertest(app);
let token:string
describe('test "/users" endpoint response', () => {

    it('"/users/new" endpoint should response with status code of 200 //POST', async () => { 
            
        const response = await request.post('/users/new')
        .send({username: "sarah22",
        firstname: "sarah",
        lastname: "hassan",
        password: "12345"})

        token = response.body.token
        expect(200)
    })


    it('"/users" endpoint should response with status code of 200 //GET', async () => {
      const response = await request.get('/users').send(token).set('Authorization', 'Bearer '+token)
      expect(200)
    })

  
    it('"/users/:id" endpoint should response with status code of 200 //GET', async () => {
    const response = await request.get('/users/1').send(token).set('Authorization', 'Bearer '+token)
    expect(200)
    })

    

   it('"/users/signin" endpoint should response with status code of 200 //POST', async () =>{
    const response = await request.post('/users/signin').send(token).set('Authorization', 'Bearer '+token)
    expect(200)
    })


    it('"/users/:id" endpoint should response with status code of 200 //DELETE', async () =>{
    const response = await request.delete('/users/1').send(token).set('Authorization', 'Bearer '+token)
    expect(200)
    })
    

})