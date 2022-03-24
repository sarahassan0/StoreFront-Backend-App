import {Order ,OrderProducts ,TheOrderStore} from '../../components/order/order.modle'
import { TheProductStore } from '../../components/product/product.modle'
import { TheUserStore } from '../../components/user/user.modle'


 const store = new TheOrderStore()

describe('Check on order CRUD methods', () => {
  it('should have an index method', async() => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', async() => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', async() => {
    expect(store.create).toBeDefined()
  })
 
  
  it('should have a delete method', async() => {
    expect(store.delete).toBeDefined()
  })

  it('should have a showCurrentOrder method', async() => {
    expect(store.showCurrentOrder).toBeDefined()
  })

  it('should have a addProduct method', async() => {
    expect(store.addProduct).toBeDefined()
  })

})



describe('Check on order CRUD methods return`s', () => {

    const user = new TheUserStore()
    const product = new TheProductStore()

    beforeAll(async () => {
      await user.create({
        username: "sarah22",
       firstname: "sarah",
       lastname: "hassan",
       password: "12345"
      });
      await product.create({
        name: "product1",
        price: 200,
        category: "skin care"
      })
    })

    
  it('create method should add new order', async () => {
   const order : Order ={
        status: "active",
        user_id: 2
    }
    const result= await store.create(order)
    
    expect(result).toEqual({
        id:1,
       status: "active",
       user_id: 2
    })
  })

  it(' index method should return a list of orders', async () => {
    const result: Order[] = await store.index()
    expect(result).toBeTruthy
  })

  it('show method should return the correct order by it`s id', async () => {
    const result: Order = await store.show('1')
    expect(result).toEqual({
        id: 1,
        status: 'active',
        user_id: 2
    })
  })


  it('showCurrentOrder method should return the correct order by user id', async () => {
    const result: Order = await store.showCurrentOrder('2')
    expect(result).toEqual({
        id: 1,
        status: 'active',
        user_id: 2
    })
  })


  it(' addProduct method should update the order with a new product', async () => {
    const result: OrderProducts = await store.addProduct(1 , 1 , 200)
    expect(result).toEqual({
      id:1 ,  
      order_id: 1,
      product_id: 1,
      quantity: 200,
    })
  })
  it(' delete method should delete the correct order by it`s id', async () => {
      
    const result:unknown = await store.delete('2')
    expect(result).toEqual(undefined)
  })
   
  })
  