import {User , TheUserStore} from '../../components/user/user.modle'
 const store = new TheUserStore()
 import { genSalt , hashSync , compareSync} from 'bcryptjs'


describe('Check on user CRUD methods', () => {
  it('should have an index method', async() => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', async() => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', async() => {
    expect(store.create).toBeDefined()
  })

  it('should have a authentication method', async() => {
    expect(store.auth).toBeDefined()
  })
 
  it('should have a delete method', async() => {
    expect(store.delete).toBeDefined()
  })
 
})


describe('Check on user CRUD methods return`s', () => {
  it('create method should add new user', async () => {
   const user:User ={
    username: "sarah22",
    firstname: "sarah",
    lastname: "hassan",
    password: "12345",   
    }
    const salt = await genSalt(10)
    const hashedPassword = await hashSync(user.password, salt)
    const result= await store.create(user)
    expect(result.username).toEqual('sarah22')
    expect(result.firstname).toEqual('sarah')
    expect(result.lastname).toEqual('hassan')
    expect(compareSync(user.password , hashedPassword)).toBeTrue
  })


  it(' index method should return a list of users', async () => {
    const result:unknown = await store.index()
    expect(result).toBeTruthy
  })

  it('show method should return the correct user by it`s id', async () => {
    const result: User = await store.show('2')
    expect(result.id).toBe(2)
    expect(result.username).toEqual('sarah22')
    expect(result.firstname).toEqual('sarah')
  })


  it('auth method', async () => {
     const result= await store.auth('sarah22' , '12345')
     expect(result).toBeDefined
     expect(result).not.toEqual(null)
   })


  it(' delete method should delete the correct user by it`s id', async () => {
    const result:unknown = await store.delete('2')
    expect(result).toEqual(undefined)
  })
})
