import {Database} from "../../database"

export interface Product {
  id?: number
  name: string
  price: number
  category: string
}

export class TheProductStore {

  // index method
  async index(): Promise<Product[]> {
    try {
    
      const conn = await Database.connect()
      const sql = 'SELECT * FROM Products'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Cannot display the products. Error: ${err}`)
    }
  }


//show method
  async show(id: string): Promise<Product> {
    try {
    const sql = 'SELECT * FROM Products WHERE id=($1)'
    const conn = await Database.connect()

    const result = await conn.query(sql, [id])

    conn.release()
    return result.rows[0]
    } catch (err) {
        throw new Error(`Cannot find product ${id}. Error: ${err}`)
    }
  }


  //creat method

  async create(p: Product): Promise<Product> {
      try {
    const sql = 'INSERT INTO Products (name, price , category) VALUES($1, $2, $3) RETURNING *'
    const conn = await Database.connect()

    const result = await conn.query(sql, [p.name , p.price , p.category])
    conn.release()
    return result.rows[0]
  
      } catch (err) {
          throw new Error(`Cannot add new product. Error: ${err}`)
      }
  }


  //delete method
  async delete(id: string): Promise<Product> {
    try {

        const sql = 'DELETE FROM Products WHERE id=($1)';
        const conn = await Database.connect();
        const result = await conn.query(sql, [id]);
        conn.release();
      return result.rows[0]
    } catch (err) {
        throw new Error(`unable to delete this product. Error: ${err}`);
    
    }
  }
}