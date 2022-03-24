import {Database} from "../../database"
import { genSalt , hashSync , compareSync} from 'bcryptjs'

export interface User {
  id?: number;
  username : string
  firstname: string
  lastname: string
  password: string
}

export class TheUserStore {


  //index method
  async index(): Promise<User[]> {
    try {
    
      const conn = await Database.connect()
      const sql = 'SELECT * FROM Users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Cannot display the users. Error: ${err}`)
    }
  }


  //show method
  async show(id: string): Promise<User> {
    try {
    const sql = 'SELECT * FROM Users WHERE id=($1)'
    const conn = await Database.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Cannot find user ${id}. Error: ${err}`)
    }
  }


  //create method

  async create(u: User): Promise<User> {
      try {

    const sql = 'INSERT INTO Users (username ,firstName, lastName , password) VALUES($1, $2, $3 ,$4) RETURNING *'
    
    const conn = await Database.connect()
    const salt =await genSalt(10)
    const hashedPassword = await hashSync(u.password , salt)
    const result = await conn
        .query(sql, [u.username ,u.firstname , u.lastname , hashedPassword])

    conn.release()

    return result.rows[0]

      } catch (err) {
          throw new Error(`unable create new user. Error: ${err}`)
      }
  }


  //authentication method

  async auth(username: string, password: string): Promise<User | null> {
    const conn = await Database.connect()
    const sql = 'SELECT password FROM users WHERE username=($1)'

    const result = await conn.query(sql, [username])

    if(result.rows.length) {

      const user = result.rows[0]

      console.log(user)

      if (compareSync(password, user.password)) {
        return user
      }
    }

    return null
  }


  //delete method
  async delete(id: string): Promise<User> {
    try {

        const sql = 'DELETE FROM Users WHERE id=($1)';
        const conn = await Database.connect();
        const result = await conn.query(sql, [id]);
        conn.release();
      return result.rows[0]
    } catch (err) {
        throw new Error(`unable to delete this user. Error: ${err}`);
    
    }
  }
}

   