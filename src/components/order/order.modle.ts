import {Database} from "../../database"

export interface Order{
        id?: number
        user_id: number
        status: string
    }

    export interface OrderProducts {
        id?: number
        order_id: number
        product_id: number
        quantity: number
      }

export class TheOrderStore {
    
  //index method
  async index(): Promise<Order[]> {
    try {
    
      const conn = await Database.connect()
      const sql = 'SELECT * FROM Orders'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Cannot display the Orders. Error: ${err}`)
    }
  }

  //show method
  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM Orders WHERE id=($1)'
      const conn = await Database.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
        throw new Error(`Cannot find order ${id}. Error: ${err}`)
    }
  }

  //creat method
  async create(o:Order): Promise<Order> {
    try {

      const sql = 'INSERT INTO Orders (user_id , status) VALUES ($1, $2) RETURNING *';
      const conn = await Database.connect()
      const result = await conn
        .query(sql, [o.user_id , o.status])

      conn.release()

      return result.rows[0]
    } catch (err) {
        throw new Error(`unable to create the order. Error: ${err}`)
    }
  }


  //delete method
  async delete(id: string): Promise<Order> {
    try {

        const sql = 'DELETE FROM Orders WHERE id=($1)';
        const conn = await Database.connect();
        const result = await conn.query(sql, [id]);
        conn.release();
      return result.rows[0]
    } catch (err) {
        throw new Error(`unable to delete this order. Error: ${err}`);
    
    }
  }


  //show current order by user id method
async showCurrentOrder(user_id: string): Promise<Order> {
    try {
      const conn = await Database.connect();
      const sql = `SELECT * FROM Orders WHERE user_id = $1 ORDER BY id DESC LIMIT 1`;
      const result = await conn.query(sql,[user_id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to get current order. Error: ${err}`);
    }
  }


  //add product to order method

  async addProduct(order_id: number, product_id: number,  quantity: number): Promise<OrderProducts> {
    try {
      const sql = 'INSERT INTO Order_products (order_id, product_id ,quantity ) VALUES($1, $2, $3) RETURNING *'

      const conn = await Database.connect()

      const result = await conn
          .query(sql, [ order_id, product_id, quantity])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add the product to order ${order_id}. Error: ${err}`)
    }
  }


}
