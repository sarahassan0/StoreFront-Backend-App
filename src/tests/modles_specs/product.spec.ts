import {Product , TheProductStore} from '../../components/product/product.modle'
 const store = new TheProductStore()

 describe('Check on product CRUD methods', () => {
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
 
})



describe('Check on product CRUD methods return`s', () => {
  it('create method should add product', async () => {
   const product : Product ={
    name: "product1",
    price: 200,
    category: "skin care"    
    }
    const result= await store.create(product)
    
    expect(result).toEqual({
    id: 2,
    name: "product1",
    price: 200,
    category: "skin care"    
    });
  })

  it(' index method should return a list of products', async () => {
    const result: Product[] = await store.index()
    expect(result).toBeTruthy
  })

  it('show method should return the correct product by it`s id', async () => {
    const result: Product = await store.show('2')
    expect(result).toEqual({
      id: 2,
        name: 'product1',
        price: 200,
        category: 'skin care'
    })
  })

  it(' delete method should delete the correct product by it`s id', async () => {
    const result:unknown = await store.delete('2');
    expect(result).toEqual(undefined)
  })
})
